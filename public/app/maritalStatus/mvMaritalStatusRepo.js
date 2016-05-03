angular.module('app').factory('mvMaritalStatusRepo', function ($http, $q, mvMaritalStatus, mvIdentity) {
    return {
        createMaritalStatus: function (newMaritalStatusData) {
            var newMaritalStatus = new mvMaritalStatus(newMaritalStatusData);
            newMaritalStatus.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving MaritalStatus");
            newMaritalStatus.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentMaritalStatus: function (newMaritalStatusData) {
            newMaritalStatusData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newMaritalStatusData);
            angular.extend(clone, newMaritalStatusData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});