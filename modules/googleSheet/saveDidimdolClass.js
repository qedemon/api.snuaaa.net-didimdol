const {updateDidimdolClasses, allDidimdolClasses} = require("../didimdolClass/core");
const getSheetTitles = require("./getSheetTitles");

async function saveDidimdolClass(sheetId, sheet){
    try{
        const sheetTitles = await (
            async (sheetId, sheet)=>{
                const {error, sheetTitles} = await getSheetTitles(sheetId, sheet);
                if(error){
                    throw error;
                }
                return sheetTitles;
            }
        )(sheetId, sheet);

        const classSheets = sheetTitles.filter(
            (title)=>/^[0-9]+조$/.test(title)
        )

        const currentClasses = (await allDidimdolClasses(["title"], [])).didimdolClasses.map(({title})=>title);
        const classesToHide = currentClasses.filter((title)=>!classSheets.includes(`${title}조`));

        const classInfoPromises = classSheets.map(
            async (sheetTitle)=>{

                const {data: {values}} = await sheet.spreadsheets.values.get(
                    {
                        spreadsheetId: sheetId,
                        range: sheetTitle
                    }
                );

                const title = (
                    (sheetTitle)=>{
                        const numbers = sheetTitle.match(/[0-9]+/g);
                        return numbers?numbers.join(""):null;
                    }
                )(sheetTitle);

                const daytime = {
                    day: values[1][1],
                    start: values[1][2],
                    end: values[1][3]
                };

                const keywords = values[3].slice(1);
                
                const ratios = [
                    {
                        label: values[5][1],
                        ratio: values[5][2]
                    },
                    {
                        label: values[6][1],
                        ratio: values[6][2]
                    }
                ];
                const introduction = values[8][1];

                const lecturerId = values[11][1];

                const {assistantIds, studentIds} =(
                    (remains)=>{
                        const spacer = remains.findIndex(
                            (row)=>!row[1]
                        );
                        return {
                            assistantIds: remains.slice(0, spacer).map((row)=>row[1]),
                            studentIds: remains.slice(spacer+1).map((row)=>row[1]).filter((id)=>id)
                        }
                    }
                )(values.slice(13));
                    
                return {
                    hide: false,
                    title,
                    daytime,
                    description:{
                        keywords,
                        ratios,
                        introduction
                    },
                    lecturerId,
                    assistantIds,
                    studentIds
                }
            }
        );
        const classInfos = await Promise.all(classInfoPromises);

        
        const result = await updateDidimdolClasses([...classInfos, ...classesToHide.map(title=>({title, hide: true}))]);

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

module.exports = saveDidimdolClass;