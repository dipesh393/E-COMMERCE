const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port||3000;
const db = require("./database");
app.use(express.static("staticFiles"));
app.use(bodyParser.urlencoded({extended:true}));

user = {}

//importing other routes

const auth = require("./models/auth");
app.use("/user",auth);

app.get("/",(req,res)=>{
    if(Object.keys(user).length>0){
        return res.redirect("/home");
    }
    return res.render("form.ejs")
})
const search = require("./models/search");
app.use("/search",search);

const profile = require("./models/profile");
app.use("/profile",profile);

app.get("/search",(req,res)=>{
	return res.render("search.ejs")
})

app.get("/retailer",(req,res)=>{
	return res.render("retailer.ejs")
})

app.get("/home",(req,res)=>{
    var query = 'select * from items';
    db.query(query,(error,result,fields)=>{
        if(error)
        {
            console.log("There is some error");
            throw error;
        }
        
        return res.render("home.ejs",{user: user,data:result});
    })
})


app.listen(port,()=>{
    console.log(port+" is listening...");
})
