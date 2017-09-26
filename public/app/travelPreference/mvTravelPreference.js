angular.module('app').factory('mvTravelPreference', function ($resource) {
    var TravelPreferenceResource = $resource('/api/TravelPreferences/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return TravelPreferenceResource;
});