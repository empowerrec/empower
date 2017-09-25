var express = require('express');
var router = express.Router();
var nationalities = require('../controllers/nationalities');
var authentication = require('../config/authentication');

router.get('/', nationalities.getNationalities);
router.post('/', nationalities.createNationality);
router.put('/', nationalities.updateNationality);
router.get('/:id', nationalities.getNationalityById);

module.exports = router;