angular.module('app').factory('mvEducationTypeRepo', function ($http, $q, mvEducationType, mvIdentity) {
    return {
        createEducationType: function (newEducationTypeData) {
            var newEducationType = new mvEducationType(newEducationTypeData);
            newEducationType.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving EducationType");
            newEducationType.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentEducationType: function (newEducationTypeData) {
            newEducationTypeData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newEducationTypeData);
            angular.extend(clone, newEducationTypeData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});