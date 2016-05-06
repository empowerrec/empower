var express = require('express');
var router = express.Router();
var educationalInformations = require('../controllers/educationalInformations');
var authentication = require('../config/authentication');

router.get('/', authentication.requiresRole(['A','J']), educationalInformations.getEducationalInformations);
router.post('/', educationalInformations.createEducationalInformation);
router.put('/', educationalInformations.updateEducationalInformation);
router.get('/:id', educationalInformations.getEducationalInformationById);



module.exports = router;