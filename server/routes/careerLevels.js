var express = require('express');
var router = express.Router();
var careerLevels = require('../controllers/careerLevels');
var authentication = require('../config/authentication');

router.get('/', careerLevels.getCareerLevels);
router.post('/', careerLevels.createCareerLevel);
router.put('/', careerLevels.updateCareerLevel);
router.get('/:id', careerLevels.getCareerLevelById);

module.exports = router;