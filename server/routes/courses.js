var express = require('express');
var router = express.Router();
var courses = require('../controllers/courses');

router.get('/', courses.getCourses);
router.get('/:id', courses.getCourseById);

module.exports = router;