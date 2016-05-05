angular.module('app').factory('mvCachedTrainingCenter', function (mvTrainingCenter) {
    var trainingCenterList;
    return {
        query: function () {
            if (!trainingCenterList) {
                trainingCenterList = mvTrainingCenter.query();
            }
            return trainingCenterList;
        }
    };
});