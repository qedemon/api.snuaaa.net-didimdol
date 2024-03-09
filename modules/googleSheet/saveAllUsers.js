const {updateUsers} = require("../user/core");

async function saveAllUsers(sheetId, sheet){
    try{
        const [students, staffs, etc] = await Promise.all(
            [
                {
                    range: "가입자",
                    cols: {
                        aaaNo: 0,
                        id: 1,
                        name: 2,
                        mobile: 3, 
                        email: 4,
                        course: 5,
                        schoolNo: 6,
                        major: 7,
                        paid: (cols)=>{
                            return cols[8]==="O";
                        },
                        depositor: 9
                    }
                }, 
                {
                    range: "강사 조장",
                    cols: {
                        aaaNo: 0,
                        id: 1,
                        name: 2,
                        mobile: 3, 
                        email: 4,
                        course: 5,
                        schoolNo: 6,
                        major: 7
                    }
                },
                {
                    range: "그외",
                    cols: {
                        aaaNo: 0,
                        id: 1,
                        name: 2,
                        major: 3,
                        isStudent: (row)=>{
                            return row[4]==="O"
                        },
                        isStaff: (row)=>{
                            return row[5]==="O"
                        }
                    }
                }
            ]
            .map(
                async ({range, cols})=>{
                    const {data: {values}} = await sheet.spreadsheets.values.get(
                        {
                            spreadsheetId: sheetId,
                            range
                        }
                    );
                    const users = values.slice(1).map(
                        (row)=>{
                            return Object.entries(cols).reduce(
                                (result, [key, col])=>{
                                    return {
                                        ...result,
                                        [key]: typeof(col)==="function"?col(row):row[col]
                                    }
                                },
                                {}
                            );
                        }
                    )
                    return users;
                }
            )
        )

        const result = await updateUsers([...students, ...staffs, ...etc], false);

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