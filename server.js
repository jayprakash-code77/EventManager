const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const  mongoose = require("./config/dbConfig.js");

const app = require("./app.js");
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log("Server listening on PORT :",port);
});







































