var express = require('express');
var router = express.Router();
var addresses = require('../controllers/addresses');
var authentication = require('../config/authentication');

router.get('/', authentication.requiresRole('A'), addresses.getAddresses);
router.post('/', addresses.createAddress);
router.put('/', addresses.updateAddress);
router.get('/:id', addresses.getAddressById);

module.exports = router;