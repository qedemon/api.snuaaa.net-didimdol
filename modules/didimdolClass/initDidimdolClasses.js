require("dotenv").config();
const {mongoose: {connect, disconnect}} = require("Utility");
const {User, DidimdolClass} = require("models");
const {getNow} = require("modules/time/core");

const classSchema = [
    {
        title: "1",
        lecturerId: "novasnuaaa",
        assistantIds: ["test30"],
        daytime: {
            day: "월",
            start: "03:30",
            end: "06:30"
        },

        description: {
            keywords: ["별☂️", "술☠️", "사랑🫀"],
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

    },
    {
        title: "2",
        lecturerId: "test31",
        assistantIds: ["signuptests6", "asdf1234"],
        daytime: {
            day: "화",
            start: "03:30",
            end: "06:30"
        },

        description: {
            keywords: ["별🫥", "술💀", "무언가?👨‍❤️‍👨"],
            ratios: [
                {
                    label: "관측",
                    ratio: 0.5
                },
                {
                    label: "친목",
                    ratio: 0.5
                }
            ],
            introduction: "국회는 선전포고 어쩌구"
        }
        
    },
    {
        title: "3",
        lecturerId: "razar0621",
        assistantIds: ["test36", "test37"],
        daytime: {
            day: "화",
            start: "05:00",
            end: "08:00"
        },

        description: {
            keywords: ["별🍙", "사랑🥣", "무언가?🍅"],
            ratios: [
                {
                    label: "관측",
                    ratio: 0.8
                },
                {
                    label: "친목",
                    ratio: 0.2
                }
            ],
            introduction: "국회는 선전포고 어쩌구"
        }
        
    },
    {
        title: "5",
        lecturerId: "aakana",
        assistantIds: ["razar0621", "smallMoons"],
        daytime: {
            day: "수",
            start: "03:30",
            end: "05:30"
        },

        description: {
            keywords: ["별🍙", "사랑🥣", "무언가?🍅"],
            ratios: [
                {
                    label: "관측",
                    ratio: 0.8
                },
                {
                    label: "친목",
                    ratio: 0.2
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