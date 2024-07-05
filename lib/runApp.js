// example one
// running app with no options

// const express = require("express")
// const { runApp } = require("fast-express-backend")
// const app = express()
// app.get("/",(req,res) => res.status(200).send("This is the runApp function"))
// runApp(app,8000)

// example two
// running with after running function
// const express = require("express")
// const { runApp } = require("fast-express-backend")
// const app = express()
// app.get("/",(req,res) => res.status(200).send("This is the runApp function"))

// function afterServerIsOn(){
//     console.log("Hey there , Server is running on port 8000.Good luck with the server")
// }

// runApp(app,8000,afterServerIsOn)

// example three
// running with before and after functions
const express = require("express")
const { runApp } = require("fast-express-backend")
const app = express()
app.get("/",(req,res) => res.status(200).send("This is the runApp function"))

function afterServerIsOn(){
    console.log("Hey there , Server is running on port 8000.Good luck with the server")
}

async function beforeTheServerIsOn(){
    await new Promise((resolve,reject) => {
        setTimeout(() => {resolve(true)},2000)
    })

    console.log("Database is connected")
}

runApp(app,8000,afterServerIsOn,beforeTheServerIsOn)