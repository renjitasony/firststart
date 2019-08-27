var express = require('express');
var bodyparser = require('body-parser');
var mongoose =require('mongoose');
var multer = require("multer");
var upload = multer({dest:'./uploads'}).single('myfile');

var product = require("./model/product");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
var url = "mongodb+srv://sonyrenjita:mangoHONET@cluster0-sbret.mongodb.net/test?retryWrites=true&w=majority";
//var url = "mongodb://localhost/mydb1";
mongoose.connect(url,{useNewUrlParser:true},(err)=>{
    if(err) throw err;
    else{
        console.log("connected");
    }
})
app.use(function (req, res, next) {   
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');  
    res.setHeader('Access-Control-Allow-Credentials', true);   

    next();
})
app.listen(8000,(req,res)=>{
    console.log("server listening at 8000");
});
app.get("/add",(req,res)=>{
    var p1 = new product();
    p1.productid = "P3";
    p1.productname = "Third";
    p1.productprice = 452;
    p1.save((err)=>{
        if(err) throw err;
        else{
            res.send("added");
        }
    })
});
app.get("/data",(req,res)=>{
    res.send({msg:"data from server"})
});
app.get("/viewdata",(req,res)=>{
    product.find({},(err,result)=>{
        if(err) throw err;
        else{
            res.send(result);    
        }        
    })
});
app.post("/adddata",(req,res)=>{    
    
    var p1 = new product();
    p1.productid = req.body.pdid;
    p1.productname = req.body.pdname;
    p1.productprice = req.body.pdprice;
    p1.save((err)=>{
        if(err) throw err;
        else{
            res.send({serverdata:"added"});
        }
    })
});
app.get("/editdata",(req,res)=>{
    product.findOne({productid:req.body.id},(err,result)=>{
        if(err) throw err;
        else{
            res.send(result);
        }
    })
})