var express = require('express');
var router = express.Router();
var visaStatuses = require('../controllers/visaStatuses');
var authentication = require('../config/authentication');

router.get('/', visaStatuses.getVisaStatuses);
router.post('/', visaStatuses.createVisaStatus);
router.put('/', visaStatuses.updateVisaStatus);
router.get('/:id', visaStatuses.getVisaStatusById);

module.exports = router;