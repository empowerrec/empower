var express = require('express');
var router = express.Router();
var contactVias = require('../controllers/contactVias');
var authentication = require('../config/authentication');

router.get('/', contactVias.getContactVias);
router.post('/', contactVias.createContactVia);
router.put('/', contactVias.updateContactVia);
router.get('/:id', contactVias.getContactViaById);

module.exports = router;