angular.module('app').factory('mvNationalityRepo', function ($http, $q, mvNationality, mvIdentity) {
    return {
        createNationality: function (newNationalityData) {
            var newNationality = new mvNationality(newNationalityData);
            newNationality.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Nationality");
            newNationality.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentNationality: function (newNationalityData) {
            newNationalityData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newNationalityData);
            angular.extend(clone, newNationalityData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});