angular.module('app', ['ngResource', 'ngRoute','pascalprecht.translate']);

angular.module('app').config(function ($routeProvider) {
    var routRoleChecks = {
        admin: {
            auth: function (mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('A');
            }
        },
        user: {
            auth: function (mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute();
            }
        }
    };

    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', {
            templateUrl: '/partials/admin/users/user-list',
            controller: 'mvUserListCtrl', resolve: routRoleChecks.admin
        })
        .when('/admin/employers', {
            templateUrl: '/partials/admin/employers/employer-list',
            controller: 'mvEmployerListCtrl', resolve: routRoleChecks.admin
        })
        .when('/signup', {templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl'})
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl', resolve: routRoleChecks.user
        })
        .when('/courses', {
            templateUrl: '/partials/course/course-list',
            controller: 'mvCourseListCtrl'
        })
        .when('/courses/:id', {
            templateUrl: '/partials/course/course-detail',
            controller: 'mvCourseDetailCtrl'
        })
        .when('/employers/:id', {
            templateUrl: '/partials/employer/employer-detail',
            controller: 'mvEmployerDetailCtrl'
        }).when('/updateemployer/:id', {
            templateUrl: '/partials/employer/employer',
            controller: 'mvEmployerCtrl'
        }).when('/employers', {
            templateUrl: '/partials/employer/employer-list',
            controller: 'mvEmployerListCtrl', resolve: routRoleChecks.admin
        });
});


angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});