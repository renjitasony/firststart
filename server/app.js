var express = require('express');
var bodyparser = require('body-parser');
var mongoose =require('mongoose');

var product = require('../rens/src/assets/model/product');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
var url = "mongodb://localhost/mydb1";
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
app.get("/data",(req,res)=>{
    res.send({msg:"data from server"})
});
app.get("/viewdata",(req,res)=>{
    product.findOne({},(err,result)=>{
        if(err) throw err;
        else{
            res.send(result);    
        }        
    })
});