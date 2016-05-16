angular.module('app').factory('mvAreaRepo', function ($http, $q, mvArea,mvIdentity) {
    return {

        createArea: function (newAreaData) {
            var newArea = new mvArea(newAreaData);
            newArea.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Area");
            newArea.$save().then(function (area) {
                console.log(area);
                console.log("Area Saved");
                dfd.resolve(area);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createAreaAfterCreatingUser: function (newAreaData) {
            var newArea = new mvArea(newAreaData);
            var dfd = $q.defer();
            console.log("Saving Area");
            newArea.$save().then(function (area) {
                console.log("Area Saved");
                mvIdentity.currentArea = area;
                dfd.resolve(area);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentArea: function (newAreaData) {
            newAreaData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newAreaData);
            angular.extend(clone,newAreaData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});