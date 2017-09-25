angular.module('app').factory('mvGenderRepo', function ($http, $q, mvGender, mvIdentity) {
    return {
        createGender: function (newGenderData) {
            var newGender = new mvGender(newGenderData);
            newGender.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Gender");
            newGender.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentGender: function (newGenderData) {
            newGenderData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newGenderData);
            angular.extend(clone, newGenderData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});