const express = require('express');
const { CreateBmiController, GetBmiController } = require('../controllers/bmi.contoller');
const router = express.Router();

// -------> Controllers <-------
/**
 * Bmi Create Route
 * Api Example: http://localhost:5000/api/v1/bmi/create  
 * @body {object} req - request object
 * @returns {object} 200 - An object of success status, message and data
 */
router.post("/bmi/create",CreateBmiController)
/**
 * Get Bmi Route
 * Api Example: http://localhost:5000/api/v1/bmi/get  
 * @param {gmail} req - using email to get the bmi 
 * @returns {object} 200 - An Array of success status, message and data
 */
router.get("/bmi/get/:email",GetBmiController)


module.exports = router;