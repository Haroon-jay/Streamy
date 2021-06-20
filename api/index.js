const express=require("express")
const app=express();
const bodyParser=require("body-parser")
const cors=require("cors")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.set("view engine","ejs")
const path  =require("path")
var method = require('method-override')
app.use(method("method"))
app.set("views",path.join(__dirname,"views"))
const streamRouter = require('./routes/streamRoute')
const mongoose = require('mongoose')
const connection ="mongodb+srv://Haroon:Warrobots69.@cluster0.5duo6.mongodb.net/Streams?retryWrites=true&w=majority"
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));


const db = mongoose.connection

app.get("/",(req,res)=>{
    console.log("help")
res.send("Hello and Welcome!")
})
app.get("/api/secret",(req,res)=>{
  res.send("secret")
})

app.use('/api', streamRouter)
let port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(port)
    console.log("Server up and running!")
})