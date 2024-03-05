const {getAllAuthentications} = require("modules/QRAuthentication/core");

async function loadAllQRAuthentications(sheetId, sheet){
    try{
        const {data} = await sheet.spreadsheets.get(
            {
                spreadsheetId: sheetId
            }
        );
        const sheetTitles = data.sheets.map(
            ({properties: {title}})=>title
        )

        const authentications = await (
            async ()=>{
                const {authentications, error} = await getAllAuthentications("별모임");
                if(error){
                    throw error;
                }
                return authentications;
            }
        )();

        const sheetsToAdd = authentications
            .map(({title})=>title)
            .filter((title)=>!sheetTitles.includes(title));
        
        await (
            async (sheetsToAdd)=>{
                if(sheetsToAdd.length===0){
                    return null;
                }
                const requests = sheetsToAdd.map(
                    (title)=>(
                        {
                            addSheet: {
                                properties: {
                                    title
                                }
                            }
                        }
                    )
                );
                const result = await sheet.spreadsheets.batchUpdate(
                    {
                        spreadsheetId: sheetId,
                        resource: {
                            requests
                        }
                    }
                )
                return result;
            }
        )(sheetsToAdd);
        
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