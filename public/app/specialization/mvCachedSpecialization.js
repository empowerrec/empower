angular.module('app').factory('mvCachedSpecialization', function (mvSpecialization) {
    var specializationList;
    return {
        query: function () {
            if (!specializationList) {
                specializationList = mvSpecialization.query();
            }
            return specializationList;
        }
    };
});