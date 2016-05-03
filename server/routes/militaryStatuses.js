var express = require('express');
var router = express.Router();
var militaryStatuses = require('../controllers/militaryStatuses');
var authentication = require('../config/authentication');

router.get('/', militaryStatuses.getMilitaryStatuses);
router.post('/', militaryStatuses.createMilitaryStatus);
router.put('/', militaryStatuses.updateMilitaryStatus);
router.get('/:id', militaryStatuses.getMilitaryStatusById);

module.exports = router;