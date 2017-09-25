angular.module('app').factory('mvInterestRepo', function ($http, $q, mvInterest,mvIdentity) {
    return {

        createInterest: function (newInterestData) {
            var newInterest = new mvInterest(newInterestData);
            newInterest.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Interest");
            newInterest.$save().then(function () {
                console.log("Interest Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createInterestAfterCreatingUser: function (newInterestData) {
            var newInterest = new mvInterest(newInterestData);
            var dfd = $q.defer();
            console.log("Saving Interest");
            newInterest.$save().then(function (interest) {
                console.log("Interest Saved");
                mvIdentity.currentInterest = interest;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentInterest: function (newInterestData) {
            newInterestData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newInterestData);
            angular.extend(clone,newInterestData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});