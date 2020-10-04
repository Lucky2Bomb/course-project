const express = require("express");
const app = express();
const config = require("config");
const database = require("./db");
const routes = require("./routes");
const PORT = config.get("port") || 3001;
const LOGGING = config.get("logging");

async function start() {
    if(LOGGING) {
        console.log("server is starting...");
    }
    
    if (database.isConnection()) {
        app.use(express.json({ extended: true }));
        routes(app);
        app.listen(PORT, () => {
            console.log(`server starting at the port ${PORT}...`);
        });
    } else {
        console.log("oops... Server not started...");
    }

}

start();