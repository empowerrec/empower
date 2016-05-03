angular.module('app').factory('mvGender', function ($resource) {
    var genderResource = $resource('/api/genders/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return genderResource;
});