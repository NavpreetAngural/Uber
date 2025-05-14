const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const port = process.env.PORT || 4000

app.use(cors())

app.get("/", (req, res) => {
    res.send("hanji fer")
})

app.listen(port, () => {
    console.log("server is running at", port)
})