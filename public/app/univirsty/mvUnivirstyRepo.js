angular.module('app').factory('mvUnivirstyRepo', function ($http, $q, mvUnivirsty,mvIdentity) {
    return {

        createUnivirsty: function (newUnivirstyData) {

            var newUnivirsty = new mvUnivirsty(newUnivirstyData);
            newUnivirsty.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Univirsty");
            newUnivirsty.$save().then(function (univirsty) {
                console.log("Univirsty Saved");
                dfd.resolve(univirsty);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUnivirsty: function (newUnivirstyData) {
            newUnivirstyData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newUnivirstyData);
            angular.extend(clone,newUnivirstyData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});