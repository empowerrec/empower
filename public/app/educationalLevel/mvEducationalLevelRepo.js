angular.module('app').factory('mvEducationalLevelRepo', function ($http, $q, mvEducationalLevel, mvIdentity) {
    return {
        createEducationalLevel: function (newEducationalLevelData) {
            var newEducationalLevel = new mvEducationalLevel(newEducationalLevelData);
            newEducationalLevel.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving EducationalLevel");
            newEducationalLevel.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentEducationalLevel: function (newEducationalLevelData) {
            newEducationalLevelData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newEducationalLevelData);
            angular.extend(clone, newEducationalLevelData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});