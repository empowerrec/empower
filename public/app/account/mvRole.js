angular.module('app').factory('mvRole', function ($http, $q,$resource) {
    var RoleResource = $resource('/api/roles/:id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return {
      RoleResource:RoleResource,
      returnRoleId:function (role) {
        var dfd = $q.defer();
        $http({
          method: 'GET',
          url: '/api/roles/:roleName',
          params: {roleName: role}
        }).then(function (response) {
                if (response.data.success) {
                    var role = new mvRole();
                    angular.extend(role, response.data.role);
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
      }
    };
});
