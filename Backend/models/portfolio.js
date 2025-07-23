import mongoose from "mongoose";
import User from "./user.js";
const portfolioSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
    },
    template:{
        type:String
    }

},{
    timestamps: true
})

const Portfolio =new mongoose.model("portfolio",portfolioSchema);

export default Portfolio;