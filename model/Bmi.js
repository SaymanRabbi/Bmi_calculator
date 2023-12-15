const mongoose = require('mongoose');
const validator = require('validator');

const BmiSchema = new mongoose.Schema({
    height:{
        type:Number,
        required:[true,"Please Enter Your Height"],
        validate(value){
            if(value <= 0){
                throw new Error("Height must be a positive number and not equal to zero")
            }
        }
    },
    weight:{
        type:Number,
        required:[true,"Please Enter Your Weight"],
        validate(value){
            if(value <= 0){
                throw new Error("Weight must be a positive number and not equal to zero")
            }
        }
    },
    bmi:{
        type:Number,
    },
    category:{
        type:String,
    },
    
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter a valid Email")
            }
        }
    },
},{
    timestamps:true
})
const Bmi = mongoose.model("Bmi",BmiSchema);
module.exports = Bmi;

