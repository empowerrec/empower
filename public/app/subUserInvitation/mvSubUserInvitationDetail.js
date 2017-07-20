angular.module('app').factory('mvSubUserInvitationDetail', function ($resource,mvIdentity) {
    var SubUserInvitationDetailResource = $resource('/api/subUserInvitationDetails/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return SubUserInvitationDetailResource;
});