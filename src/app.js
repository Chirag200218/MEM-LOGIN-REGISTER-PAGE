require('dotenv').config()
const hbs = require("hbs");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

require("../src/db/conn");
const register = require("../src/models/Register");

const static_path = path.join(__dirname,"../public")
app.use(express.static(static_path));

const view_path = path.join(__dirname,"../templates/views")
app.set("view engine","hbs");
app.set("views",view_path);

const partials_path = path.join(__dirname,"../templates/partials")
hbs.registerPartials(partials_path);


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("register");
})
 
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/logedIn",async(req,res)=>{
    try{
        const email = req.body.email;
        const result = await register.findOne({email})
        console.log(result.password,result);

        const token = await result.generateAuthToken();

        if(result.password===req.body.password){
            res.render("index");
        }else{
            res.send("No Such mail")    
        }
         
    }catch(err){
        res.send("No Such mail")    
    }   
})

app.post("/registerd",async(req,res)=>{
    if(req.body.password === req.body.Cpassword){
        try{
            const add= new register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                address:req.body.address,
                gender:req.body.gender,
                dob:req.body.dob,
                course:req.body.course,
                email:req.body.email,
                password:req.body.password
            })

            const token = await add.generateAuthToken();
            const result = await add.save();
            res.render("index");
        }catch(err){
            res.send(err);
        }
    }else{
        res.send(err)
    }
})

app.listen(port,()=>{
    console.log("App  is connected now")
})