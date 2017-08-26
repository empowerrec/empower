angular.module('app').factory('mvSubUserFeatureRepo', function ($http, $q, mvSubUserFeature, mvIdentity) {
    return {

        createSubUserFeature: function (newSubUserFeatureData) {

            var newSubUserFeature = new mvSubUserFeature(newSubUserFeatureData);
            newSubUserFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SubUserFeature");
            newSubUserFeature.$save().then(function () {
                console.log("SubUserFeature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSubUserFeature: function (newSubUserFeatureData) {
            newSubUserFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSubUserFeatureData);
            angular.extend(clone, newSubUserFeatureData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function (res) {

                dfd.resolve(res);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});