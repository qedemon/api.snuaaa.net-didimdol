const {getAllUsers} = require("modules/user/core");

async function loadAllUsers(sheetId, sheet){
    try{
        const students = await (
            async ()=>{
                const {users, error} = await getAllUsers({isStudent: true});
                if(error){
                    throw error;
                }
                return users;
            }
        )();
        const staffs = await (
            async ()=>{
                const {users, error} = await getAllUsers({isStaff: true});
                if(error){
                    throw error;
                }
                return users;
            }
        )();

        const updationgs = [
            {
                range: "가입자",
                target: students,
                labels: ["가입번호", "아이디", "이름", "전화번호", "이메일", "과정", "입학년도", "전공", "가입비 납부", "입금자명", "가입날짜"],
                values: ["aaaNo", "id", "name", "mobile", "email", "course", "schoolNo", "major", ({paid})=>paid?"O":"X", "depositor", 
                    ({createdAt})=>createdAt.toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})
                ]
            },
            {
                range: "강사 조장",
                target: staffs,
                labels: ["가입번호", "아이디", "이름", "전화번호", "이메일", "과정", "입학년도", "전공", "가입비 납부", "입금자명", "가입날짜"],
                values: ["aaaNo", "id", "name", "mobile", "email", "course", "schoolNo", "major", ({paid})=>paid?"O":"X", "depositor", 
                    ({createdAt})=>createdAt.toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})
                ]
            }
        ].map(
            async ({range, target, labels, values})=>{
                const result = await sheet.spreadsheets.values.update(
                    {
                        spreadsheetId: sheetId,
                        range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                labels,
                                ...(target??[]).map(
                                    (data)=>values.map(
                                        (value)=>(typeof(value) === "function")?value(data):data[value]
                                    )
                                )
                            ]
                        }
                    }
                )
                return result;
            }
        );
        
        return {
            result: await Promise.all(updationgs),
            url: `https://docs.google.com/spreadsheets/d/${sheetId}/`
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = loadAllUsers;