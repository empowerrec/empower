var express = require('express');
var router = express.Router();
var genders = require('../controllers/genders');
var authentication = require('../config/authentication');

router.get('/', genders.getGenders);
router.post('/', genders.createGender);
router.put('/', genders.updateGender);
router.get('/:id', genders.getGenderById);

module.exports = router;