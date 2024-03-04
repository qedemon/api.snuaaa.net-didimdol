const {getAllUsers} = require("modules/user/core");

async function loadAllUsers(sheetId, sheet){
    try{
        const {users, error} = await getAllUsers({isStudent: true});
        if(error){
            throw error
        }
        const range = "가입자"
        const result = await sheet.spreadsheets.values.update(
            {
                spreadsheetId: sheetId,
                range,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        ["가입번호", "이름", "아이디", "전화번호", "이메일", "과정", "입학년도", "전공", "가입비 납부", "입금자명"],
                        ...(users??[]).map(
                            ({aaaNo, name, id, mobile, email, course, schoolNo, major, paid, depositor})=>{
                                return [
                                    aaaNo,
                                    name,
                                    id,
                                    mobile,
                                    email,
                                    course,
                                    schoolNo,
                                    major,
                                    paid?"O":"X",
                                    depositor
                                ];
                            }
                        )
                    ]
                }
            }
        )
        return {
            result,
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