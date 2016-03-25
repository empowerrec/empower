angular.module('app').factory('mvEmployerRepo', function ($http, $q, mvEmployer) {
    return {

        createEmployer: function (newEmployerData) {
            var newEmployer = new mvEmployer(newEmployerData);
            var dfd = $q.defer();

            newEmployer.$save().then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentEmployer: function (newEmployerData) {
            var dfd = $q.defer();
            var clone = angular.copy(newEmployerData);
            angular.extend(clone,newEmployerData);
            clone.$update().then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});