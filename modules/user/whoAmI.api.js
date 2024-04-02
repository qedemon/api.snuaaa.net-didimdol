const authorize = require("modules/authorize/middleware");

function attachWhoAmI(app){
    app.use("/whoAmI", authorize);
    app.get("/whoAmI", (req, res)=>{
        res.status(req?.authorization?.authorized?200:401).json(
            (
                (authorization)=>{
                    const {userInfo} = authorization;
                    return userInfo?
                        {
                            ...authorization,
                            userInfo: (
                                (userInfo)=>{
                                    const {password, ...remain} = userInfo;
                                    return remain;
                                }
                            )
                        }:
                        authorization
                }
            )(req.authorization)
        )
    })
    return app;
}

module.exports = attachWhoAmI;