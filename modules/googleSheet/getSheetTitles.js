async function getSheetTitles(sheetId, sheet){
    try{
        const {data} = await sheet.spreadsheets.get(
            {
                spreadsheetId: sheetId
            }
        );
        const sheetTitles = data.sheets.map(
            ({properties: {title}})=>title
        )
        return {sheetTitles};
    }
    catch(error){
        return {error};
    }
}

module.exports = getSheetTitles;