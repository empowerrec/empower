angular.module('app').factory('mvEmployerRepo', function ($http, $q, mvEmployer,mvIdentity) {
    return {

        createEmployer: function (newEmployerData) {

            var newEmployer = new mvEmployer(newEmployerData);
            newEmployer.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Employer");
            newEmployer.$save().then(function () {
                console.log("Employer Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentEmployer: function (newEmployerData) {
            newEmployerData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newEmployerData);
            angular.extend(clone,newEmployerData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});