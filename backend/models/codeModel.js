const mongoose=require('mongoose');
const codeSchema=new mongoose.Schema({
    username:{
        type:String

    },
    filename:{
        type:String
    },
    code:{
        type:String
    }
},{timestamps:true})
const codeModel=mongoose.model('codes',codeSchema)
module.exports=codeModel;
