var express = require('express');
var router = express.Router();
var carLicenceTypes = require('../controllers/carLicenceTypes');
var authentication = require('../config/authentication');

router.get('/', carLicenceTypes.getCarLicenceTypes);
router.post('/', carLicenceTypes.createCarLicenceType);
router.put('/', carLicenceTypes.updateCarLicenceType);
router.get('/:id', carLicenceTypes.getCarLicenceTypeById);

module.exports = router;