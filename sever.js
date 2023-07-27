const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
});
const manage =mongoose.model("manage",bookSchema);
module.exports=manage;