angular.module('app').factory('mvSpecializationRepo', function ($http, $q, mvSpecialization, mvIdentity) {
    return {
        createSpecialization: function (newSpecializationData) {
            var newSpecialization = new mvSpecialization(newSpecializationData);
            newSpecialization.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Specialization");
            newSpecialization.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentSpecialization: function (newSpecializationData) {
            newSpecializationData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newSpecializationData);
            angular.extend(clone, newSpecializationData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});