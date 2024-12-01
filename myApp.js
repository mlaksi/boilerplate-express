let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser=require("body-parser");

//console.log("Hello World");


// app.get("/", (req,res)=>{
//     res.send("Hello Express");
// })

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

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


//ROUTE PARAMS
// Build an echo server, mounted at the route GET /:word/echo. 
// Respond with a JSON object, taking the structure {echo: word}. 
// You can find the word to be repeated at req.params.word. 
// You can test your route from your browser's address bar, v
// isiting some matching routes, 
// e.g. your-app-rootpath/freecodecamp/echo.

app.get("/:word/echo",(req,res)=>{
    const obj={"echo":req.params.word};
    res.json(obj);
})

//QUERY PARAMS

app.route("/name").get((req,res)=>{
    console.log(req.query.first+" "+req.query.last);
    res.json({"name":`${req.query.first} ${req.query.last}`})
})


































 module.exports = app;
