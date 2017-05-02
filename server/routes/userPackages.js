var express = require('express');
var router = express.Router();
var userPackages = require('../controllers/userPackages');
var authentication = require('../config/authentication');

router.get('/', userPackages.getUserPackages);
router.post('/', userPackages.createUserPackage);
router.put('/', userPackages.updateUserPackage);
router.get('/:id', userPackages.getUserPackageById);

module.exports = router;