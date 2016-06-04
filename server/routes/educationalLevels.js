var express = require('express');
var router = express.Router();
var educationalLevels = require('../controllers/educationalLevels');
var authentication = require('../config/authentication');

router.get('/', educationalLevels.getEducationalLevels);
router.post('/', educationalLevels.createEducationalLevel);
router.put('/', educationalLevels.updateEducationalLevel);
router.get('/:id', educationalLevels.getEducationalLevelById);

module.exports = router;