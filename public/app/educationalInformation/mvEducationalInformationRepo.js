angular.module('app').factory('mvEducationalInformationRepo', function ($http, $q, mvEducationalInformation,mvIdentity) {
    return {

        createEducationalInformation: function (newEducationalInformationData) {
            var newEducationalInformation = new mvEducationalInformation(newEducationalInformationData);
            newEducationalInformation.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving EducationalInformation");
            newEducationalInformation.$save().then(function () {
                console.log("EducationalInformation Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
        ,updateCurrentEducationalInformation: function (newEducationalInformationData) {
            newEducationalInformationData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newEducationalInformationData);
            angular.extend(clone,newEducationalInformationData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});