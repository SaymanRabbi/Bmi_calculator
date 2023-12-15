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
       const result =  await bmi.save();
            res.status(201).json({
                success: true,
                message: "BMI created successfully",
                data: ` Your BMI is ${bmiResult.toFixed(2)} and you are ${result.category}`
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
        const { email } = req.params;
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