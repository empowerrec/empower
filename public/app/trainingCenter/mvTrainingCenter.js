angular.module('app').factory('mvTrainingCenter', function ($resource) {
    var TrainingCenterResource = $resource('/api/TrainingCenters/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return TrainingCenterResource;
});