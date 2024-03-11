const {getAllUsers} = require("modules/user/core");
const {getNow} = require("modules/time/core");

async function loadAllUsers(sheetId, sheet){
    try{
        const students = await (
            async ()=>{
                const {users, error} = await getAllUsers({isStudent: true}, [], ["didimdolClass.wants"]);
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
        const etc = await (
            async ()=>{
                const {users, error} = await getAllUsers({isStaff: {$ne: true}, isStudent: {$ne: true}});
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
                labels: ["가입번호", "아이디", "이름", "전화번호", "이메일", "과정", "입학년도", "전공", "가입비 납부", "입금자명", "가입날짜", "신환회 참석", "1지망", "2지망", "3지망"],
                values: ["aaaNo", "id", "name", "mobile", "email", "course", "schoolNo", "major", ({paid})=>paid?"O":"X", "depositor",
                    ({createdAt})=>createdAt.toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}),
                    ({didimdolClass: {party}})=>party?"O":(party===false)?"X":"?",
                    ...Array.from({length: 3}).map(
                        (_, index)=>({didimdolClass: {wants}})=>Array.isArray(wants)&&wants[index]?`${wants[index].title}조 (${wants[index].daytime.day} ${wants[index].daytime.start}~${wants[index].daytime.end})`:"")
                ]
            },
            {
                range: "강사 조장",
                target: staffs,
                labels: ["가입번호", "아이디", "이름", "전화번호", "이메일", "과정", "입학년도", "전공"],
                values: ["aaaNo", "id", "name", "mobile", "email", "course", "schoolNo", "major"]
            },
            {
                range: "그외",
                target: etc,
                labels: ["가입번호", "아이디", "이름", "전공", "isStudent", "isStaff"],
                values: ["aaaNo", "id", "name", "major", ({isStudent})=>isStudent?"O":"X", ({isStaff})=>isStaff?"O":"X"],
                replace: true
            }
        ].map(
            async ({range, target, labels, values, replace})=>{
                if(replace){
                    await sheet.spreadsheets.values.clear(
                        {
                            spreadsheetId: sheetId,
                            range
                        }
                    )
                }
                const result = await sheet.spreadsheets.values.update(
                    {
                        spreadsheetId: sheetId,
                        range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                ["수정 시각", getNow().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})],
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