angular.module('app').factory('mvIndustryRepo', function ($http, $q, mvIndustry,mvIdentity) {
    return {

        createIndustry: function (newIndustryData) {

            var newIndustry = new mvIndustry(newIndustryData);
            newIndustry.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Industry");
            newIndustry.$save().then(function () {
                console.log("Industry Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentIndustry: function (newIndustryData) {
            newIndustryData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newIndustryData);
            angular.extend(clone,newIndustryData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});