angular.module('app').factory('mvVacancyRepo', function ($http, $q, mvVacancy) {
    return {
        createVacancy: function (newVacancyData) {
            var newVacancy = new mvVacancy(newVacancyData);
            var dfd = $q.defer();

            newVacancy.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentVacancy: function (newVacancyData) {
            var dfd = $q.defer();
            var clone = angular.copy(newVacancyData);
            angular.extend(clone, newVacancyData);
            clone.$update().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});