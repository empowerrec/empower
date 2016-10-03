angular.module('app').factory('mvVacancy', function ($resource, mvIdentity) {
    var vacancyResource = $resource('/api/vacancies/:_id', { _id: '@id' }, {
        
        update: { method: 'PUT', isArray: false },
        getForDetail: {
            url: 'api/vacancies/getForDetail/:_id', method: 'GET', params: { _id: '@id' }
        },
        vacanciesSearchResult: {
            url: 'api/vacanciesSearchResult/', method: 'GET'
        }
  
    });
    return vacancyResource;
});