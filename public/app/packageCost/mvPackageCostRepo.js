angular.module('app').factory('mvPackageCostRepo', function ($http, $q, mvPackageCost,mvIdentity) {
    return {

        createPackageCost: function (newPackageCostData) {

            var newPackageCost = new mvPackageCost(newPackageCostData);
            newPackageCost.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving PackageCost");
            newPackageCost.$save().then(function () {
                console.log("PackageCost Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentPackageCost: function (newPackageCostData) {
            newPackageCostData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newPackageCostData);
            angular.extend(clone,newPackageCostData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});