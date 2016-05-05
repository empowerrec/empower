var express = require('express');
var router = express.Router();
var educationTypes = require('../controllers/educationTypes');
var authentication = require('../config/authentication');

router.get('/', educationTypes.getEducationTypes);
router.post('/', educationTypes.createEducationType);
router.put('/', educationTypes.updateEducationType);
router.get('/:id', educationTypes.getEducationTypeById);

module.exports = router;