"use strict";
let express=require('express');
let bodyParser=require('body-parser');
let app=express();

app.listen(8888, function(){
    let port=this.address().port;
    console.log("Server running on port %s", port);
});

/*********** MIDDLEWARE ************/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next){ //Next serve per passare alla route successiva
    let d=new Date();
	var key;
    console.log(d.toLocaleTimeString() + ">_ " + req.method + " - " + req.originalUrl);
    for(key in req.query)
        console.log(key + ": " + req.query[key] + "\t");
    for(key in req.body)
        console.log(key + ": " + req.body[key] + "\t");
    for(key in req.params)
        console.log(key + ": " + req.params[key] + "\t");
    next();
});
app.use(express.static("static"));


app.use("/", (req, res, next)=>{
    res.sendFile("/index.html",{root: "./static"});
});


/***********    Gestione dell'errore    ***********/

app.use(function(req, res){
    //res.status(400).send("La pagina richiesta non è stata trovata!");
    res.status(400).sendFile("/error.html",{root: "./static"});
});