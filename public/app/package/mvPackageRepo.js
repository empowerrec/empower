angular.module('app').factory('mvPackageRepo', function ($http, $q, mvPackage,mvIdentity) {
    return {

        createPackage: function (newPackageData) {

            var newPackage = new mvPackage(newPackageData);
            newPackage.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Package");
            newPackage.$save().then(function () {
                console.log("Package Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentPackage: function (newPackageData) {
            newPackageData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newPackageData);
            angular.extend(clone,newPackageData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});