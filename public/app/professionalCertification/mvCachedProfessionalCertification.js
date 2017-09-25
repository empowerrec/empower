angular.module('app').factory('mvCachedProfessionalCertification', function (mvCourse) {
    var professionalCertificationList;
    return {
        query: function () {
            if (!professionalCertificationList) {
                professionalCertificationList = mvProfessionalCertification.query();
            }
            return professionalCertificationList;
        }
    };
});