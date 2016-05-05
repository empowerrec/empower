var express = require('express');
var router = express.Router();
var courses = require('../controllers/courses');

router.get('/', courses.getCourses);
router.post('/', courses.createCourse);
router.put('/', courses.updateCourse);
router.get('/:id', courses.getCourseById);

module.exports = router;