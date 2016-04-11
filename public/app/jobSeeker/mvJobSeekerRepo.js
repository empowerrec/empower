angular.module('app').factory('mvJobSeekerRepo', function ($http, $q, mvJobSeeker,mvIdentity) {
    return {

        createJobSeeker: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            newJobSeeker.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving JobSeeker");
            newJobSeeker.$save().then(function () {
                console.log("JobSeeker Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createJobSeekerAfterCreatingUser: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            var dfd = $q.defer();
            console.log("Saving JobSeeker");
            newJobSeeker.$save().then(function (jobSeeker) {
                console.log("JobSeeker Saved");
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
            angular.extend(clone,newJobSeekerData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});