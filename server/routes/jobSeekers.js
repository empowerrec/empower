var express = require('express');
var router = express.Router();
var jobSeekers = require('../controllers/jobSeekers');
var authentication = require('../config/authentication');

router.get('/', authentication.requiresRole('A'), jobSeekers.getJobSeekers);
router.post('/', jobSeekers.createJobSeeker);
router.put('/', jobSeekers.updateJobSeeker);
router.get('/:id', jobSeekers.getJobSeekerById);



module.exports = router;