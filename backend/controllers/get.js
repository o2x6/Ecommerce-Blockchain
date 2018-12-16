var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    res.render("index")
})

router.get("/login",function(req,res){
    res.render("login")
})

router.get("/register",function(req,res){
    res.render("login")
})

router.get("/products",function(req,res){
    res.render("shop")
})


router.get("/product-details",function(req,res){
    res.render("product-details")
})

router.get("/nowhere",function(req,res){
    res.render("404")
})

router.get("/trail",function(req,res){
    res.render("trail",{balance:""});
})

module.exports = router;
