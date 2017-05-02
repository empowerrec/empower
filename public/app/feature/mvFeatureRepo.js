angular.module('app').factory('mvFeatureRepo', function ($http, $q, mvFeature,mvIdentity) {
    return {

        createFeature: function (newFeatureData) {

            var newFeature = new mvFeature(newFeatureData);
            newFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Feature");
            newFeature.$save().then(function () {
                console.log("Feature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentFeature: function (newFeatureData) {
            newFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newFeatureData);
            angular.extend(clone,newFeatureData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});