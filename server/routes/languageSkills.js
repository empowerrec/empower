var express = require('express');
var router = express.Router();
var languageSkills = require('../controllers/languageSkills');
var authentication = require('../config/authentication');

router.get('/', authentication.requiresRole(['A', 'J']), languageSkills.getLanguageSkills);
router.post('/', languageSkills.createLanguageSkill);
router.put('/', languageSkills.updateLanguageSkill);
router.get('/:id', languageSkills.getLanguageSkillById);

module.exports = router;