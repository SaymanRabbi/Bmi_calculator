const Bmi = require("../model/Bmi");

module.exports.CreateBmiService = async (bmi) => {
    try {
        const { height, weight } = bmi;
        const bmiValue = weight / (((height *30.48)/100) *( (height*30.48/100)));
        bmi.bmi = bmiValue;
        const bmiCreated = await Bmi.create(bmi);
        return bmiCreated;
    } catch (error) {
        throw error;
    }
}