var express = require('express');
var router = express.Router();
var packageFeatures = require('../controllers/packageFeatures');
var authentication = require('../config/authentication');

router.get('/', packageFeatures.getPackageFeatures);
router.post('/', packageFeatures.createPackageFeature);
router.put('/', packageFeatures.updatePackageFeature);
router.get('/:id', packageFeatures.getPackageFeatureById);

module.exports = router;