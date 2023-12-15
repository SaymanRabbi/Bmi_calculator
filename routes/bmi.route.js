const express = require('express');
const { CreateBmiController } = require('../controllers/bmi.contoller');
const router = express.Router();

// -------> Controllers <-------
router.post("/bmi/create",CreateBmiController)

module.exports = router;