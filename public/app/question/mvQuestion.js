angular.module('app').factory('mvQuestion', function ($resource) {
    var QuestionResource = $resource('/api/Questions/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    return QuestionResource;
});