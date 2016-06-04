angular.module('app').factory('mvCareerLevelRepo', function ($http, $q, mvCareerLevel, mvIdentity) {
    return {
        createCareerLevel: function (newCareerLevelData) {
            var newCareerLevel = new mvCareerLevel(newCareerLevelData);
            newCareerLevel.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving CareerLevel");
            newCareerLevel.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentCareerLevel: function (newCareerLevelData) {
            newCareerLevelData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newCareerLevelData);
            angular.extend(clone, newCareerLevelData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});