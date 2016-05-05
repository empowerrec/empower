angular.module('app').factory('mvGradeRepo', function ($http, $q, mvGrade, mvIdentity) {
    return {
        createGrade: function (newGradeData) {
            var newGrade = new mvGrade(newGradeData);
            newGrade.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Grade");
            newGrade.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentGrade: function (newGradeData) {
            newGradeData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newGradeData);
            angular.extend(clone, newGradeData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});