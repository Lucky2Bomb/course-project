const {Router} = require("express");
const cors = require("cors");

const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = new Sequelize("course-shop_db", "root", "1234_Airat_qwerTy", {
    dialect: "mysql",
    host: "localhost"
});

async function testConnectionToMySQLDB() {
    try {
        await sequelize.authenticate();
        console.log('CONNECTION CONFIRMED!');
    } catch (error) {
        console.error('CONNECTION ERROR:', error);
    }
}
testConnectionToMySQLDB();

const Test = sequelize.define("Test", {
    idtests: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING(100)
    }
}, {
    //disabled created colums 'createdAt' and 'updatedAt'
    timestamps: false,
    tableName: "mytesttable"
});
Test.sync(); 
const testselectquest = async () => {
    const testtable = await Test.findAll();
    // console.log('TEST');
    // console.log((JSON.stringify(testtable[0].message)));
    return JSON.stringify(testtable[0].message);
}

const router = Router();

router.get("/", cors(), async (req, res) => {
    try {
        // res.send("Hello, react.js! By Express.js");
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        const testMessageBD = await testselectquest();
        
        res.status(201).json({message: "Hello React.js! By Express.js!" + ` ${testMessageBD.slice(1, testMessageBD.length - 2)}!`});
    } catch (error) {
        console.log("Oops! server error...");
        res.status(500).json({message: "Oops! server error..."});
    }
});

module.exports = router;