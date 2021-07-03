const Routes = require("./routes.js")

const express = require("express")
const app = express()

const methodOverride = require("method-override")

const  bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended:true}))

app.set("view engine" , "ejs")
app.use(express.static("public"))
app.use(methodOverride("_method"))

app.use("/" , Routes)


app.listen(3000, () => {
    console.log("Started...")
})