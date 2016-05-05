var express = require('express');
var router = express.Router();
var univirsties = require('../controllers/univirsties');
var authentication = require('../config/authentication');

router.get('/', univirsties.getUnivirsties);
router.post('/', univirsties.createUnivirsty);
router.put('/', univirsties.updateUnivirsty);
router.get('/:id', univirsties.getUnivirstyById);

module.exports = router;