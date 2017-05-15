angular.module('app').factory('mvCandidate', function ($resource,mvIdentity) {
    var CandidateResource = $resource('/api/candidates/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return CandidateResource;
});