var express = require('express');
var router = express.Router();
var features = require('../controllers/features');
var authentication = require('../config/authentication');

router.get('/', features.getFeatures);
router.post('/', features.createFeature);
router.put('/', features.updateFeature);
router.get('/:id', features.getFeatureById);

module.exports = router;