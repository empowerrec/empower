angular.module('app').factory('mvCategory', function ($resource) {
    var categoryResource = $resource('/api/categories/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return categoryResource;
});