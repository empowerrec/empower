angular.module('app').factory('mvCountryRepo', function ($http, $q, mvCountry,mvIdentity) {
    return {

        createCountry: function (newCountryData) {
            var newCountry = new mvCountry(newCountryData);
            newCountry.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Country");
            newCountry.$save().then(function (country) {
                console.log(country);
                console.log("Country Saved");
                dfd.resolve(country);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createCountryAfterCreatingUser: function (newCountryData) {
            var newCountry = new mvCountry(newCountryData);
            var dfd = $q.defer();
            console.log("Saving Country");
            newCountry.$save().then(function (employer) {
                console.log("Country Saved");
                mvIdentity.currentCountry = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCountry: function (newCountryData) {
            newCountryData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCountryData);
            angular.extend(clone,newCountryData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});