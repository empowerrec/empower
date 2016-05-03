angular.module('app').factory('mvMilitaryStatus', function ($resource) {
    var militaryStatusResource = $resource('/api/militaryStatuses/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    
    return militaryStatusResource;
});