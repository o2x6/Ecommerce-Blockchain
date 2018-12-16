var express = require("express");
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var path = require("path");
var getRouter = require("./controllers/get");
var postRouter = require("./controllers/post");
var blockRouter = require("./controllers/block");

var ejs = require("ejs");

var app = express();


app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/views');

app.use(express.static(path.join(__dirname, 'views')))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/',getRouter);
app.use('/',postRouter);
app.use('/',blockRouter);

// mongoose.connect("mongodb://localhost/ecommerce");



app.listen(8080);

console.log("Server is running at port 8080");
