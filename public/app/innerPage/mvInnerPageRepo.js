angular.module('app').factory('mvInnerPageRepo', function ($http, $q, mvInnerPage,mvIdentity) {
    return {

        createInnerPage: function (newInnerPageData) {

            var newInnerPage = new mvInnerPage(newInnerPageData);
            newInnerPage.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Industry");
            newInnerPage.$save().then(function () {
                console.log("Industry Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentInnerPage: function (newInnerPageData) {
            newInnerPageData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newInnerPageData);
            angular.extend(clone,newInnerPageData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});