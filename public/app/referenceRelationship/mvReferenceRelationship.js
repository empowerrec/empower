angular.module('app').factory('mvReferenceRelationship', function ($resource) {
    var referenceRelationshipResource = $resource('/api/referenceRelationships/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return referenceRelationshipResource;
});