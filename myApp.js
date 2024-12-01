let express = require('express');
let app = express();
require('dotenv').config();

//console.log("Hello World");


// app.get("/", (req,res)=>{
//     res.send("Hello Express");
// })

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use("/public",express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
})


app.get("/json",(req,res)=>{
    console.log(process.env.MESSAGE_STYLE);
    process.env.MESSAGE_STYLE==="uppercase"? res.json({"message": "HELLO JSON"}): res.json({message:"Hello json"})
})


//chaining middleware
app.get("/now", (req,res,next)=>{
    req.time=new Date().toString();
    //console.log(req.time);
    next();
},(req,res)=>{
    res.json({"time":req.time})
});



































 module.exports = app;
