const app = require("./app");
const dotenv = require('dotenv')
dotenv.config({ path:'./config.env'});


app.listen(5000,function () {
    console.log("App run 5000")
});