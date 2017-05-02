angular.module('app').factory('mvjobQuestion', function ($resource) {
    var QuestionResource = $resource('/api/Questions/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    return QuestionResource;
});