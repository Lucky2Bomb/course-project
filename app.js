const express = require("express");
const app = express();
// const {Sequelize, Model, DataTypes} = require("sequelize");
// const sequelize = new Sequelize("course-shop_db", "root", "1234_Airat_qwerTy", {
//     dialect: "mysql",
//     host: "localhost"
// });

// async function testConnectionToMySQLDB() {
//     try {
//         await sequelize.authenticate();
//         console.log('CONNECTION CONFIRMED!');
//     } catch (error) {
//         console.error('CONNECTION ERROR:', error);
//     }
// }
// testConnectionToMySQLDB();

const PORT = 3001;


app.use(express.json({ extended: true }));
app.use("/", require("./routes/main.routes"));

app.listen(PORT, () => {
    console.log(`Server starting at the port ${PORT}...`);
});