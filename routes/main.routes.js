const {Router} = require("express");
const cors = require("cors");
const database = require("../db");
const router = Router();
const config = require("config");
const LOGGING = config.get("logging");
const DETAIL_LOGGING = config.get("detailLogging");
const Test = require("../models/Test");

router.get("/", cors(), async (req, res) => {
    try {
        // res.send("Hello, react.js! By Express.js");
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        const testMessageBD = await testselectquest();
        console.log(database.tables);
        res.status(201).json({message: "Hello React.js! By Express.js!" + ` ${testMessageBD.slice(1, testMessageBD.length - 2)}!`});
        // res.status(201).json({message: "Hello React.js! By Express.js!"});
    } catch (error) {
        if(LOGGING) {
            console.log("Oops! server error...");
            if(DETAIL_LOGGING) {
                console.log("Details: ", error);
            }
        }
        res.status(500).json({message: "Oops! server error..."});
    }
});


const testselectquest = async () => {
    const testtable = await Test(database.sequelize, database.DataTypes).findAll();
    return JSON.stringify(testtable[0].message);
}

module.exports = router;