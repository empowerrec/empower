angular.module('app').factory('mvSubUserInvitation', function ($resource,mvIdentity) {
    var SubUserInvitationResource = $resource('/api/subUserInvitations/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return SubUserInvitationResource;
});