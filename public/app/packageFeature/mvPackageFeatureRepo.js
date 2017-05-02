angular.module('app').factory('mvPackageFeatureRepo', function ($http, $q, mvPackageFeature,mvIdentity) {
    return {

        createPackageFeature: function (newPackageFeatureData) {

            var newPackageFeature = new mvPackageFeature(newPackageFeatureData);
            newPackageFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving PackageFeature");
            newPackageFeature.$save().then(function () {
                console.log("PackageFeature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentPackageFeature: function (newPackageFeatureData) {
            newPackageFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newPackageFeatureData);
            angular.extend(clone,newPackageFeatureData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});