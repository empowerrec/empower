angular.module('app').factory('mvExperianceRepo', function ($http, $q, mvExperiance,mvIdentity) {
    return {

        createExperiance: function (newExperianceData) {
            var newExperiance = new mvExperiance(newExperianceData);
            newExperiance.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Experiance");
            newExperiance.$save().then(function () {
                console.log("Experiance Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createExperianceAfterCreatingUser: function (newExperianceData) {
            var newExperiance = new mvExperiance(newExperianceData);
            var dfd = $q.defer();
            console.log("Saving Experiance");
            newExperiance.$save().then(function (experiance) {
                console.log("Experiance Saved");
                mvIdentity.currentExperiance = experiance;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentExperiance: function (newExperianceData) {
            newExperianceData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newExperianceData);
            angular.extend(clone,newExperianceData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});