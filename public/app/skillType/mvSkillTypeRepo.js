angular.module('app').factory('mvSkillTypeRepo', function ($http, $q, mvSkillType,mvIdentity) {
    return {

        createSkillType: function (newSkillTypeData) {
            var newSkillType = new mvSkillType(newSkillTypeData);
            newSkillType.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SkillType");
            newSkillType.$save().then(function (skillType) {
                console.log(skillType);
                console.log("SkillType Saved");
                dfd.resolve(skillType);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createSkillTypeAfterCreatingUser: function (newSkillTypeData) {
            var newSkillType = new mvSkillType(newSkillTypeData);
            var dfd = $q.defer();
            console.log("Saving SkillType");
            newSkillType.$save().then(function (employer) {
                console.log("SkillType Saved");
                mvIdentity.currentSkillType = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSkillType: function (newSkillTypeData) {
            newSkillTypeData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSkillTypeData);
            angular.extend(clone,newSkillTypeData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});