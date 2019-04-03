const express = require("express");
const db = require("../database");
const mysql = require("mysql");
const app = express.Router();

app.post("/",async function(req,res){
    const {searchItem} = req.body;
    let query = mysql.format("select * from items where category=?",[searchItem]);
    await db.query(query,async function(err,result){
        if(result){
            let error = "";
            if(result.length === 0){
                error = "No Items Available";
            }
            res.render("search.ejs",{data: result,error: error});
        }else{
            console.log(err);
        } 
    })
})

module.exports = app;