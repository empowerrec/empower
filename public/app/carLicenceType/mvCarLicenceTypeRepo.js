angular.module('app').factory('mvCarLicenceTypeRepo', function ($http, $q, mvCarLicenceType, mvIdentity) {
    return {
        createCarLicenceType: function (newCarLicenceTypeData) {
            var newCarLicenceType = new mvCarLicenceType(newCarLicenceTypeData);
            newCarLicenceType.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving CarLicenceType");
            newCarLicenceType.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentCarLicenceType: function (newCarLicenceTypeData) {
            newCarLicenceTypeData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newCarLicenceTypeData);
            angular.extend(clone, newCarLicenceTypeData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});