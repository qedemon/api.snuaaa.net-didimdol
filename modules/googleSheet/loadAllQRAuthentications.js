const addSheets = require("./addSheets");
const getSheetTitles = require("./getSheetTitles");
const {getAllAuthentications} = require("modules/QRAuthentication/core");

async function loadAllQRAuthentications(sheetId, sheet){
    try{
        const sheetTitles = await (
            async (sheetId, sheet)=>{
                const {sheetTitles, error} = await getSheetTitles(sheetId, sheet);
                if(error){
                    throw error;
                }
                return sheetTitles;
             }
        )(sheetId, sheet);

        const authentications = await (
            async ()=>{
                const {authentications, error} = await getAllAuthentications(["별모임", "소관", "자율돔관", "etc"]);
                if(error){
                    throw error;
                }
                return authentications;
            }
        )();

        const sheetsToAdd = authentications
            .map(({title})=>title)
            .filter((title)=>!sheetTitles.includes(title));
        
        await addSheets(sheetsToAdd, sheetId, sheet);
        
        const results = await Promise.all(
            authentications.map(
                async ({title, users})=>{
                    return await sheet.spreadsheets.values.update(
                        {
                            spreadsheetId: sheetId,
                            range: title,
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    ["가입번호", "아이디", "이름", "전공", "학번"],
                                    ...users.map(
                                        ({aaaNo, id, name, major, colNo})=>[aaaNo, id, name, major, colNo]
                                    )
                                ]
                            }
                        }
                    )
                }
            )
        )


        /*const requests = [];
        requests.push(
            {
                addSheet: {
                    properties: {
                        title: "별모임 정보"
                    },
                }
            }
        )
        const result = await sheet.spreadsheets.batchUpdate(
            {
                spreadsheetId: sheetId,
                resource: {
                    requests
                }
            }
        )*/
        return {
            results,
            url: `https://docs.google.com/spreadsheets/d/${sheetId}/`
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = loadAllQRAuthentications;