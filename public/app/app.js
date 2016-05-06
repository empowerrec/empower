angular.module('app', ['ngResource', 'ngRoute', 'pascalprecht.translate', 'ngCookies', 'ui.bootstrap', 'autocomplete']);

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
    }).when('/admin/employers', {
        templateUrl: '/partials/admin/employers/employer-list',
        controller: 'mvEmployerListCtrl', resolve: routRoleChecks.admin
    }).when('/signup', {
        templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl'
    }).when('/profile', {
        templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl', resolve: routRoleChecks.user
    }).when('/forget', {
        templateUrl: '/partials/account/forget-password', controller: 'mvForgetPasswordCtrl'
    }).when('/reset/:token', {
        templateUrl: '/partials/account/reset-password', controller: 'mvResetPasswordCtrl'
    }).when('/courses/:id', {
        templateUrl: '/partials/course/course-detail',
        controller: 'mvCourseDetailCtrl'
    }).when('/updateCourse/:id', {
        templateUrl: '/partials/course/course',
        controller: 'mvCourseCtrl'
    }).when('/addCourse', {
        templateUrl: '/partials/course/course',
        controller: 'mvCourseCtrl'
    }).when('/courses', {
        templateUrl: '/partials/course/course-list.html',
        controller: 'mvCourseListCtrl'
    })
        
    .when('/employers/:id', {
        templateUrl: '/partials/employer/employer-detail.html',
        controller: 'mvEmployerDetailCtrl'
    }).when('/updateemployer/:id', {
        templateUrl: '/partials/employer/employer.html',
        controller: 'mvEmployerCtrl'
    }).when('/addemployer', {
        templateUrl: '/partials/employer/employer.html',
        controller: 'mvEmployerCtrl'
    }).when('/employers', {
        templateUrl: '/partials/employer/employer-list.html',
        controller: 'mvEmployerListCtrl'
    }).when('/jobSeekers', {
        templateUrl: '/partials/jobSeeker/jobSeeker-list.html',
        controller: 'mvJobSeekerListCtrl'
    }).when('/jobSeekers/:id', {
        templateUrl: '/partials/jobSeeker/jobSeeker-detail.html',
        controller: 'mvJobSeekerDetailCtrl'
    }).when('/updateJobSeeker/:tab/:id', {
        templateUrl: '/partials/jobSeeker/jobSeeker.html'
    }).when('/addJobSeeker', {
        templateUrl: '/partials/jobSeeker/jobSeeker.html'
    }).when('/jobSeekerMain', {
        templateUrl: '/partials/jobSeeker/jobSeekerMain.html'
    }).when('/vacancies/:id', {
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
    }).when('/jobTypes/:id', {
        templateUrl: '/partials/jobType/jobType-detail',
        controller: 'mvJobTypeDetailCtrl'
    }).when('/updatejobType/:id', {
        templateUrl: '/partials/jobType/jobType',
        controller: 'mvJobTypeCtrl'
    }).when('/addjobType', {
        templateUrl: '/partials/jobType/jobType',
        controller: 'mvJobTypeCtrl'
    }).when('/jobTypes', {
        templateUrl: '/partials/jobType/jobType-list.html',
        controller: 'mvJobTypeListCtrl'
    }).when('/jobRoles/:id', {
        templateUrl: '/partials/jobRole/jobRole-detail',
        controller: 'mvJobRoleDetailCtrl'
    }).when('/updatejobRole/:id', {
        templateUrl: '/partials/jobRole/jobRole',
        controller: 'mvJobRoleCtrl'
    }).when('/addjobRole', {
        templateUrl: '/partials/jobRole/jobRole',
        controller: 'mvJobRoleCtrl'
    }).when('/jobRoles', {
        templateUrl: '/partials/jobRole/jobRole-list.html',
        controller: 'mvJobRoleListCtrl'
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
        
    }).when('/addresses/:id', {
        templateUrl: '/partials/address/address-detail',
        controller: 'mvAddressDetailCtrl'
    }).when('/updateAddress/:id', {
        templateUrl: '/partials/address/address',
        controller: 'mvAddressCtrl'
    }).when('/addAddress', {
        templateUrl: '/partials/address/address',
        controller: 'mvAddressCtrl'
    }).when('/addresses', {
        templateUrl: '/partials/address/address-list.html',
        controller: 'mvAddressListCtrl'        

    }).when('/languageSkills/:id', {
        templateUrl: '/partials/languageSkill/languageSkill-detail',
        controller: 'mvLanguageSkillDetailCtrl'
    }).when('/updateLanguageSkill/:id', {
        templateUrl: '/partials/languageSkill/languageSkill',
        controller: 'mvLanguageSkillCtrl'
    }).when('/addLanguageSkill', {
        templateUrl: '/partials/languageSkill/languageSkill',
        controller: 'mvLanguageSkillCtrl'
    }).when('/languageSkills', {
        templateUrl: '/partials/languageSkill/languageSkill-list.html',
        controller: 'mvLanguageSkillListCtrl'  

    }).when('/experiances/:id', {
        templateUrl: '/partials/experiance/experiance-detail',
        controller: 'mvExperianceDetailCtrl'
    }).when('/updateExperiance/:id', {
        templateUrl: '/partials/experiance/experiance',
        controller: 'mvExperiancerCtrl'
    }).when('/addExperiance', {
        templateUrl: '/partials/experiance/experiance',
        controller: 'mvExperiancerCtrl'
    }).when('/experiances', {
        templateUrl: '/partials/experiance/experiance-list.html',
        controller: 'mvExperianceListCtrl'
    }).when('/educationalInformations/:id', {
        templateUrl: '/partials/educationalInformations/educationalInformatio-detail',
        controller: 'mvEducationalInformationDetailCtrl'
    }).when('/updateEducationalInformation/:id', {
        templateUrl: '/partials/educationalInformation/educationalInformation',
        controller: 'mvEducationalInformationCtrl'
    }).when('/addEducationalInformation', {
        templateUrl: '/partials/educationalInformation/educationalInformation',
        controller: 'mvEducationalInformationCtrl'
    }).when('/educationalInformations', {
        templateUrl: '/partials/educationalInformation/educationalInformation-list.html',
        controller: 'mvEducationalInformationListCtrl'
    });
    });


angular.module('app').run(function ($rootScope, $location , $translate, mvLookup , mvStyle) {
    $rootScope.currentLang = $translate.use();
    $rootScope.bootstrapFile = mvStyle.getStyleFile();
    $rootScope.siteFile = mvStyle.getSiteStyleFile();
    $rootScope.sideBarFile = mvStyle.getSideBarStyleFile();
    mvLookup.getAllLookUps();
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});