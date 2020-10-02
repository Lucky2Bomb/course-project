const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json({ extended: true }));
app.use("/", require("./routes/main.routes"));

app.listen(PORT, () => {
    console.log(`Server starting at the port ${PORT}...`);
});