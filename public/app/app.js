angular.module('app', ['ngResource', 'ngRoute','pascalprecht.translate','ngStorage']);

angular.module('app').config(function ($routeProvider) {
    var routRoleChecks = {
        admin: {
            auth: function (mvAuth) {
                console.log("Check Admin");
                debugger;
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
            templateUrl: '/partials/course/course-list.html',
            controller: 'mvCourseListCtrl'
        })
        .when('/courses/:id', {
            templateUrl: '/partials/course/course-detail.html',
            controller: 'mvCourseDetailCtrl'
        })
        .when('/employers/:id', {
            templateUrl: '/partials/employer/employer-detail.html',
            controller: 'mvEmployerDetailCtrl'
        })
        .when('/updateemployer/:id', {
            templateUrl: '/partials/employer/employer.html',
            controller: 'mvEmployerCtrl'
        })
        .when('/addemployer', {
            templateUrl: '/partials/employer/employer.html',
            controller: 'mvEmployerCtrl'
        })
        .when('/employers', {
            templateUrl: '/partials/employer/employer-list.html',
            controller: 'mvEmployerListCtrl'
        })
        .when('/jobSeekers', {
            templateUrl: '/partials/jobSeeker/jobSeeker-list.html',
            controller: 'mvJobSeekerListCtrl'
        })
        .when('/jobSeekers/:id', {
            templateUrl: '/partials/jobSeeker/jobSeeker-detail.html',
            controller: 'mvJobSeekerDetailCtrl'
        }).when('/updatejobSeeker/:id', {
            templateUrl: '/partials/jobSeeker/jobSeeker.html',
            controller: 'mvJobSeekerCtrl'
        }).when('/addJobSeeker', {
            templateUrl: '/partials/jobSeeker/jobSeeker.html',
            controller: 'mvJobSeekerCtrl'
        });
});


angular.module('app').run(function ($rootScope, $location , $translate) {
    $rootScope.currentLang = $translate.use();
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});