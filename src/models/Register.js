const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const registerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
    },
    dob:{
        type:Date,
        required:true,
    },
    course:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})

registerSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this);
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token})
        await this.save();
        console.log(token);
        return token;

    }catch(err){
        console.log(err)
        res.send(err);
    }
}

const register = new mongoose.model("register",registerSchema);
module.exports = register;