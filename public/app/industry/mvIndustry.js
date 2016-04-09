angular.module('app').factory('mvIndustry', function ($resource,mvIdentity) {
    var IndustryResource = $resource('/api/industries/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return IndustryResource;
});