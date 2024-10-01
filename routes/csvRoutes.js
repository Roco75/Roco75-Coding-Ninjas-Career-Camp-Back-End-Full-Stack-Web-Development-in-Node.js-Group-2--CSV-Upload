const express = require('express');
const csvController = require('../controllers/csvController');
const router = express.Router();

router.get('/', csvController.getHomePage);
router.post('/upload', csvController.uploadCSV);
router.get('/view/:filename', csvController.viewCSVData);

module.exports = router;
