var express = require('express');
var router = express.Router();
var packageCosts = require('../controllers/packageCosts');
var authentication = require('../config/authentication');

router.get('/', packageCosts.getPackageCosts);
router.post('/', packageCosts.createPackageCost);
router.put('/', packageCosts.updatePackageCost);
router.get('/:id', packageCosts.getPackageCostById);

module.exports = router;