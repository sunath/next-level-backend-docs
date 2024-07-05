// import the libraries
const express = require("express")
const { runApp } = require("fast-express-backend")

const app = express()

app.get("/",function(req,res){
    return res.status(200).send("This is the most basic response.")
})

runApp(app,8000)