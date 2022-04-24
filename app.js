const express = require('express')
const connectDb = require('./db')
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./router/router')

const app = express();
connectDb;
//for deploy
if ((process.env.NODE_ENV = "production")) {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


const PORT = process.env.PORT || 8000;




app.listen(PORT, () => console.log(`Server running at ${PORT}`));