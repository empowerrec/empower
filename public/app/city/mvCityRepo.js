angular.module('app').factory('mvCityRepo', function ($http, $q, mvCity,mvIdentity) {
    return {

        createCity: function (newCityData) {
            var newCity = new mvCity(newCityData);
            newCity.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving City");
            newCity.$save().then(function (city) {
                console.log(city);
                console.log("City Saved");
                dfd.resolve(city);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createCityAfterCreatingUser: function (newCityData) {
            var newCity = new mvCity(newCityData);
            var dfd = $q.defer();
            console.log("Saving City");
            newCity.$save().then(function (employer) {
                console.log("City Saved");
                mvIdentity.currentCity = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCity: function (newCityData) {
            newCityData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCityData);
            angular.extend(clone,newCityData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});