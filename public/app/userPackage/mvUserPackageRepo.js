angular.module('app').factory('mvUserPackageRepo', function ($http, $q, mvUserPackage,mvIdentity) {
    return {

        createUserPackage: function (newUserPackageData) {

            var newUserPackage = new mvUserPackage(newUserPackageData);
            newUserPackage.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving UserPackage");
            newUserPackage.$save().then(function () {
                console.log("UserPackage Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUserPackage: function (newUserPackageData) {
            newUserPackageData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newUserPackageData);
            angular.extend(clone,newUserPackageData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});