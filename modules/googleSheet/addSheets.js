async function addSheets(sheetsToAdd, sheetId, sheet){
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

module.exports = addSheets;