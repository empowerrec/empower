angular.module('app').factory('mvReligionRepo', function ($http, $q, mvReligion, mvIdentity) {
    return {
        createReligion: function (newReligionData) {
            var newReligion = new mvReligion(newReligionData);
            newReligion.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Religion");
            newReligion.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentReligion: function (newReligionData) {
            newReligionData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newReligionData);
            angular.extend(clone, newReligionData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});