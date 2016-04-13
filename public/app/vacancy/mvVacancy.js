angular.module('app').factory('mvVacancy', function ($resource, mvIdentity) {
    var VacancyResource = $resource('/api/vacancies/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    //console.log('$resourceVac', VacancyResource);
    return VacancyResource;
});