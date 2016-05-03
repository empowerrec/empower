var express = require('express');
var router = express.Router();
var maritalStatuses = require('../controllers/maritalStatuses');
var authentication = require('../config/authentication');

router.get('/', maritalStatuses.getMaritalStatuses);
router.post('/', maritalStatuses.createMaritalStatus);
router.put('/', maritalStatuses.updateMaritalStatus);
router.get('/:id', maritalStatuses.getMaritalStatusById);

module.exports = router;