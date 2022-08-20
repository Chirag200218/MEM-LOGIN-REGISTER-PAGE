const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("DB Connnected");
})
.catch((err)=>{
    console.log(err);
})