const {allDidimdolClasses} = require("modules/didimdolClass/core");
const getSheetTitles = require("./getSheetTitles");
const addSheets = require("./addSheets");
const {getNow} = require("modules/time/core");

async function loadDidimdolClass(sheetId, sheet){
    try{

        const didimdolClasses = await (
            async ()=>{
                const {didimdolClasses, error} = await allDidimdolClasses();
                if(error){
                    throw error
                }
                return didimdolClasses;
            }
        )();

        const sheetTitles = await (
            async (sheetId, sheet)=>{
                const {sheetTitles, error} = await getSheetTitles(sheetId, sheet);
                if(error){
                    throw error
                }
                return sheetTitles
            }
        )(sheetId, sheet);

        const sheetsToAdd = didimdolClasses.map(({title})=>`${title}조`).filter(title=>!sheetTitles.includes(title));
        if(sheetsToAdd.length>0){
            addSheets(sheetsToAdd);
        }
        const loadings = didimdolClasses.map(
            async (didimdolClass)=>{
                const {title, daytime:{day, start, end}, description: {keywords, ratios, introduction}, lecturer:[lecturer], assistants, students } = didimdolClass;
                const userCells = (user)=>user?[user.id, user.name, user.major]:[];
                const range = `${title}조`
                const values = [
                    [`${title}조`, "", "수정시각", getNow().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})],
                    ["시간", day, start, end],
                    [],
                    ["키워드", ...keywords],
                    [],
                    ["비율", ratios[0]?.label, ratios[0]?.ratio],
                    ["", ratios[1]?.label, ratios[1]?.ratio],
                    [],
                    ["설명", introduction],
                    [],
                    ["", "아이디", "이름", "전공?"],
                    ["강사", ...userCells(lecturer)],
                    [],
                    ["조장", ...userCells(assistants[0])],
                    ...assistants.slice(1).map(user=>["", ...userCells(user)]),
                    [],
                    ["조원",...userCells(students[0])],
                    ...students.slice(1).map(user=>["", ...userCells(user)])
                ];

                return await sheet.spreadsheets.values.update({
                    spreadsheetId: sheetId,
                    range,
                    valueInputOption: "RAW",
                    resource: {
                        values
                    }
                })
            }
        )

        return {
            result: await Promise.all(loadings),
            url: `https://docs.google.com/spreadsheets/d/${sheetId}/`
        }
    }
    catch(error){
        console.log(error);
        return {
            error
        }
    }
}

module.exports = loadDidimdolClass;