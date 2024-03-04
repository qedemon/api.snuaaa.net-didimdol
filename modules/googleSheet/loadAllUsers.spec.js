const {googleAuthorize, loadAllUsers} = require("./core");

test("loadAllUsers", async ()=>{
    const {sheet} = await googleAuthorize();
    const {url, error} = await loadAllUsers("1H17rjQcgJFfq6KN9oYPlCJsQOT7YLEsQsZtQDa6VqFY", sheet);
    if(error){
        console.error(error);
        throw error;
    }
    console.log(url);
})