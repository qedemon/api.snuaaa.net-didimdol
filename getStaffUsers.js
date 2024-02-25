const {mongoose: {connect, disconnect}} = require("Utility");
const {User} = require("models");

(
    async()=>{
        await connect();
        const users = await User.find(
            {isStaff: true}
        );
        console.log(users.map(({name})=>name), users.length);
        await disconnect();
    }
)();