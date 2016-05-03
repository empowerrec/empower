angular.module('app').factory('mvCompanyType', function ($resource) {
    var ComoanyTypeResource = $resource('/api/companyTypes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return ComoanyTypeResource;
});