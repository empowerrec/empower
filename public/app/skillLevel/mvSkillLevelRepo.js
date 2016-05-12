angular.module('app').factory('mvSkillLevelRepo', function ($http, $q, mvSkillLevel,mvIdentity) {
    return {

        createSkillLevel: function (newSkillLevelData) {
            var newSkillLevel = new mvSkillLevel(newSkillLevelData);
            newSkillLevel.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SkillLevel");
            newSkillLevel.$save().then(function (skillLevel) {
                console.log(skillLevel);
                console.log("SkillLevel Saved");
                dfd.resolve(skillLevel);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createSkillLevelAfterCreatingUser: function (newSkillLevelData) {
            var newSkillLevel = new mvSkillLevel(newSkillLevelData);
            var dfd = $q.defer();
            console.log("Saving SkillLevel");
            newSkillLevel.$save().then(function (employer) {
                console.log("SkillLevel Saved");
                mvIdentity.currentSkillLevel = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSkillLevel: function (newSkillLevelData) {
            newSkillLevelData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSkillLevelData);
            angular.extend(clone,newSkillLevelData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});