angular.module('app').factory('mvJobSeekerRepo', function ($http, $q, mvJobSeeker, mvIdentity) {
    return {
        
        createJobSeeker: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            newJobSeeker.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            newJobSeeker.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        createJobSeekerAfterCreatingUser: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            var dfd = $q.defer();
            newJobSeeker.$save().then(function (jobSeeker) {
                mvIdentity.currentJobSeeker = jobSeeker;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        updateCurrentJobSeeker: function (newJobSeekerData) {
            newJobSeekerData.ModifiedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            var clone = angular.copy(newJobSeekerData);
            angular.extend(clone, newJobSeekerData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});