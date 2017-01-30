angular.module('app', ['ngResource', 'ngRoute', 'pascalprecht.translate', 'ngCookies', 'ui.bootstrap', 'angular-loading-bar', 'autocomplete', 'ngAnimate', 'angular.filter'])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = 110;
    }]);

angular.module('app').config(function ($routeProvider) {
    var routRoleChecks = {
        admin: {
            auth: function (mvAuth) {
                console.log("Check Admin");
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
        }).when('/employers/:id', {
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
        }).when('/vacanciesByIndustries/:industryId', {
            templateUrl: '/partials/vacancy/vacancyByIndustryList.html',
            controller: 'mvVacancyByIndustryListCtrl'
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
            templateUrl: '/partials/languageSkill/languageSkill-list',
            controller: 'mvLanguageSkillListCtrl'
        }).when('/skills/:id', {
            templateUrl: '/partials/skill/skill-detail',
            controller: 'mvskilleDetailCtrl'
        }).when('/updateSkill/:id', {
            templateUrl: '/partials/skill/skill',
            controller: 'mvSkillCtrl'
        }).when('/addSkill', {
            templateUrl: '/partials/skill/skill',
            controller: 'mvSkillCtrl'
        }).when('/skills', {
            templateUrl: '/partials/skill/skill-list.html',
            controller: 'mvSkillListCtrl'
        }).when('/experiances/:id', {
            templateUrl: '/partials/experiance/experiance-detail',
            controller: 'mvExperianceDetailCtrl'
        }).when('/updateExperiance/:id', {
            templateUrl: '/partials/experiance/experiance',
            controller: 'mvExperianceCtrl'
        }).when('/addExperiance', {
            templateUrl: '/partials/experiance/experiance',
            controller: 'mvExperianceCtrl'
        }).when('/experiances', {
            templateUrl: '/partials/experiance/experiance-list.html',
            controller: 'mvExperianceListCtrl'
        }).when('/educationalLevels/:id', {
            templateUrl: '/partials/educationalLevels/educationalInformatio-detail',
            controller: 'mvEducationalLevelDetailCtrl'
        }).when('/updateEducationalLevel/:id', {
            templateUrl: '/partials/educationalLevel/educationalLevel',
            controller: 'mvEducationalLevelCtrl'
        }).when('/addEducationalLevel', {
            templateUrl: '/partials/educationalLevel/educationalLevel',
            controller: 'mvEducationalLevelCtrl'
        }).when('/educationalLevels', {
            templateUrl: '/partials/educationalLevel/educationalLevel-list.html',
            controller: 'mvEducationalLevelListCtrl'
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
        }).when('/cities/:id', {
            templateUrl: '/partials/city/city-detail',
            controller: 'mvCityDetailCtrl'
        }).when('/updateCity/:id', {
            templateUrl: '/partials/city/city',
            controller: 'mvCityCtrl'
        }).when('/addCity', {
            templateUrl: '/partials/city/city',
            controller: 'mvCityCtrl'
        }).when('/cities', {
            templateUrl: '/partials/city/city-list.html',
            controller: 'mvCityListCtrl'
        }).when('/areasNotConfirmed', {
            templateUrl: '/partials/areaNotConfirmed/area-not-confirmed-list.html',
            controller: 'mvAreaNotConfirmedListCtrl'
        }).when('/univirstiesNotConfirmed', {
            templateUrl: '/partials/univirstyNotConfirmed/univirsty-not-confirmed-list.html',
            controller: 'mvUnivirstyNotConfirmedListCtrl'
        }).when('/citiesNotConfirmed', {
            templateUrl: '/partials/cityNotConfirmed/city-not-confirmed-list.html',
            controller: 'mvCityNotConfirmedListCtrl'
        }).when('/univirsties/:id', {
            templateUrl: '/partials/univirsty/univirsty-detail',
            controller: 'mvUnivirstyDetailCtrl'
        }).when('/updateUnivirsty/:id', {
            templateUrl: '/partials/univirsty/univirsty',
            controller: 'mvUnivirstyCtrl'
        }).when('/addUnivirsty', {
            templateUrl: '/partials/univirsty/univirsty',
            controller: 'mvUnivirstyCtrl'
        }).when('/univirsties', {
            templateUrl: '/partials/univirsty/univirsty-list.html',
            controller: 'mvUnivirstyListCtrl'
        }).when('/faculties/:id', {
            templateUrl: '/partials/faculty/faculty-detail',
            controller: 'mvFacultyDetailCtrl'
        }).when('/updateFaculty/:id', {
            templateUrl: '/partials/faculty/faculty',
            controller: 'mvFacultyCtrl'
        }).when('/addFaculty', {
            templateUrl: '/partials/faculty/faculty',
            controller: 'mvFacultyCtrl'
        }).when('/faculties', {
            templateUrl: '/partials/faculty/faculty-list.html',
            controller: 'mvFacultyListCtrl'
        }).when('/specializations/:id', {
            templateUrl: '/partials/specialization/specialization-detail',
            controller: 'mvSpecializationDetailCtrl'
        }).when('/updateSpecialization/:id', {
            templateUrl: '/partials/specialization/specialization',
            controller: 'mvSpecializationCtrl'
        }).when('/addSpecialization', {
            templateUrl: '/partials/specialization/specialization',
            controller: 'mvSpecializationCtrl'
        }).when('/specializations', {
            templateUrl: '/partials/specialization/specialization-list.html',
            controller: 'mvSpecializationListCtrl'
        }).when('/areas/:id', {
            templateUrl: '/partials/area/area-detail',
            controller: 'mvAreaDetailCtrl'
        }).when('/updateArea/:id', {
            templateUrl: '/partials/area/area',
            controller: 'mvAreaCtrl'
        }).when('/addArea', {
            templateUrl: '/partials/area/area',
            controller: 'mvAreaCtrl'
        }).when('/areas', {
            templateUrl: '/partials/area/area-list.html',
            controller: 'mvAreaListCtrl'
        }).when('/applicants/:id', {
            templateUrl: '/partials/applicant/applicant-detail',
            controller: 'mvApplicantDetailCtrl'
        }).when('/updateApplicant/:id', {
            templateUrl: '/partials/applicant/applicant',
            controller: 'mvApplicantCtrl'
        }).when('/addApplicant', {
            templateUrl: '/partials/applicant/applicant',
            controller: 'mvApplicantCtrl'
        }).when('/applicants', {
            templateUrl: '/partials/applicant/applicant-list.html',
            controller: 'mvApplicantListCtrl'
        }).when('/vacancyApplicants/:vacancyId', {
            templateUrl: '/partials/applicant/applicant-list.html',
            controller: 'mvApplicantListCtrl'
        }).when('/vacanciesSearchResult', {
            templateUrl: '/partials/vacanciesSearchResult/vacanciesSearchResult.html',
            controller: 'mvVacanciesSearchResultCtrl', resolve: routRoleChecks.user
        });
});


angular.module('app').run(function ($rootScope, $location, $translate, mvLookup, mvStyle) {
    $rootScope.currentLang = $translate.use();
    $rootScope.bootstrapFile = mvStyle.getStyleFile();
    $rootScope.siteFile = mvStyle.getSiteStyleFile();
    $rootScope.sideBarFile = mvStyle.getSideBarStyleFile();
    $rootScope.customBootstrapStyleFile = mvStyle.getCustomBootstrapStyleFile();

    mvLookup.getAllLookUps();
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});