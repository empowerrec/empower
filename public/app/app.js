angular.module('app', ['ngResource', 'ngRoute', 'pascalprecht.translate', 'ngStorage', 'ui.bootstrap']);

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
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })
        .when('/admin/users', {
        templateUrl: '/partials/admin/users/user-list',
        controller: 'mvUserListCtrl', resolve: routRoleChecks.admin
    })
        .when('/admin/employers', {
        templateUrl: '/partials/admin/employers/employer-list',
        controller: 'mvEmployerListCtrl', resolve: routRoleChecks.admin
    })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl' })
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

    }).when('/jobSeekers', {
        templateUrl: '/partials/jobSeeker/jobSeeker-list.html',
        controller: 'mvJobSeekerListCtrl'
    }).when('/jobSeekers/:id', {
        templateUrl: '/partials/jobSeeker/jobSeeker-detail.html',
        controller: 'mvJobSeekerDetailCtrl'
    }).when('/updateJobSeeker/:id', {
        templateUrl: '/partials/jobSeeker/jobSeeker.html',
        controller: 'mvJobSeekerCtrl'
    }).when('/addJobSeeker', {
        templateUrl: '/partials/jobSeeker/jobSeeker.html',
        controller: 'mvJobSeekerCtrl'
    })
        .when('/vacancies/:id', {
        templateUrl: '/partials/vacancy/vacancy-detail',
        controller: 'mvVacancyDetailCtrl'
    }).when('/updatevacancy/:id', {
        templateUrl: '/partials/vacancy/vacancy',
        controller: 'mvVacancyCtrl'
    }).when('/addvacancy', {
        templateUrl: '/partials/vacancy/vacancy',
        controller: 'mvVacancyCtrl'
    }).when('/vacancies', {
        templateUrl: '/partials/vacancy/vacancy-list.html',
        controller: 'mvVacancyListCtrl'
    }).when('/industries/:id', {
        templateUrl: '/partials/industry/industry-detail',
        controller: 'mvIndustryDetailCtrl'
    }).when('/updateindustry/:id', {
        templateUrl: '/partials/industry/industry',
        controller: 'mvIndustryCtrl'
    }).when('/addindustry', {
        templateUrl: '/partials/industry/industry',
        controller: 'mvIndustryCtrl'
    }).when('/industries', {
        templateUrl: '/partials/industry/industry-list.html',
        controller: 'mvIndustryListCtrl'
    }).when('/innerPages/:id', {
        templateUrl: '/partials/innerPage/innerPage-detail',
        controller: 'mvInnerPageDetailCtrl'
    }).when('/updateinnerPage/:id', {
        templateUrl: '/partials/innerPage/innerPage',
        controller: 'mvInnerPageCtrl'
    }).when('/addinnerPage', {
        templateUrl: '/partials/innerPage/innerPage',
        controller: 'mvInnerPageCtrl'
    }).when('/innerPages', {
        templateUrl: '/partials/innerPage/innerPage-list.html',
        controller: 'mvInnerPageListCtrl'
    }).when('/categories/:id', {
        templateUrl: '/partials/category/category-detail',
        controller: 'mvCategoryDetailCtrl'
    }).when('/updateCategory/:id', {
        templateUrl: '/partials/category/category',
        controller: 'mvCategoryCtrl'
    }).when('/addCategory', {
        templateUrl: '/partials/category/category',
        controller: 'mvCategoryCtrl'
    }).when('/categories', {
        templateUrl: '/partials/category/category-list.html',
        controller: 'mvCategoryListCtrl'
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