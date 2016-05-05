var express = require('express');
var router = express.Router();
var grades = require('../controllers/grades');
var authentication = require('../config/authentication');

router.get('/', grades.getGrades);
router.post('/', grades.createGrade);
router.put('/', grades.updateGrade);
router.get('/:id', grades.getGradeById);

module.exports = router;