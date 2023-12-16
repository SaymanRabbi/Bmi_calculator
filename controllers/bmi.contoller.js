const { createToken } = require("../middleware/crete.token");
const Bmi = require("../model/Bmi");
const { CreateBmiService } = require("../services/bmi.services")
module.exports.CreateBmiController = async (req, res) => {
    try {
        const bmi = await  CreateBmiService(req.body)
      const {bmi:bmiResult} = bmi;
      if(bmiResult < 18.5){
        bmi.category = "Underweight"
      }
        else if(bmiResult >= 18.5 && bmiResult <= 24.9){
            bmi.category = "Normal Weight"
        }
        else if(bmiResult >= 25 && bmiResult <= 29.9){
            bmi.category = "Overweight"
        }
        else if(bmiResult >= 30){
            bmi.category = "Obesity"
        }
        const token = createToken(bmi)
        bmi.token = token;
       const result =  await bmi.save();
            res.status(201).json({
                success: true,
                message: "BMI created successfully",
                data: ` Your BMI is ${bmiResult.toFixed(2)} and you are ${result.category}`,
                token:token
            })

    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack
    })
    }
}
module.exports.GetBmiController = async (req, res) => {
    try {
        const { email } = req.userData;
        const bmi = await Bmi.find({ email });
        res.status(200).json({
            success: true,
            message: "BMI fetched successfully",
            data: bmi
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack
        })
    }
}

module.exports.UpdateBmiController = async (req, res) => {
    try {
        const { _id } = req.userData;
        const { height, weight } = req.body;
        if(!height || !weight 
            || height === "" || weight === ""  || height <= 0 || weight <= 0
            ){
            throw new Error("Please Enter Your Height and Weight")
        }
        
        const bmiValue = parseFloat(weight) / (((parseFloat(height) *30.48)/100) *( (parseFloat(height)*30.48/100)));
        const bmi = await Bmi.findByIdAndUpdate(_id, { height, weight, bmi:bmiValue }, { new: true });
        res.status(200).json({
            success: true,
            message: "BMI updated successfully",
            data: bmi
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack
        })
    }
}
module.exports.DeleteBmiController = async (req, res) => {
    try {
        const { _id } = req.userData;
        const bmi = await Bmi.findById(_id);
        if (!bmi) {
            throw new Error("BMI not found")
        }
        await Bmi.findByIdAndDelete(_id);
        res.status(200).json({
            success: true,
            message: "BMI deleted successfully",
            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack
        })
    }
}