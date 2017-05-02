var express = require('express');
var router = express.Router();
var userFeatures = require('../controllers/userFeatures');
var authentication = require('../config/authentication');

router.get('/', userFeatures.getUserFeatures);
router.post('/', userFeatures.createUserFeature);
router.put('/', userFeatures.updateUserFeature);
router.get('/:id', userFeatures.getUserFeatureById);

module.exports = router;