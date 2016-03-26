angular.module('app').factory('mvVacancy', function ($resource) {
    var VacancyResource = $resource('/api/Vacancies/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });

    return VacancyResource;
});