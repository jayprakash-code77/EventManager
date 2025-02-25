const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./Userdata");
const User = require("../models/user");




dotenv.config({path: "../config.env"});




// env imports
const port = process.env.PORT;
const connectionString = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(connectionString).
                                    then( (result) =>{
                                         console.log("Configration is successful!!!");
                                    })
                                    .catch( (err) => {
                                        console.log("Configration failed!!!");
                                    });

mongoose.connection.on("connected", () => {
    console.log("DB connection successful!!!");
});

mongoose.connection.on("error", () => {
    console.log("DB connection failed!!!");
});




const init = async () => {
    await User.deleteMany({});
    await User.insertMany(data.data);
    console.log("Data inserted successfully!!!");
}


// init();

















app.listen(port,  () => {
    console.log("Server listening on port :",port);
});
