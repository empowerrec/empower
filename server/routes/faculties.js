var express = require('express');
var router = express.Router();
var faculties = require('../controllers/faculties');
var authentication = require('../config/authentication');

router.get('/', faculties.getFaculties);
router.post('/', faculties.createFaculty);
router.put('/', faculties.updateFaculty);
router.get('/:id', faculties.getFacultyById);

module.exports = router;