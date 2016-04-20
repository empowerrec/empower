angular.module('app').factory('mvJobTypeRepo', function ($http, $q, mvJobType,mvIdentity) {
    return {

        createJobType: function (newJobTypeData) {

            var newJobType = new mvJobType(newJobTypeData);
            newJobType.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving JobType");
            newJobType.$save().then(function () {
                console.log("JobType Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentJobType: function (newJobTypeData) {
            newJobTypeData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newJobTypeData);
            angular.extend(clone,newJobTypeData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});