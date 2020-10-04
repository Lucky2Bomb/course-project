const config = require("config");

const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./models/User");
const Test = require("./models/Test");

const DATABASE_CONFIG = config.get("databaseConfig");
const LOGGING = config.get("logging");
const DETAIL_LOGGING = config.get("detailLogging");

if (LOGGING) {
    console.log("Trying connected to database...");
}

const sequelize = new Sequelize(DATABASE_CONFIG.database, DATABASE_CONFIG.username, DATABASE_CONFIG.password, {
    dialect: DATABASE_CONFIG.dialect,
    host: DATABASE_CONFIG.host,
    logging: DETAIL_LOGGING ? console.log : DETAIL_LOGGING
});

async function isConnection() {
    let isConnection = false;
    await sequelize.authenticate().then(() => {
        if (LOGGING) {
            console.log('successful connection to the database!');
        }
        _syncTables();

        isConnection = true;
    }).catch((error) => {
        if (LOGGING) {
            console.log('CONNECTION ERROR!');
            if (DETAIL_LOGGING) {
                console.log("details: ", error);
            }
        }
        isConnection = false;
    });
    return isConnection;
}

function _syncTables() {
    Test(sequelize, DataTypes).sync();
    User(sequelize, DataTypes).sync();
}
// _testConnectionToDB();

async function _testConnectionToDB() {
    const testtable = await Test(sequelize, DataTypes).findAll();
    console.log(JSON.stringify(testtable[0].message));
}

module.exports = {
    isConnection,
    sequelize,
    DataTypes
};