angular.module('app').factory('mvMembershipAndAward', function ($resource) {
    var MembershipAndAwardResource = $resource('/api/membershipAndAwards/:_id', { _id: '@id' },
        {
            update: { method: 'PUT', isArray: false }
        });

    return MembershipAndAwardResource;
});