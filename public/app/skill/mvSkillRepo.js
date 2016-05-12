angular.module('app').factory('mvSkillRepo', function ($http, $q, mvSkill,mvIdentity) {
    return {

        createSkill: function (newSkillData) {
            var newSkill = new mvSkill(newSkillData);
            newSkill.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Skill");
            newSkill.$save().then(function () {
                console.log("Skill Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createSkillAfterCreatingUser: function (newSkillData) {
            var newSkill = new mvSkill(newSkillData);
            var dfd = $q.defer();
            console.log("Saving Skill");
            newSkill.$save().then(function (skill) {
                console.log("Skill Saved");
                mvIdentity.currentSkill = skill;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSkill: function (newSkillData) {
            newSkillData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSkillData);
            angular.extend(clone,newSkillData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});