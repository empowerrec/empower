var express = require('express');
var router = express.Router();
var hearAboutUss = require('../controllers/hearAboutUss');
var authentication = require('../config/authentication');

router.get('/', hearAboutUss.getHearAboutUss);
router.post('/', hearAboutUss.createHearAboutUs);
router.put('/', hearAboutUss.updateHearAboutUs);
router.get('/:id', hearAboutUss.getHearAboutUsById);

module.exports = router;