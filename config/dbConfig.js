const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: '../config.env' });

const url = process.env.MONGO_CONNECTION_STRING;

if(!url) {
    console.error("Error: MONGO_CONNECTION_STRING is not defined in config.env");
    process.exit(1);
}
mongoose.connect(url)
                    .then(() => {
                        console.log("DB connection successful!!");
                    })
                    .catch((e) => {
                        console.log("Error in conneting with mongodb :", e);
                    })

mongoose.connection.on("connected", () => {
    console.log("Connected to DB!");
})

mongoose.connection.on("error", () => {
    console.log("Connection failed!!");
})


