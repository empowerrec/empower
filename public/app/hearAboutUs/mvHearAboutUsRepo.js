angular.module('app').factory('mvHearAboutUsRepo', function ($http, $q, mvHearAboutUs, mvIdentity) {
    return {
        createHearAboutUs: function (newHearAboutUsData) {
            var newHearAboutUs = new mvHearAboutUs(newHearAboutUsData);
            newHearAboutUs.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving HearAboutUs");
            newHearAboutUs.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentHearAboutUs: function (newHearAboutUsData) {
            newHearAboutUsData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newHearAboutUsData);
            angular.extend(clone, newHearAboutUsData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});