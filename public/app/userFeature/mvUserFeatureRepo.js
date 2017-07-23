angular.module('app').factory('mvUserFeatureRepo', function ($http, $q, mvUserFeature,mvIdentity) {
    return {

        createUserFeature: function (newUserFeatureData) {

            var newUserFeature = new mvUserFeature(newUserFeatureData);
            newUserFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving UserFeature");
            newUserFeature.$save().then(function () {
                console.log("UserFeature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUserFeature: function (newUserFeatureData) {
            newUserFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newUserFeatureData);
            angular.extend(clone,newUserFeatureData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function (res) {

                dfd.resolve(res);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});