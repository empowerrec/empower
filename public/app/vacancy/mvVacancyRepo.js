angular.module('app').factory('mvVacancyRepo', function ($http, $q, mvVacancy,mvIdentity) {
    return {

        createVacancy: function (newVacancyData) {
            var newVacancy = new mvVacancy(newVacancyData);
            newVacancy.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Vacancy");
            newVacancy.$save().then(function () {
                console.log("Vacancy Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createEmployerAfterCreatingUser: function (newVacancyData) {
            var newVacancy = new mvVacancy(newVacancyData);
            var dfd = $q.defer();
            console.log("Saving Vacancy");
            newVacancy.$save().then(function () {
                console.log("Vacancy Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentVacancy: function (newVacancyData) {
            newVacancyData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newVacancyData);
            angular.extend(clone,newVacancyData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});