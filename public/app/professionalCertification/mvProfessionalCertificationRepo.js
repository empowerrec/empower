angular.module('app').factory('mvProfessionalCertificationRepo', function ($http, $q, mvProfessionalCertification,mvIdentity) {
    return {

        createProfessionalCertification: function (newProfessionalCertificationData) {
            var newProfessionalCertification = new mvProfessionalCertification(newProfessionalCertificationData);
            newProfessionalCertification.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving ProfessionalCertification");
            newProfessionalCertification.$save().then(function () {
                console.log("ProfessionalCertification Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createProfessionalCertificationAfterCreatingUser: function (newProfessionalCertificationData) {
            var newProfessionalCertification = new mvProfessionalCertification(newProfessionalCertificationData);
            var dfd = $q.defer();
            console.log("Saving ProfessionalCertification");
            newProfessionalCertification.$save().then(function (professionalCertification) {
                console.log("ProfessionalCertification Saved");
                mvIdentity.currentProfessionalCertification = professionalCertification;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentProfessionalCertification: function (newProfessionalCertificationData) {
            newProfessionalCertificationData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newProfessionalCertificationData);
            angular.extend(clone,newProfessionalCertificationData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});