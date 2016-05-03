angular.module('app').factory('mvMilitaryStatusRepo', function ($http, $q, mvMilitaryStatus, mvIdentity) {
    return {
        createMilitaryStatus: function (newMilitaryStatusData) {
            var newMilitaryStatus = new mvMilitaryStatus(newMilitaryStatusData);
            newMilitaryStatus.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving MilitaryStatus");
            newMilitaryStatus.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentMilitaryStatus: function (newMilitaryStatusData) {
            newMilitaryStatusData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newMilitaryStatusData);
            angular.extend(clone, newMilitaryStatusData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});