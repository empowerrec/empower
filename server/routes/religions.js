var express = require('express');
var router = express.Router();
var religions = require('../controllers/religions');
var authentication = require('../config/authentication');

router.get('/', religions.getReligions);
router.post('/', religions.createReligion);
router.put('/', religions.updateReligion);
router.get('/:id', religions.getReligionById);

module.exports = router;