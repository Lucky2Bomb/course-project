const {Router} = require("express");
const cors = require("cors");

const router = Router();

router.get("/", cors(), async (req, res) => {
    try {
        // res.send("Hello, react.js! By Express.js");
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.status(201).json({message: "Hello React.js! By Express.js"});
    } catch (error) {
        console.log("Oops! server error...");
        res.status(500).json({message: "Oops! server error..."});
    }
});

module.exports = router;