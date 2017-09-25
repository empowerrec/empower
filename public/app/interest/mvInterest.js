angular.module('app').factory('mvInterest', function ($resource) {
    var InterestResource = $resource('/api/interests/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return InterestResource;
});