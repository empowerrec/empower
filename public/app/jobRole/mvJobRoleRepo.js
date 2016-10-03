angular.module('app').factory('mvJobRoleRepo', function ($http, $q, mvJobRole,mvIdentity) {
    return {

        createJobRole: function (newJobRoleData) {

            var newJobRole = new mvJobRole(newJobRoleData);
            newJobRole.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving JobRole");
            newJobRole.$save().then(function () {
                console.log("JobRole Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentJobRole: function (newJobRoleData) {
            newJobRoleData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newJobRoleData);
            angular.extend(clone,newJobRoleData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});