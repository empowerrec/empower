var express = require('express');
var router = express.Router();
var specializations = require('../controllers/specializations');
var authentication = require('../config/authentication');

router.get('/', specializations.getSpecializations);
router.post('/', specializations.createSpecialization);
router.put('/', specializations.updateSpecialization);
router.get('/:id', specializations.getSpecializationById);

module.exports = router;