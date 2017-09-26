angular.module('app').factory('mvTravelPreferenceRepo', function ($http, $q, mvTravelPreference,mvIdentity) {
    return {

        createTravelPreference: function (newTravelPreferenceData) {

            var newTravelPreference = new mvTravelPreference(newTravelPreferenceData);
            newTravelPreference.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving TravelPreference");
            newTravelPreference.$save().then(function () {
                console.log("TravelPreference Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentTravelPreference: function (newTravelPreferenceData) {
            newTravelPreferenceData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newTravelPreferenceData);
            angular.extend(clone,newTravelPreferenceData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});