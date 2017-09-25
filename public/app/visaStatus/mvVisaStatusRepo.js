angular.module('app').factory('mvVisaStatusRepo', function ($http, $q, mvVisaStatus, mvIdentity) {
    return {
        createVisaStatus: function (newVisaStatusData) {
            var newVisaStatus = new mvVisaStatus(newVisaStatusData);
            newVisaStatus.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving VisaStatus");
            newVisaStatus.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentVisaStatus: function (newVisaStatusData) {
            newVisaStatusData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newVisaStatusData);
            angular.extend(clone, newVisaStatusData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});