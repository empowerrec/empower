angular.module('app').factory('mvLanguageSkillRepo', function ($http, $q, mvLanguageSkill,mvIdentity) {
    return {

        createLanguageSkill: function (newLanguageSkillData) {
            var newLanguageSkill = new mvLanguageSkill(newLanguageSkillData);
            newLanguageSkill.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving LanguageSkill");
            newLanguageSkill.$save().then(function () {
                console.log("LanguageSkill Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createLanguageSkillAfterCreatingUser: function (newLanguageSkillData) {
            var newLanguageSkill = new mvLanguageSkill(newLanguageSkillData);
            var dfd = $q.defer();
            console.log("Saving LanguageSkill");
            newLanguageSkill.$save().then(function (languageSkill) {
                console.log("LanguageSkill Saved");
                mvIdentity.currentLanguageSkill = languageSkill;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentLanguageSkill: function (newLanguageSkillData) {
            newLanguageSkillData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newLanguageSkillData);
            angular.extend(clone,newLanguageSkillData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});