angular.module('app').factory('mvApplicantRepo', function ($http, $q, mvApplicant,mvIdentity) {
    return {

        createApplicant: function (newApplicantData) {

            var newApplicant = new mvApplicant(newApplicantData);
            newApplicant.CreatedBy = mvIdentity.currentUser;
            newApplicant.Deleted = false;
            newApplicant.JobSeeker = mvIdentity.currentJobSeeker._id;
            newApplicant.Employer = newApplicantData.Employer;
            newApplicant.EmployerId = newApplicantData.Employer;
            var dfd = $q.defer();
            console.log("Saving Applicant");
            newApplicant.$save().then(function () {
                console.log("Applicant Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentApplicant: function (newApplicantData) {
            newApplicantData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newApplicantData);
            angular.extend(clone,newApplicantData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});