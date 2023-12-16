//1. Import
var express = require('express');
var path = require('path');
const Web3 = require("web3");
var routes = require('./routes/route.js');


//2. Initiate
var app = express();


//3. Configure
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", routes.home);
app.listen('8080');
console.log("Catch the action at http://localhost:8080");


