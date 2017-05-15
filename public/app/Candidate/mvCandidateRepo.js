angular.module('app').factory('mvCandidateRepo', function ($http, $q, mvCandidate,mvIdentity) {
    return {

        createCandidate: function (newCandidateData) {

            var newCandidate = new mvCandidate(newCandidateData);
            newCandidate.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Candidate");
            newCandidate.$save().then(function () {
                console.log("Candidate Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCandidate: function (newCandidateData) {
            newCandidateData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCandidateData);
            angular.extend(clone,newCandidateData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});