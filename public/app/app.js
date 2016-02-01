angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function(mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            },
            user: {auth: function(mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute()
            }}
        }
    };

    //$locationProvider.html5Mode(true);
    $routeProvider
    .when('/', { templateUrl: '/app/main/main.html', controller: 'mvMainCtrl' })
    .when('/admin/users', {
        templateUrl: '/app/admin/user-list.html',
        controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
    }).when('/signup', {
        templateUrl: '/app/account/signup.html',
        controller: 'mvSignupCtrl'
    }).when('/profile', { templateUrl: 'app/account/profile',
            controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
        });

});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
})
