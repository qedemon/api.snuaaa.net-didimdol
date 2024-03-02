require("dotenv").config();
const {mongoose: {connect, disconnect}} = require("Utility");
const {User, DidimdolClass} = require("models");
const {getNow} = require("modules/time/core");

const classSchema = [
    {
        lecturerId: "novasnuaaa",
        assistantIds: ["test30"],
        daytime: {
            day: "월",
            start: "오후 3시",
            end: "오후 6시"
        },

        description: {
            keywords: ["별", "술", "사랑"],
            ratios: [
                {
                    label: "관측",
                    ratio: 0.3
                },
                {
                    label: "친목",
                    ratio: 0.7
                }
            ],
            introduction: "국회는 선전포고 어쩌구"
        }

    }
];

async function initDidimdolClasses(){
    try{
        await connect();

        await DidimdolClass.deleteMany({});

        return {
            created: await DidimdolClass.create(classSchema)
        }
    }
    catch(error){
        console.log(error);
        return {
            error
        }
    }
    finally{
        await disconnect();
    }
}

module.exports = initDidimdolClasses;