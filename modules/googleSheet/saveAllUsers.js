const {updateUsers} = require("../user/core");

async function saveAllUsers(sheetId, sheet){
    try{
        const [students, staffs] = await Promise.all(
            ["가입자", "강사 조장"].map(
                async (range)=>{
                    const {data: {values}} = await sheet.spreadsheets.values.get(
                        {
                            spreadsheetId: sheetId,
                            range
                        }
                    );
                    const users = values.slice(1).map(
                        (row)=>{
                            const [aaaNo, id, name, mobile, email, course, schoolNo, major, paid, depositor, createdAt, partyValue] = row;
                            const party = partyValue==="O"?true:partyValue==="X"?false:null;
                            return {
                                id, name, mobile, email, course, schoolNo, major, paid: paid==="O", depositor/*, "didimdolClass.party": party*/
                            }
                        }
                    )
                    return users;
                }
            )
        )

        const result = await updateUsers([...students, ...staffs], false);

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

module.exports = saveAllUsers;