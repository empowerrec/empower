angular.module('app', ['ngResource', 'ngRoute', 'pascalprecht.translate', 'ngCookies', 'ui.bootstrap', 'angular-loading-bar', 'autocomplete', 'ngAnimate', 'angular.filter', 'ngFileUpload'])
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

        }).when('/signupSupUser/:id', {
            templateUrl: '/partials/subUserInvitation/front-signupSupUser', controller: 'mvFrontSubUserSignupCtrl'

        }).when('/subUser-list', {
            templateUrl: '/partials/subUserInvitation/subUser-list', controller: 'mvSubUserListCtrl'

        }).when('/DeclineSupUser/:id', {
            templateUrl: '/partials/subUserInvitation/DeclineSubUserInvitation', controller: 'mvDeclineSupUserCtrl'

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
        }).when('/applicants/arrangeInterview/:id', {
            templateUrl: '/partials/applicant/arrangeInterview.html',
            controller: 'mvArrangeInterviewCtrl'
        }).when('/vacanciesSearchResult', {
            templateUrl: '/partials/vacanciesSearchResult/vacanciesSearchResult.html',
            controller: 'mvVacanciesSearchResultCtrl'
        }).when('/packages/:id', {
            templateUrl: '/partials/package/package-detail',
            controller: 'mvPackageDetailCtrl'
        }).when('/updatePackage/:id', {
            templateUrl: '/partials/package/package',
            controller: 'mvPackageCtrl'
        }).when('/addPackage', {
            templateUrl: '/partials/package/package',
            controller: 'mvPackageCtrl'
        }).when('/packages', {
            templateUrl: '/partials/package/package-list.html',
            controller: 'mvPackageListCtrl'
        }).when('/features/:id', {
            templateUrl: '/partials/feature/feature-detail',
            controller: 'mvFeatureDetailCtrl'
        }).when('/updateFeature/:id', {
            templateUrl: '/partials/feature/feature',
            controller: 'mvFeatureCtrl'
        }).when('/addFeature', {
            templateUrl: '/partials/feature/feature',
            controller: 'mvFeatureCtrl'
        }).when('/features', {
            templateUrl: '/partials/feature/feature-list.html',
            controller: 'mvFeatureListCtrl'
        }).when('/candidates/:vId/:id', {
            templateUrl: '/partials/candidate/candidate-detail',
            controller: 'mvCandidateDetailCtrl'
        }).when('/updateCandidate/:id', {
            templateUrl: '/partials/candidate/candidate',
            controller: 'mvCandidateCtrl'
        }).when('/addCandidate/:vId', {
            templateUrl: '/partials/candidate/candidate',
            controller: 'mvCandidateCtrl'
        }).when('/candidates/:vId', {
            templateUrl: '/partials/candidate/candidate-list.html',
            controller: 'mvCandidateListCtrl'
        }).when('/packageFeatures/:pId/:id', {
            templateUrl: '/partials/packageFeature/packageFeature-detail',
            controller: 'mvPackageFeatureDetailCtrl'
        }).when('/updatePackageFeature/:id', {
            templateUrl: '/partials/packageFeature/packageFeature',
            controller: 'mvPackageFeatureCtrl'
        }).when('/addPackageFeature/:pId', {
            templateUrl: '/partials/packageFeature/packageFeature',
            controller: 'mvPackageFeatureCtrl'
        }).when('/packageFeatures/:pId', {
            templateUrl: '/partials/packageFeature/packageFeature-list.html',
            controller: 'mvPackageFeatureListCtrl'
        })


        .when('/packageCosts/:pId/:id', {
            templateUrl: '/partials/packageCost/packageCost-detail',
            controller: 'mvPackageCostDetailCtrl'
        }).when('/updatePackageCost/:pId/:id', {
            templateUrl: '/partials/packageCost/packageCost',
            controller: 'mvPackageCostCtrl'
        }).when('/addPackageCost/:pId', {
            templateUrl: '/partials/packageCost/packageCost',
            controller: 'mvPackageCostCtrl'
        }).when('/packageCosts/:pId', {
            templateUrl: '/partials/packageCost/packageCost-list.html',
            controller: 'mvPackageCostListCtrl'
        }).when('/userPackages/:uId/:id', {
            templateUrl: '/partials/userPackage/userPackage-detail',
            controller: 'mvUserPackageDetailCtrl'
        }).when('/updateUserPackage/:uId/:id', {
            templateUrl: '/partials/userPackage/userPackage',
            controller: 'mvUserPackageCtrl'
        }).when('/addUserPackage/:uId', {
            templateUrl: '/partials/userPackage/userPackage',
            controller: 'mvUserPackageCtrl'
        }).when('/userPackages/:uId', {
            templateUrl: '/partials/userPackage/userPackage-list.html',
            controller: 'mvUserPackageListCtrl'
        })



        .when('/userFeatures/:uId/:id', {
            templateUrl: '/partials/userFeature/userFeature-detail',
            controller: 'mvUserFeatureDetailCtrl'
        }).when('/updateUserFeature/:uId/:id', {
            templateUrl: '/partials/userFeature/userFeature',
            controller: 'mvUserFeatureCtrl'
        }).when('/addUserFeature/:uId', {
            templateUrl: '/partials/userFeature/userFeature',
            controller: 'mvUserFeatureCtrl'
        }).when('/userFeatures/:uId', {
            templateUrl: '/partials/userFeature/userFeature-list.html',
            controller: 'mvUserFeatureListCtrl'
        })

        .when('/subUserFeatures/:uId/:id', {
            templateUrl: '/partials/subUserFeature/subUserFeature-detail',
            controller: 'mvSubUserFeatureDetailCtrl'
        }).when('/updateSubUserFeature/:uId/:id', {
            templateUrl: '/partials/subUserFeature/subUserFeature',
            controller: 'mvSubUserFeatureCtrl'
        }).when('/addSubUserFeature/:uId', {
            templateUrl: '/partials/subUserFeature/subUserFeature',
            controller: 'mvSubUserFeatureCtrl'
        }).when('/subUserFeatures/:uId', {
            templateUrl: '/partials/subUserFeature/subUserFeature-list.html',
            controller: 'mvSubUserFeatureListCtrl'
        })

        .when('/subUserInvitationDetails/:id', {
    templateUrl: '/partials/subUserInvitationDetail/subUserInvitationDetail-detail',
    controller: 'mvSubUserInvitationDetailDetailCtrl'
}).when('/updatesubUserInvitationDetail/:id', {
    templateUrl: '/partials/subUserInvitationDetail/subUserInvitationDetail',
    controller: 'mvSubUserInvitationDetailCtrl'
}).when('/addsubUserInvitationDetail', {
    templateUrl: '/partials/subUserInvitationDetail/subUserInvitationDetail',
    controller: 'mvSubUserInvitationDetailCtrl'
}).when('/subUserInvitationDetails', {
    templateUrl: '/partials/subUserInvitationDetail/subUserInvitationDetail-list.html',
    controller: 'mvSubUserInvitationDetailListCtrl'
})




.when('/subUserInvitations/:id', {
            templateUrl: '/partials/subUserInvitation/subUserInvitation-detail',
            controller: 'mvSubUserInvitationDetailCtrl'
        }).when('/updatesubUserInvitation/:id', {
            templateUrl: '/partials/subUserInvitation/subUserInvitation',
            controller: 'mvSubUserInvitationCtrl'
        }).when('/addsubUserInvitation', {
            templateUrl: '/partials/subUserInvitation/subUserInvitation',
            controller: 'mvSubUserInvitationCtrl'
        }).when('/subUserInvitations', {
            templateUrl: '/partials/subUserInvitation/subUserInvitation-list.html',
            controller: 'mvSubUserInvitationListCtrl'
        });


});


angular.module('app').run(function ($rootScope, $location, $translate, mvLookup, mvStyle) {
    $rootScope.currentLang = $translate.use();
    $rootScope.bootstrapFile = mvStyle.getStyleFile();
    $rootScope.siteFile = mvStyle.getSiteStyleFile();
    $rootScope.sideBarFile = mvStyle.getSideBarStyleFile();
    $rootScope.customBootstrapStyleFile = mvStyle.getCustomBootstrapStyleFile();
    $rootScope.customStyleFile = mvStyle.getCustomStyleFile();


    mvLookup.getAllLookUps();
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
angular.module('app').factory('mvLookup'
    , function (mvIndustry, mvJobType, mvGender, mvMaritalStatus, mvMilitaryStatus, mvCarLicenceType,
        mvCountry, mvCity, mvLanguage,  mvArea, mvCurancy, mvCompanyType, mvUnivirsty, mvFaculty, 
        mvSpecialization, mvGrade, mvCompanySize,mvTrainingCenter, mvEducationalLevel, mvJobRole,mvCareerLevel, $rootScope , mvSkillType, mvSkillLevel, mvLanguageLevel) {
    
    return {
        getAllLookUps: function () {
            $rootScope.jobTypes = mvJobType.query({ currentLang: $rootScope.currentLang });
            $rootScope.countries = mvCountry.query({ currentLang: $rootScope.currentLang });
            $rootScope.cities = mvCity.query({ currentLang: $rootScope.currentLang });
            $rootScope.areas = mvArea.query({ currentLang: $rootScope.currentLang });
            $rootScope.curancies = mvCurancy.query({ currentLang: $rootScope.currentLang });
            $rootScope.companyTypes = mvCompanyType.query({ currentLang: $rootScope.currentLang });
            $rootScope.companySizes = mvCompanySize.query({ currentLang: $rootScope.currentLang });
            $rootScope.genders = mvGender.query({ currentLang: $rootScope.currentLang });
            $rootScope.maritalStatuses = mvMaritalStatus.query({ currentLang: $rootScope.currentLang });
            $rootScope.militaryStatuses = mvMilitaryStatus.query({ currentLang: $rootScope.currentLang });
            $rootScope.carLicenceTypes = mvCarLicenceType.query({ currentLang: $rootScope.currentLang });            
            $rootScope.univirsties = mvUnivirsty.query({ currentLang: $rootScope.currentLang });
            $rootScope.faculties = mvFaculty.query({ currentLang: $rootScope.currentLang });
            $rootScope.specializations = mvSpecialization.query({ currentLang: $rootScope.currentLang });
            $rootScope.grades = mvGrade.query({ currentLang: $rootScope.currentLang });            
            $rootScope.trainingCenters = mvTrainingCenter.query({ currentLang: $rootScope.currentLang });
            $rootScope.languages = mvLanguage.query({});
            $rootScope.languageLevels = mvLanguageLevel.query({ currentLang: $rootScope.currentLang });
            $rootScope.skillTypes = mvSkillType.query({ currentLang: $rootScope.currentLang });
            $rootScope.skillLevels = mvSkillLevel.query({ currentLang: $rootScope.currentLang });
            $rootScope.educationalLevels = mvEducationalLevel.query({ currentLang: $rootScope.currentLang });
            $rootScope.careerLevels = mvCareerLevel.query({ currentLang: $rootScope.currentLang });
            $rootScope.industries = mvIndustry.query({ currentLang: $rootScope.currentLang });
            $rootScope.jobRoles = mvJobRole.query({ currentLang: $rootScope.currentLang });
        }
    };
});
angular.module('app').factory('mvStyle', function (mvIndustry, mvJobType, $rootScope) {

    return {
        getStyleFile: function () {
            if ($rootScope.currentLang == 'ar')
                return "vendor/bootstrap/dist/css/bootstrap-rtl.css";
            else if ($rootScope.currentLang == 'en')
                return "vendor/bootstrap/dist/css/bootstrap.min.css";
        }
        , getSiteStyleFile: function () {
            console.log($rootScope.currentLang);
            if ($rootScope.currentLang == 'ar')
                return "css/siteRTL.css";
            else if ($rootScope.currentLang == 'en')
                return "css/siteLTR.css";
        }
        , getSideBarStyleFile: function () {
            console.log($rootScope.currentLang);
            if ($rootScope.currentLang == 'ar')
                return "css/simple-sidebarRTL.css";
            else if ($rootScope.currentLang == 'en')
                return "css/simple-sidebar.css";
        }
        , getCustomBootstrapStyleFile: function () {  
            console.log($rootScope.currentLang);         
            if ($rootScope.currentLang == 'ar')
                return "css/custombootstrapRTL.css";
            else if ($rootScope.currentLang == 'en')
                return "css/custombootstrap.css";
        }
         , getCustomStyleFile: function () {
             console.log($rootScope.currentLang);         
             if ($rootScope.currentLang == 'ar')
                 return "css/styleRTL.css";
             else if ($rootScope.currentLang == 'en')
                 return "css/style.css";
         }
        

    };


});
angular.module('app').controller('mvMainCtrl', ['$scope', 'mvCourse', 'mvIdentity', '$location',

    function ($scope, mvCourse, mvIdentity, $location) {
        $scope.identity = mvIdentity;
        $scope.courses = mvCourse.query();

        $scope.search = function () {
            $location.path('/vacanciesSearchResult');
        };

        $(function () {
            $('#noo-slider-3 .sliders').carouFredSel({
                infinite: true,
                circular: true,
                responsive: true,
                debug: false,
                items: {
                    start: 0
                },
                scroll: {
                    items: 1,
                    duration: 400,

                    fx: "scroll"
                },
                auto: {
                    timeoutDuration: 3000,

                    play: true
                },

                pagination: {
                    container: "#noo-slider-3-pagination"
                },
                swipe: {
                    onTouch: true,
                    onMouse: true
                }
            });
            $('#noo-tabs-2 a:eq(1)').tab('show');
        });
    }
]);
angular.module('app').controller('mvMainHeadCtrl', function ($scope , $rootScope) {
    $scope.styleFile = "vendor/bootstrap/dist/css/bootstrap.min.css";
    $scope.rtlstyleFile = "vendor/bootstrap/dist/css/bootstrap-rtl.css";
    
    
});


angular.module('app').controller('mvFooterCtrl', function ($scope, mvCourse, mvIdentity, $translate , $rootScope , mvLookup, mvStyle, $route) {
    $scope.changeLanguage = function (lang) {
        debugger;
        $translate.use(lang);
        $rootScope.currentLang = lang;
        mvLookup.getAllLookUps();
        $rootScope.bootstrapFile = mvStyle.getStyleFile();
        $rootScope.siteFile = mvStyle.getSiteStyleFile();
        $rootScope.sideBarFile = mvStyle.getSideBarStyleFile();
        $rootScope.customBootstrapStyleFile = mvStyle.getCustomBootstrapStyleFile();
        $rootScope.customStyleFile = mvStyle.getCustomStyleFile();

        
        //$route.reload();
        location.reload();
    };

});
angular.module('app').controller('mvSidebarCtrl',
    function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
        $scope.identity = mvIdentity;

        $scope.signin = function (username, password,rememberme) {
            mvAuth.authenticatedUser(username, password,rememberme).then(function (success) {
                if (success) {
                    mvNotifier.notify('You have successfully signed in');
                } else {
                    mvNotifier.error('Username/Password combination incorrect');
                }
            });
        };

        $scope.signout = function () {
            mvAuth.logoutUser().then(function () {
                $scope.username = '';
                $scope.password = '';
                mvNotifier.notify('You have successfully signed out');
                $location.path('/');
            });
        };


    });
angular.module('app').controller('mvLogoCtrl', function ($scope) {
       
    $scope.title = "Empower";
    $scope.subTitle = "The Hand That Help";

});
angular.module('app').factory('mvCountry', function ($resource) {
    var CountryResource = $resource('/api/countries/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CountryResource;
});
angular.module('app').factory('mvCountryRepo', function ($http, $q, mvCountry,mvIdentity) {
    return {

        createCountry: function (newCountryData) {
            var newCountry = new mvCountry(newCountryData);
            newCountry.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Country");
            newCountry.$save().then(function (country) {
                console.log(country);
                console.log("Country Saved");
                dfd.resolve(country);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createCountryAfterCreatingUser: function (newCountryData) {
            var newCountry = new mvCountry(newCountryData);
            var dfd = $q.defer();
            console.log("Saving Country");
            newCountry.$save().then(function (employer) {
                console.log("Country Saved");
                mvIdentity.currentCountry = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCountry: function (newCountryData) {
            newCountryData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCountryData);
            angular.extend(clone,newCountryData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCurancy', function ($resource) {
    var CurancyResource = $resource('/api/curancies/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CurancyResource;
});
angular.module('app').factory('mvCompanySize', function ($resource) {
    var CompanySizeResource = $resource('/api/companySizes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CompanySizeResource;
});
angular.module('app').factory('mvCompanyType', function ($resource) {
    var ComoanyTypeResource = $resource('/api/companyTypes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return ComoanyTypeResource;
});
angular.module('app').factory('mvCachedLanguage', function (mvLanguage) {
    var languageList;
    return {
        query: function () {
            if (!languageList) {
                languageList = mvLanguage.query();
            }
            return languageList;
        }
    };
});
angular.module('app').factory('mvLanguage', function ($resource) {
    var LanguageResource = $resource('/api/languages/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return LanguageResource;
});
angular.module('app').factory('mvCachedTrainingCenter', function (mvTrainingCenter) {
    var trainingCenterList;
    return {
        query: function () {
            if (!trainingCenterList) {
                trainingCenterList = mvTrainingCenter.query();
            }
            return trainingCenterList;
        }
    };
});
angular.module('app').factory('mvTrainingCenter', function ($resource) {
    var TrainingCenterResource = $resource('/api/TrainingCenters/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return TrainingCenterResource;
});
angular.module('app').factory('mvCachedLanguageLevel', function (mvLanguageLevel) {
    var languageLevelsList;
    return {
        query: function () {
            if (!languageLevelsList) {
                languageLevelsList = mvLanguageLevel.query();
            }
            return languageLevelsList;
        }
    };
});
angular.module('app').factory('mvLanguageLevel', function ($resource) {
    var LanguageLevelResource = $resource('/api/languageLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return LanguageLevelResource;
});
angular.module('app').factory('mvCachedSkillLevel', function (mvSkillLevel) {
    var skillLevelList;
    return {
        query: function () {
            if (!skillLevelList) {
                skillLevelList = mvSkillLevel.query();
            }
            return skillLevelList;
        }
    };
});
angular.module('app').factory('mvSkillLevel', function ($resource) {
    var SkillLevelResource = $resource('/api/skillLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return SkillLevelResource;
});
angular.module('app').factory('mvSkillLevelRepo', function ($http, $q, mvSkillLevel,mvIdentity) {
    return {

        createSkillLevel: function (newSkillLevelData) {
            var newSkillLevel = new mvSkillLevel(newSkillLevelData);
            newSkillLevel.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SkillLevel");
            newSkillLevel.$save().then(function (skillLevel) {
                console.log(skillLevel);
                console.log("SkillLevel Saved");
                dfd.resolve(skillLevel);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createSkillLevelAfterCreatingUser: function (newSkillLevelData) {
            var newSkillLevel = new mvSkillLevel(newSkillLevelData);
            var dfd = $q.defer();
            console.log("Saving SkillLevel");
            newSkillLevel.$save().then(function (employer) {
                console.log("SkillLevel Saved");
                mvIdentity.currentSkillLevel = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSkillLevel: function (newSkillLevelData) {
            newSkillLevelData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSkillLevelData);
            angular.extend(clone,newSkillLevelData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedSkillType', function (mvSkillType) {
    var skillTypeList;
    return {
        query: function () {
            if (!skillTypeList) {
                skillTypeList = mvSkillType.query();
            }
            return skillTypeList;
        }
    };
});
angular.module('app').factory('mvSkillType', function ($resource) {
    var SkillTypeResource = $resource('/api/skillTypes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return SkillTypeResource;
});
angular.module('app').factory('mvSkillTypeRepo', function ($http, $q, mvSkillType,mvIdentity) {
    return {

        createSkillType: function (newSkillTypeData) {
            var newSkillType = new mvSkillType(newSkillTypeData);
            newSkillType.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SkillType");
            newSkillType.$save().then(function (skillType) {
                console.log(skillType);
                console.log("SkillType Saved");
                dfd.resolve(skillType);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createSkillTypeAfterCreatingUser: function (newSkillTypeData) {
            var newSkillType = new mvSkillType(newSkillTypeData);
            var dfd = $q.defer();
            console.log("Saving SkillType");
            newSkillType.$save().then(function (employer) {
                console.log("SkillType Saved");
                mvIdentity.currentSkillType = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSkillType: function (newSkillTypeData) {
            newSkillTypeData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSkillTypeData);
            angular.extend(clone,newSkillTypeData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvHotVacanciesCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo, mvNotifier,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
   //$scope.vacancies = mvVacancy.query();
    ////$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'VacancyName', text: 'Sort by VacancyName'},
    //    {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    //$scope.sortOrder = $scope.sortOptions[0].value;
    //$scope.getName = function(list){
    //    for(var i = 0; i < list.length; i++) {

    //        if(list[i].Lang == $scope.currentLang) {
    //            return list[i].Text;
    //        }
    //    }
    //};

    //$scope.getLang = function(){
    //    return $translate.use();
    //};
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            jobSeeker: mvIdentity.currentJobSeeker._id,
            Puplished: true,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacanciess = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
 
    
    $scope.getData();
});

angular.module('app').controller('mvNewVacanciesCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo, mvNotifier,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
   //$scope.vacancies = mvVacancy.query();
    ////$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'VacancyName', text: 'Sort by VacancyName'},
    //    {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    //$scope.sortOrder = $scope.sortOptions[0].value;
    //$scope.getName = function(list){
    //    for(var i = 0; i < list.length; i++) {

    //        if(list[i].Lang == $scope.currentLang) {
    //            return list[i].Text;
    //        }
    //    }
    //};

    //$scope.getLang = function(){
    //    return $translate.use();
    //};
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    var currentUserId;
    if ($scope.currentUser)
        currentUserId = $scope.currentUser._id;
    else
        currentUserId = null;

    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            jobSeeker: currentUserId,
            Puplished: true,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
 
    
    $scope.getData();
});

angular.module('app').controller('mvJobsByIndustriesCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo,
    $routeParams, mvNotifier, $translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;

    var jobSeekerId = mvIdentity.currentJobSeeker._id;
    debugger;
    if (!jobSeekerId)
        jobSeekerId = 0;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            jobSeeker: jobSeekerId,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacanciesByIndustries = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
 
    
    $scope.getData();
});

/*! 
 * angular-loading-bar v0.9.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2016 Wes Cruver
 * License: MIT
 */
!function(){"use strict";angular.module("angular-loading-bar",["cfp.loadingBarInterceptor"]),angular.module("chieffancypants.loadingBar",["cfp.loadingBarInterceptor"]),angular.module("cfp.loadingBarInterceptor",["cfp.loadingBar"]).config(["$httpProvider",function(a){var b=["$q","$cacheFactory","$timeout","$rootScope","$log","cfpLoadingBar",function(b,c,d,e,f,g){function h(){d.cancel(j),g.complete(),l=0,k=0}function i(b){var d,e=c.get("$http"),f=a.defaults;!b.cache&&!f.cache||b.cache===!1||"GET"!==b.method&&"JSONP"!==b.method||(d=angular.isObject(b.cache)?b.cache:angular.isObject(f.cache)?f.cache:e);var g=void 0!==d?void 0!==d.get(b.url):!1;return void 0!==b.cached&&g!==b.cached?b.cached:(b.cached=g,g)}var j,k=0,l=0,m=g.latencyThreshold;return{request:function(a){return a.ignoreLoadingBar||i(a)||(e.$broadcast("cfpLoadingBar:loading",{url:a.url}),0===k&&(j=d(function(){g.start()},m)),k++,g.set(l/k)),a},response:function(a){return a&&a.config?(a.config.ignoreLoadingBar||i(a.config)||(l++,l>=k?(e.$broadcast("cfpLoadingBar:loaded",{url:a.config.url,result:a}),h()):g.set(l/k)),a):(f.error("Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"),a)},responseError:function(a){return a&&a.config?(a.config.ignoreLoadingBar||i(a.config)||(l++,l>=k?(e.$broadcast("cfpLoadingBar:loaded",{url:a.config.url,result:a}),h()):g.set(l/k)),b.reject(a)):(f.error("Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"),b.reject(a))}}}];a.interceptors.push(b)}]),angular.module("cfp.loadingBar",[]).provider("cfpLoadingBar",function(){this.autoIncrement=!0,this.includeSpinner=!0,this.includeBar=!0,this.latencyThreshold=100,this.startSize=.02,this.parentSelector="body",this.spinnerTemplate='<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>',this.loadingBarTemplate='<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>',this.$get=["$injector","$document","$timeout","$rootScope",function(a,b,c,d){function e(){if(k||(k=a.get("$animate")),c.cancel(m),!r){var e=b[0],g=e.querySelector?e.querySelector(n):b.find(n)[0];g||(g=e.getElementsByTagName("body")[0]);var h=angular.element(g),i=g.lastChild&&angular.element(g.lastChild);d.$broadcast("cfpLoadingBar:started"),r=!0,v&&k.enter(o,h,i),u&&k.enter(q,h,o),f(w)}}function f(a){if(r){var b=100*a+"%";p.css("width",b),s=a,t&&(c.cancel(l),l=c(function(){g()},250))}}function g(){if(!(h()>=1)){var a=0,b=h();a=b>=0&&.25>b?(3*Math.random()+3)/100:b>=.25&&.65>b?3*Math.random()/100:b>=.65&&.9>b?2*Math.random()/100:b>=.9&&.99>b?.005:0;var c=h()+a;f(c)}}function h(){return s}function i(){s=0,r=!1}function j(){k||(k=a.get("$animate")),f(1),c.cancel(m),m=c(function(){var a=k.leave(o,i);a&&a.then&&a.then(i),k.leave(q),d.$broadcast("cfpLoadingBar:completed")},500)}var k,l,m,n=this.parentSelector,o=angular.element(this.loadingBarTemplate),p=o.find("div").eq(0),q=angular.element(this.spinnerTemplate),r=!1,s=0,t=this.autoIncrement,u=this.includeSpinner,v=this.includeBar,w=this.startSize;return{start:e,set:f,status:h,inc:g,complete:j,autoIncrement:this.autoIncrement,includeSpinner:this.includeSpinner,latencyThreshold:this.latencyThreshold,parentSelector:this.parentSelector,startSize:this.startSize}}]})}();
angular.module('app').value('toastr', toastr);

angular.module('app').factory('mvNotifier', function (toastr) {
    return {
        notify: function (msg) {
            toastr.success(msg);
            console.log(msg);
        },
        error: function (msg) {
            toastr.error(msg);
            console.log(msg);
        }
    };
});
angular.module('app').controller('mvNavBarLoginCtrl',
    function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
        $scope.identity = mvIdentity;

        $scope.signin = function (username, password,rememberme) {
            mvAuth.authenticatedUser(username, password,rememberme).then(function (success) {
                if (success) {
                    mvNotifier.notify('You have successfully signed in');
                } else {
                    mvNotifier.error('Username/Password combination incorrect');
                }
            });
        };

        $scope.signout = function () {
            mvAuth.logoutUser().then(function () {
                $scope.username = '';
                $scope.password = '';
                mvNotifier.notify('You have successfully signed out');
                $location.path('/');
            });
        };


    });
angular.module('app').factory('mvIdentity', function ($window, mvUser, mvEmployer, mvJobSeeker) {

    var currentUser = null;
    var currentEmployer = null;
    var currentJobSeeker = null;
    
    $.ajax({
        url: "api/current_user_send_to_client",
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('current_user_send_to_client')) {
                currentUser = new mvUser();
                angular.extend(currentUser, data.current_user_send_to_client);
            }
        }
    });
    
    $.ajax({
        url: "api/employerByUser",
        dataType: 'json',
        async: false,
        success: function (data) {
            
            currentEmployer = new mvEmployer();
            console.log(data);
                angular.extend(currentEmployer, data);
            
        }
    });
    
    
    $.ajax({
        url: "api/jobSeekerByUser",
        dataType: 'json',
        async: false,
        success: function (data) {
            
            currentJobSeeker = new mvJobSeeker();
            console.log(data);
                angular.extend(currentJobSeeker, data);
            
        }
    });

    return {
        currentUser: currentUser,
        currentEmployer: currentEmployer,
        currentJobSeeker: currentJobSeeker,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.UserType.indexOf(role) > -1;
        }
    };
});

angular.module('app').factory('mvAuth', function ($http, $q, mvIdentity, mvUser) {
    return {
        authenticatedUser: function (username, password, rememberme) {
            var dfd = $q.defer();
            $http.post('/login', { username: username, password: password, rememberme: rememberme })
                .then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);

                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        createUser: function (newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();
            
            newUser.$save().then(function () {
                mvIdentity.currentUser = newUser;
                dfd.resolve(newUser);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();
            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function () {
                mvIdentity.currentUser = clone;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', { logout: true })
                .then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }, 
        resetUserPassword: function (email) {
            var dfd = $q.defer();
            $http.post('/forget', { email: email })
                .then(function () {                
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function () {
            if (mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});
angular.module('app').factory('mvUser', function ($resource) {
    var UserResource = $resource('/api/users/:id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });
    UserResource.prototype.isAdmin = function () {
        return this.UserType && this.UserType.indexOf('A') > -1;
    };

    UserResource.prototype.isJobSeeker = function () {
        return this.UserType && this.UserType.indexOf('J') > -1;
    };

    UserResource.prototype.isEmployer = function () {
        return this.UserType && this.UserType.indexOf('E') > -1;
    };

    UserResource.prototype.isSubUser = function () {
        return this.UserType && this.UserType.indexOf('S') > -1;
    };

    UserResource.prototype.isTrainingCenter = function () {
        return this.UserType && this.UserType.indexOf('T') > -1;
    };

    return UserResource;
});

angular.module('app').controller('mvSignupCtrl', function ($scope, $location, mvUser, mvNotifier, mvAuth) {

    $scope.signup = function () {
        var newUserData = {
            UserName: $scope.email,
            Password: $scope.password,
            FirstName: $scope.firstname,
            LastName: $scope.lastname
        };

        mvAuth.createUser(newUserData).then(function () {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});
angular.module('app').controller('mvProfileCtrl', function ($scope, mvIdentity, mvNotifier, mvAuth) {

    $scope.email = mvIdentity.currentUser.UserName;
    $scope.firstname = mvIdentity.currentUser.FirstName;
    $scope.lastname = mvIdentity.currentUser.LastName;

    $scope.update = function () {
        var newUserData = {
            UserName: $scope.email,
            FirstName: $scope.firstname,
            LastName: $scope.lastname
        };

        if($scope.password && $scope.password.length > 0 ){
            newUserData.Password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify('Your user account has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});
angular.module('app').controller('mvFrontSignupCtrl', function ($scope, $rootScope, $location, $q, mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer, mvEmployerRepo) {
    
    $scope.usertype = "J";
    
    $scope.signup = function () {
        if ($scope.frontSignupForm.$valid) {
            //form is valid
            
            var name;
            if ($scope.usertype == 'J') {
                name = $scope.firstname;
            }
            else {
                name = $scope.employername;
            }
            
            var newUserData = {
                UserName: $scope.email,
                Password: $scope.password,
                FirstName: name ,
                LastName: $scope.lastname,
                UserType: $scope.usertype
             
            };
            
            mvAuth.createUser(newUserData)
            .then(function () {
                if ($scope.usertype == 'E') {
                    var newEmployerData = {
                        EmployerName: [{ 'Lang': $rootScope.currentLang, 'Text': name }],
                        User: mvIdentity.currentUser,
                        CreatedBy: mvIdentity.currentUser
                    };
                    return mvEmployerRepo.createEmployerAfterCreatingUser(newEmployerData);
                } else if ($scope.usertype == 'J') {
                    var newJobSeekerData = {
                        User: mvIdentity.currentUser,
                        CreatedBy: mvIdentity.currentUser,
                        FirstName: name ,
                        Deleted:false,
                        LastName: $scope.lastname
                    };
                    return mvJobSeekerRepo.createJobSeekerAfterCreatingUser(newJobSeekerData);
                }
                return $q.null;
            })
            .then(function () {
                mvNotifier.notify('User account created!');
                var type = $scope.usertype;
                
                //clear form fields
                $scope.email = '';
                $scope.password = '';
                $scope.firstname = '';
                $scope.lastname = '';
                $scope.usertype = '';
                if ($('#userregisterModal').length) {
                    $('#userregisterModal').modal('hide');
                }
                if (type == 'E') {
                    $location.path('/updateemployer/' + mvIdentity.currentEmployer._id);
                } else if (type == 'J') {
                    $location.path('/updateJobSeeker/PersonalInformation/' + mvIdentity.currentJobSeeker._id);
                }
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.facebookLogin = function () {
       
                    $location.path('/auth/facebook/');
             
    };
    
    $scope.googleLogin = function () {
        
        $location.path('/auth/google/');
             
    };
});
angular.module('app').controller('mvForgetPasswordCtrl', function ($scope, $http, $location, mvIdentity, mvNotifier) {

    $scope.disableFlag = false;
    $scope.resetPassword = function () {
        if ($scope.forgetPasswordForm.$valid) {
            $scope.disableFlag = true;
            $http.post('/forget', { email: $scope.email }).then(function() {
                mvNotifier.notify('An e-mail has been sent to ' + $scope.email + ' with further instructions.');                
                $location.path('/');
            });
        }
    };
});
angular.module('app').controller('mvFrontLoginCtrl',
    function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth, mvLookup, $translate, $rootScope, mvStyle) {
    $scope.identity = mvIdentity;
    
    $scope.signin = function (username, password, rememberme) {
        if ($scope.frontLoginForm.$valid) {            
            mvAuth.authenticatedUser(username, password, rememberme).then(function (success) {
                if (success) {
                   
                    $scope.username = '';
                    $scope.password = '';
                    mvNotifier.notify('You have successfully signed in');
                    if ($('#userloginModal').length) {
                        $('#userloginModal').modal('hide');
                    }
                    
                } else {
                    mvNotifier.error('Username/Password combination incorrect');
                }
            });
        }
    };
    
    
    $scope.forget = function () {
        
                    if ($('#userloginModal').length) {
                        $('#userloginModal').modal('hide');
                    }
               
    };
    
    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
            $scope.username = '';
            $scope.password = '';
            mvNotifier.notify('You have successfully signed out');
            $location.path('/');
        });
    };

        $scope.changeLanguage = function (lang) {
            debugger;
            $translate.use(lang);
            $rootScope.currentLang = lang;
            mvLookup.getAllLookUps();
            $rootScope.bootstrapFile = mvStyle.getStyleFile();
            $rootScope.siteFile = mvStyle.getSiteStyleFile();
            $rootScope.sideBarFile = mvStyle.getSideBarStyleFile();
            $rootScope.customBootstrapStyleFile = mvStyle.getCustomBootstrapStyleFile();
            $rootScope.customStyleFile = mvStyle.getCustomStyleFile();

            //$route.reload();
            location.reload();
        };


});
angular.module('app').controller('mvResetPasswordCtrl', function ($scope, $http, $location, $routeParams, mvUser, mvIdentity, mvNotifier) {
    
    $scope.disableFlag = false;

    $http.get('/reset/'+ $routeParams.token).then(function (res) {
        if (res.data.reason) {
            mvNotifier.notify('This link is expired please make another link');
            $location.path('/forget');
        }
    });

    $scope.resetPassword = function () {
        if ($scope.resetPasswordForm.$valid) {
            $scope.disableFlag = true;
            $http.post('/reset', {token: $routeParams.token, password: $scope.password }).then(function(res) {
                if (res.data.error) {
                    mvNotifier.notify(res.data.error);
                    $location.path('/forget');
                } else {
                    if (res.data.success) {
                        var user = new mvUser();
                        angular.extend(user, res.data.user);
                        mvIdentity.currentUser = user;                        
                    }
                    mvNotifier.notify('Your password has been changed successfully please sign in');
                    $location.path('/');
                }                
            });
        }
    };
});
angular.module('app').controller('mvCourseListCtrl', function ($scope, mvCourse,$translate, mvIdentity , queryBulider , mvJobSeeker , $routeParams , mvCourseRepo , mvNotifier) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.courses = mvCourse.query({ jobSeeker: mvIdentity.currentJobSeeker });
    $scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: '_id', text: 'Sort by _id'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getName = function(list){
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == $scope.currentLang) {
                return list[i].Text;
            }
        }
    };
    
    var id = $routeParams.id;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvCourse.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.courses = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.deleteCourse = function (course) {
        var cr = mvCourse.get({ _id: course._id }, (function () {
            cr.Deleted = true;
            cr.DeletedBy = mvIdentity.currentUser;
            mvCourseRepo.updateCurrentCourse(cr).then(function () {
                mvNotifier.notify('Course has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    $scope.getData();
    $scope.getLang = function(){
        return $translate.use();
    };
});

angular.module('app').factory('mvCachedCourse', function (mvCourse) {
    var courseList;
    return {
        query: function () {
            if (!courseList) {
                courseList = mvCourse.query();
            }
            return courseList;
        }
    };
});
angular.module('app').controller('mvCourseDetailCtrl', function ($scope, mvCourse, $routeParams) {
    $scope.course = mvCourse.get({_id: $routeParams.id});
});
angular.module('app').factory('mvCourseRepo', function ($http, $q, mvCourse,mvIdentity) {
    return {

        createCourse: function (newCourseData) {
            var newCourse = new mvCourse(newCourseData);
            newCourse.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Course");
            newCourse.$save().then(function () {
                console.log("Course Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createCourseAfterCreatingUser: function (newCourseData) {
            var newCourse = new mvCourse(newCourseData);
            var dfd = $q.defer();
            console.log("Saving Course");
            newCourse.$save().then(function (course) {
                console.log("Course Saved");
                mvIdentity.currentCourse = course;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCourse: function (newCourseData) {
            newCourseData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCourseData);
            angular.extend(clone,newCourseData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvCourseCtrl', function ($scope, mvNotifier,
    mvCourseRepo, mvCourse, $routeParams, $translate, mvIdentity, $location, $rootScope, mvJobSeekerRepo) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $scope.course = new mvCourse();

    if (mvIdentity.currentJobSeeker)
        $scope.course.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.course.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateCourse = function updateCourse(course) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        course.TrainingCenter = course.TrainingCenter._id;
        course.Specialization = course.Specialization._id;
        course.Grade = course.Grade._id;

        $scope.course = course;
    }

    $scope.addCourse = function addCourse() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.course = new mvCourse();

    }

    $scope.deleteCourse = function (course) {

        var array = $rootScope.jobSeeker.Courses;

        $rootScope.jobSeeker.Courses.forEach(function (element) {
            if (element._id == course._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/Courses/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var course = {
            Title: $scope.course.Title,
            JobSeeker: $scope.course.JobSeeker,
            TrainingCenter: $scope.course.TrainingCenter,
            Specialization: $scope.course.Specialization,
            Grade: $scope.course.Grade,
            CourseYear: $scope.course.CourseYear
        };
        if ($rootScope.jobSeeker.Courses == undefined)
            $rootScope.jobSeeker.Courses = [];

        $rootScope.jobSeeker.Courses.push(course);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Courses/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var course = {
            Title: $scope.course.Title,
            JobSeeker: $scope.course.JobSeeker,
            TrainingCenter: $scope.course.TrainingCenter,
            Specialization: $scope.course.Specialization,
            Grade: $scope.course.Grade,
            CourseYear: $scope.course.CourseYear,
            _id: $scope.course._id
        };

        var array = $rootScope.jobSeeker.Courses;

        $rootScope.jobSeeker.Courses.forEach(function (element) {
            if (element._id == course._id) {
                var index = array.indexOf(element);
                array[index] = course;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Courses/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
});
angular.module('app').factory('mvCourse', function ($resource) {
    var courseResource = $resource('/api/courses/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    return courseResource;
});
angular.module('app').factory('mvCachedEmployer', function (mvCourse) {
    var employerList;
    return {
        query: function () {
            if (!employerList) {
                employerList = mvEmployer.query();
            }
            return employerList;
        }
    };
});
angular.module('app').factory('mvSkill', function ($resource) {
    var SkillResource = $resource('/api/skills/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return SkillResource;
});
angular.module('app').controller('mvSkillCtrl', function ($scope, $rootScope, mvNotifier, mvSkillRepo, mvSkill, $routeParams
    , $translate, mvIdentity, $location, mvCountryRepo, mvCountry, $q, mvJobSeekerRepo) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $scope.skill = new mvSkill();

    if (mvIdentity.currentJobSeeker)
        $scope.skill.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.skill.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateSkill = function updateSkill(skill) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        $scope.skill = skill;
    }

    $scope.addSkill = function addSkill() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.skill = new mvSkill();

    }

    $scope.deleteSkill = function (skill) {

        var array = $rootScope.jobSeeker.Skills;

        $rootScope.jobSeeker.Skills.forEach(function (element) {
            if (element._id == skill._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/Skills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var skill = {
            SkillType: $scope.skill.SkillType,
            SkillLevel: $scope.skill.SkillLevel
        };
        if ($rootScope.jobSeeker.Skills == undefined)
            $rootScope.jobSeeker.Skills = [];

        $rootScope.jobSeeker.Skills.push(skill);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Skills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var skill = {
            SkillType: $scope.skill.SkillType,
            SkillLevel: $scope.skill.SkillLevel,
            _id: $scope.skill._id
        };

        var array = $rootScope.jobSeeker.Skills;

        $rootScope.jobSeeker.Skills.forEach(function (element) {
            if (element._id == skill._id) {
                var index = array.indexOf(element);
                array[index] = skill;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Skills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
   
});
angular.module('app').controller('mvSkillDetailCtrl', function ($scope, mvSkill, $routeParams) {
    $scope.skill = mvSkill.get({_id: $routeParams.id});
});
angular.module('app').controller('mvSkillListCtrl', function ($scope, mvSkill,$translate, mvIdentity, mvJobSeeker, queryBulider, mvSkillRepo, mvNotifier, $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.skills = mvSkill.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'SkillName', text: 'Sort by SkillName'},
    //    {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    var id = $routeParams.id;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvSkill.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.Skills = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    
       $scope.deleteSkill = function (skill) {
        
        var sk = mvSkill.get({ _id: skill._id }, (function () {
            sk.Deleted = true;
            sk.DeletedBy = mvIdentity.currentUser;
            mvSkillRepo.updateCurrentSkill(sk).then(function () {
                mvNotifier.notify('Skill has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));        
    };
});

angular.module('app').factory('mvSkillRepo', function ($http, $q, mvSkill,mvIdentity) {
    return {

        createSkill: function (newSkillData) {
            var newSkill = new mvSkill(newSkillData);
            newSkill.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Skill");
            newSkill.$save().then(function () {
                console.log("Skill Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createSkillAfterCreatingUser: function (newSkillData) {
            var newSkill = new mvSkill(newSkillData);
            var dfd = $q.defer();
            console.log("Saving Skill");
            newSkill.$save().then(function (skill) {
                console.log("Skill Saved");
                mvIdentity.currentSkill = skill;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSkill: function (newSkillData) {
            newSkillData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSkillData);
            angular.extend(clone,newSkillData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedLanguageSkill', function (mvLanguageSkill) {
    var languageSkillList;
    return {
        query: function () {
            if (!languageSkillList) {
                languageSkillList = mvLanguageSkill.query();
            }
            return languageSkillList;
        }
    };
});
angular.module('app').factory('mvLanguageSkill', function ($resource) {
    var languageSkillResource = $resource('/api/languageSkills/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    return languageSkillResource;
});
angular.module('app').controller('mvLanguageSkillCtrl', function ($scope, mvNotifier, mvLanguageSkillRepo,
    mvLanguageSkill, $routeParams, $translate,
    mvIdentity, $location, $rootScope, mvJobSeekerRepo) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $scope.LanguageSkill = new mvLanguageSkill();

    if (mvIdentity.currentJobSeeker)
        $scope.LanguageSkill.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.LanguageSkill.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateLanguageSkill = function updateLanguageSkill(LanguageSkill) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        $scope.LanguageSkill = LanguageSkill;
    }

    $scope.addLanguageSkill = function addLanguageSkill() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.LanguageSkill = new mvLanguageSkill();

    }

    $scope.deleteLanguageSkill = function (LanguageSkill) {

        var array = $rootScope.jobSeeker.LanguageSkills;

        $rootScope.jobSeeker.LanguageSkills.forEach(function (element) {
            if (element._id == LanguageSkill._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/LanguageSkills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var LanguageSkill = {
            Language: $scope.LanguageSkill.Language,
            LanguageSkillLevel: $scope.LanguageSkill.LanguageSkillLevel
        };
        if ($rootScope.jobSeeker.LanguageSkills == undefined)
            $rootScope.jobSeeker.LanguageSkills = [];

        $rootScope.jobSeeker.LanguageSkills.push(LanguageSkill);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/LanguageSkills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var LanguageSkill = {
            Language: $scope.LanguageSkill.Language,
            LanguageSkillLevel: $scope.LanguageSkill.LanguageSkillLevel,
            _id: $scope.LanguageSkill._id
        };

        var array = $rootScope.jobSeeker.LanguageSkills;

        $rootScope.jobSeeker.LanguageSkills.forEach(function (element) {
            if (element._id == LanguageSkill._id) {
                var index = array.indexOf(element);
                array[index] = LanguageSkill;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/LanguageSkills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
});
angular.module('app').controller('mvLanguageSkillDetailCtrl', function ($scope, mvLanguageSkill, $routeParams) {
    $scope.languageSkill = mvLanguageSkill.get({_id: $routeParams.id});
});
angular.module('app').controller('mvLanguageSkillListCtrl', function ($scope, mvLanguageSkill, $routeParams,mvJobSeeker,mvLanguageSkillRepo, queryBulider,$translate, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.languageSkills = mvLanguageSkill.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    var id = $routeParams.id;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvLanguageSkill.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.LanguageSkills = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    
    $scope.deleteLanguageSkill = function (languageSkill) {
        console.log('delete');
        var langSkill = mvLanguageSkill.get({ _id: languageSkill._id },(function () {
            langSkill.Deleted = true;
            langSkill.DeletedBy = mvIdentity.currentUser;
        mvLanguageSkillRepo.updateCurrentLanguageSkill(langSkill).then(function () {
                mvNotifier.notify('Language Skill has been deleted!');
            $scope.getData();
        }, function (reason) {
            mvNotifier.error(reason);
            });
        }));


    };
});

angular.module('app').controller('mvjobLanguageSkillCtrl', function ($scope, mvNotifier, mvLanguageSkillRepo, mvLanguageSkill, $routeParams, $translate, mvIdentity, $location, $rootScope) {
    var id = $routeParams.id;
    $scope.languageSkillNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.languageSkill = mvLanguageSkill.get({_id:id },(function(){
            //$scope.languageSkill.PeriodFrom = new Date($scope.languageSkill.PeriodFrom);
            //$scope.languageSkill.PeriodTo = new Date($scope.languageSkill.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.languageSkill = new mvLanguageSkill();
        //console.log(mvIdentity.currentJobSeeker._id);
        $scope.languageSkill.Deleted = false;
        $scope.languageSkill.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


   

    $scope.lang = $scope.languages[0].value;




    $scope.update = function () {
        $scope.loop();
        mvLanguageSkillRepo.updateCurrentLanguageSkill($scope.languageSkill).then(function () {
            mvNotifier.notify('LanguageSkill has been updated!');
            $location.path('/updateJobSeeker/LanguageSkills/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

   

    $scope.add = function(){
       
        var langSkill = {};
        langSkill.LanguageLevel = {};
        langSkill.Language = {};
        langSkill.LanguageLevel = $scope.languageSkill.LanguageSkillLevel;
        langSkill.Language = $scope.languageSkill.Language;
       
        if ($rootScope.vacancy.LanguageSkills == undefined)
            $rootScope.vacancy.LanguageSkills = [];
        var flag = true;
        $rootScope.vacancy.LanguageSkills.forEach(function (element) {
            if (element.Language.Abbreviation == langSkill.Language.Abbreviation)
                flag = false;
               
        });
        if(flag)
        $rootScope.vacancy.LanguageSkills.push(langSkill);
    };

    $scope.loop = function(){

        var listItems = $("#languageSkillNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#LanguageSkillNameText2");
            $scope.languageSkillNameText = input.val();
            $scope.saveLanguageSkillName();

        });
    };

    $scope.delete = function (langSkill) {

        var array = $rootScope.vacancy.LanguageSkills;
       
        $rootScope.vacancy.LanguageSkills.forEach(function (element) {
            if (element.Language.Abbreviation == langSkill.Language.Abbreviation)
            {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.LanguageSkills.remove(element);
            }

        });
        
    };


    
});
angular.module('app').factory('mvLanguageSkillRepo', function ($http, $q, mvLanguageSkill,mvIdentity) {
    return {

        createLanguageSkill: function (newLanguageSkillData) {
            var newLanguageSkill = new mvLanguageSkill(newLanguageSkillData);
            newLanguageSkill.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving LanguageSkill");
            newLanguageSkill.$save().then(function () {
                console.log("LanguageSkill Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createLanguageSkillAfterCreatingUser: function (newLanguageSkillData) {
            var newLanguageSkill = new mvLanguageSkill(newLanguageSkillData);
            var dfd = $q.defer();
            console.log("Saving LanguageSkill");
            newLanguageSkill.$save().then(function (languageSkill) {
                console.log("LanguageSkill Saved");
                mvIdentity.currentLanguageSkill = languageSkill;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentLanguageSkill: function (newLanguageSkillData) {
            newLanguageSkillData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newLanguageSkillData);
            angular.extend(clone,newLanguageSkillData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedQuestion', function (mvQuestion) {
    var QuestionList;
    return {
        query: function () {
            if (!QuestionList) {
                QuestionList = mvQuestion.query();
            }
            return QuestionList;
        }
    };
});
angular.module('app').factory('mvQuestion', function ($resource) {
    var QuestionResource = $resource('/api/Questions/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    return QuestionResource;
});
angular.module('app').controller('mvQuestionCtrl', function ($scope,  mvNotifier, mvQuestionRepo, mvQuestion,$routeParams,$translate, mvIdentity, $location) {
    var id = $routeParams.id;
    $scope.QuestionNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.Question = mvQuestion.get({_id:id },(function(){
            //$scope.Question.PeriodFrom = new Date($scope.Question.PeriodFrom);
            //$scope.Question.PeriodTo = new Date($scope.Question.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.Question = new mvQuestion();
        //console.log(mvIdentity.currentJobSeeker._id);
        $scope.Question.Deleted = false;
        $scope.Question.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


    //$scope.languages = [{value: 'en', text: 'English'},
    //    {value: 'ar', text: 'عربى'},
    //    {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;



    //$scope.QuestionTypes = [{value: 'D', text: 'Direct Question'},
    //    {value: 'S', text: 'Staffing Firm'}];
    //$scope.Question.QuestionType = $scope.QuestionTypes[0].value;

    $scope.update = function () {
        $scope.loop();
        mvQuestionRepo.updateCurrentQuestion($scope.Question).then(function () {
            mvNotifier.notify('Question has been updated!');
            $location.path('/updateJobSeeker/Questions/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    //$scope.saveQuestionName = function () {

    //    var old = false;
    //    if($scope.Question.QuestionName) {
    //        for (var i = 0; i < $scope.Question.QuestionName.length; i++) {
    //            var obj = $scope.Question.QuestionName[i];

    //            if ($scope.Question.QuestionName[i].Lang == $scope.lang) {
    //                $scope.Question.QuestionName[i].Text = $scope.QuestionNameText;
    //                old = true;
    //            }

    //        }
    //    }

    //    if(!old) {
    //        if(!$scope.Question.QuestionName)
    //        {
    //            $scope.Question.QuestionName = [];
    //        }
    //        var QuestionName = {"Lang": $scope.lang, "Text": $scope.QuestionNameText};
    //        $scope.Question.QuestionName.push(QuestionName);
    //    }
    //    $scope.QuestionNameText = "";
    //    $scope.lang = "";

    //};

    //$scope.updateQuestionName = function (Question) {
    //  $scope.lang = Question.Lang;
    //  $scope.QuestionNameText = Question.Text;
    //};

    //$scope.deleteQuestionName = function (Question) {

    //    for(var i = 0; i < $scope.Question.QuestionName.length; i++) {
    //        var obj = $scope.Question.QuestionName[i];
    //        console.log("Old" + obj.Lang);
    //        console.log("New " + Question.Lang);
    //        if(Question.Lang == obj.Lang) {
    //            $scope.Question.QuestionName.splice(i, 1);
    //            i--;
    //        }
    //    }
    //    /*
    //    var QuestionNames = $scope.Question.QuestionName;
    //    console.log(QuestionNames);
    //    QuestionNames.delete(Question);
    //    $scope.Question.QuestionName = QuestionNames;
    //    */


    //};

    $scope.add = function(){
        $scope.loop();
        mvQuestionRepo.createQuestion($scope.Question).then(function () {
            mvNotifier.notify('New Question Added!');
            $scope.addEnabled = false;
            $location.path('/updateJobSeeker/Questions/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#QuestionNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#QuestionNameText2");
            $scope.QuestionNameText = input.val();
            $scope.saveQuestionName();

        });
    };
});
angular.module('app').controller('mvQuestionDetailCtrl', function ($scope, mvQuestion, $routeParams) {
    $scope.Question = mvQuestion.get({_id: $routeParams.id});
});
angular.module('app').controller('mvQuestionListCtrl', function ($scope, mvQuestion, $routeParams,mvJobSeeker,mvQuestionRepo, queryBulider,$translate, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.Questions = mvQuestion.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    var id = $routeParams.id;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvQuestion.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.Questions = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    
    $scope.deleteQuestion = function (Question) {
        console.log('delete');
        var langSkill = mvQuestion.get({ _id: Question._id },(function () {
            langSkill.Deleted = true;
            langSkill.DeletedBy = mvIdentity.currentUser;
        mvQuestionRepo.updateCurrentQuestion(langSkill).then(function () {
                mvNotifier.notify('Language Skill has been deleted!');
            $scope.getData();
        }, function (reason) {
            mvNotifier.error(reason);
            });
        }));


    };
});

angular.module('app').controller('mvjobQuestionCtrl', function ($scope, mvNotifier, mvQuestionRepo, mvQuestion, $routeParams, $translate, mvIdentity, $location, $rootScope) {
    var id = $routeParams.id;
    $scope.QuestionNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.AnswerText = "";
    $scope.selectedJobRole = {};
    $scope.QTypes = [{ "Value": "T", "Name": "Text" }, { "Value": "M", "Name": "Multi Answers" }, { "Value": "O", "Name": "One Answer" }];
    if(id)
    {
        $scope.Question = mvQuestion.get({_id:id },(function(){
            //$scope.Question.PeriodFrom = new Date($scope.Question.PeriodFrom);
            //$scope.Question.PeriodTo = new Date($scope.Question.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.Question = new mvQuestion();
        //console.log(mvIdentity.currentJobSeeker._id);
        $scope.Question.Deleted = false;
        $scope.Question.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


   

    $scope.lang = $scope.languages[0].value;




    $scope.update = function () {
        $scope.loop();
        mvQuestionRepo.updateCurrentQuestion($scope.Question).then(function () {
            mvNotifier.notify('Question has been updated!');
            $location.path('/updateJobSeeker/Questions/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

   

    $scope.add = function(){
       
        var question = { Title: $scope.Question.Title, Type: $scope.Question.Type.Value };
        if ($rootScope.vacancy.Questions == undefined)
            $rootScope.vacancy.Questions = [];

        $rootScope.vacancy.Questions.push(question);
    };

    $scope.addAnswer = function (question , button) {

        var btn = button.currentTarget;
        var parent = btn.parentElement;
        var tr = parent.parentElement;
        var childs = tr.children;
        var child = childs[2];
        var input = child.children;

        var answer = { "Answer": input.answer.value };
        if (question.Answers == undefined)
            question.Answers = [];

        question.Answers.push(answer);
    };

    $scope.loop = function(){

        var listItems = $("#QuestionNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#QuestionNameText2");
            $scope.QuestionNameText = input.val();
            $scope.saveQuestionName();

        });
    };

    $scope.delete = function (question) {

        var array = $rootScope.vacancy.Questions;
       
        $rootScope.vacancy.Questions.forEach(function (element) {
            if (element.Title == question.Title)
            {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });
        
    };

    $scope.deleteAnswer = function (question,answer) {

        var array = question.Answers;

        question.Answers.forEach(function (element) {
            if (element.Answer == answer.Answer) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

    };


    
});
angular.module('app').factory('mvQuestionRepo', function ($http, $q, mvQuestion,mvIdentity) {
    return {

        createQuestion: function (newQuestionData) {
            var newQuestion = new mvQuestion(newQuestionData);
            newQuestion.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Question");
            newQuestion.$save().then(function () {
                console.log("Question Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createQuestionAfterCreatingUser: function (newQuestionData) {
            var newQuestion = new mvQuestion(newQuestionData);
            var dfd = $q.defer();
            console.log("Saving Question");
            newQuestion.$save().then(function (Question) {
                console.log("Question Saved");
                mvIdentity.currentQuestion = Question;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentQuestion: function (newQuestionData) {
            newQuestionData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newQuestionData);
            angular.extend(clone,newQuestionData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvEmployer', function ($resource) {
    var EmployerResource = $resource('/api/employers/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return EmployerResource;
});
angular.module('app').factory('mvCachedEmployer', function (mvCourse) {
    var employerList;
    return {
        query: function () {
            if (!employerList) {
                employerList = mvEmployer.query();
            }
            return employerList;
        }
    };
});
angular.module('app').controller('mvEmployerDetailCtrl', function ($scope, mvEmployer, $routeParams) {
    $scope.employer = mvEmployer.get({_id: $routeParams.id});
});
angular.module('app').factory('mvEmployerRepo', function ($http, $q, mvEmployer,mvIdentity) {
    return {

        createEmployer: function (newEmployerData) {
            var newEmployer = new mvEmployer(newEmployerData);
            newEmployer.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Employer");
            newEmployer.$save().then(function () {
                console.log("Employer Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createEmployerAfterCreatingUser: function (newEmployerData) {
            var newEmployer = new mvEmployer(newEmployerData);
            var dfd = $q.defer();
            console.log("Saving Employer");
            newEmployer.$save().then(function (employer) {
                console.log("Employer Saved");
                mvIdentity.currentEmployer = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentEmployer: function (newEmployerData) {
            newEmployerData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newEmployerData);
            angular.extend(clone,newEmployerData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvEmployerCtrl', function ($scope, $http, $q, $window, mvNotifier, mvEmployerRepo, mvEmployer, $routeParams, $translate, $location, Upload, $timeout) {
    var id = $routeParams.id;
    $scope.employerNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.employer = mvEmployer.get({ _id: id }, (function () {
            if ($scope.employer.EmployerName) {
                for (var i = 0; i < $scope.employer.EmployerName.length; i++) {

                    if ($scope.employer.EmployerName[i].Lang == $scope.currentLang) {
                        $scope.employerNameText = $scope.employer.EmployerName[i].Text;
                        $scope.lang = $scope.employer.EmployerName[i].Lang;
                    }
                }
            }

            $scope.photoFile = $scope.employer.Photo;



            $.ajax({
                type: "GET",
                url: '/upload/' + $scope.employer.Photo,
                dataType: "image/gif",
                async: false,
                success: function (img) {
                    $scope.photoFile = img;
                },
                error: function (error, txtStatus) {
                    console.log(txtStatus);
                    console.log('error');
                }
            });


            $scope.photoName = $scope.employer.Photo; 
            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.employer = new mvEmployer();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.employer.Deleted = false;
    }

    $scope.getName = function (list, lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;

        if (list) {
            for (var i = 0; i < list.length; i++) {

                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };

    $scope.upload = function (file) {

        var dfd = $q.defer();

        Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                $scope.photoName = resp.data.file_name;;
                dfd.resolve();
            } else {
                mvNotifier.error('an error occured at upload photo');
                dfd.reject('an error occured at upload photo');

            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });

        return dfd.promise;

    };

    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' }];

    $scope.lang = $scope.languages[0].value;

    $scope.employerTypes = [{ value: 'D', text: 'Direct Employer' }, { value: 'S', text: 'Staffing Firm' }];

    $scope.employer.EmployerType = $scope.employerTypes[0].value;

    $scope.add = function () {

        if ($scope.employerForm.$valid && $scope.addEnabled) {

            $scope.loop();
            $scope.upload($scope.photoFile).then(function () {
                $scope.employer.Photo = $scope.photoName;
                mvEmployerRepo.createEmployer($scope.employer).then(function () {
                    mvNotifier.notify('New Employer Added!');
                    $scope.addEnabled = false;
                    $location.path('/employers');
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            });

        }

    };

    $scope.update = function () {

        if ($scope.employerForm.$valid) {

            $scope.loop();
            $scope.upload($scope.photoFile).then(function () {
                if ($scope.employer.Photo != $scope.photoName)
                {
                    $scope.employer.Photo = $scope.photoName;
                }

                mvEmployerRepo.updateCurrentEmployer($scope.employer).then(function () {
                    mvNotifier.notify('Employer has been updated!');
                    //$location.path('/employers');
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            });

        }
    };

    $scope.saveEmployerName = function () {

        var old = false;
        if ($scope.employer.EmployerName) {
            for (var i = 0; i < $scope.employer.EmployerName.length; i++) {
                var obj = $scope.employer.EmployerName[i];

                if ($scope.employer.EmployerName[i].Lang == $scope.lang) {
                    $scope.employer.EmployerName[i].Text = $scope.employerNameText;
                    old = true;
                }

            }
        }

        if (!old) {
            if (!$scope.employer.EmployerName) {
                $scope.employer.EmployerName = [];
            }
            var employerName = { "Lang": $scope.lang, "Text": $scope.employerNameText };
            $scope.employer.EmployerName.push(employerName);
        }
        $scope.employerNameText = "";
        $scope.lang = "";

    };

    $scope.updateEmployerName = function (employer) {
        $scope.lang = employer.Lang;
        $scope.employerNameText = employer.Text;
    };

    $scope.deleteEmployerName = function (employer) {

        for (var i = 0; i < $scope.employer.EmployerName.length; i++) {
            var obj = $scope.employer.EmployerName[i];
            console.log("Old" + obj.Lang);
            console.log("New " + employer.Lang);
            if (employer.Lang == obj.Lang) {
                $scope.employer.EmployerName.splice(i, 1);
                i--;
            }
        }
        /*
        var employerNames = $scope.employer.EmployerName;
        console.log(employerNames);
        employerNames.delete(employer);
        $scope.employer.EmployerName = employerNames;
        */


    };

    $scope.loop = function () {

        var listItems = $("#employerNames li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#EmployerNameText2");
            $scope.employerNameText = input.val();
            $scope.saveEmployerName();

        });
    };
});
angular.module('app').controller('mvEmployerListCtrl', function ($scope, mvEmployer,$translate, mvEmployerRepo, mvNotifier, queryBulider, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.employers = mvEmployer.query();
    ////$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'EmployerName', text: 'Sort by EmployerName'},
    
    //$scope.getName = function(list){
    //    for(var i = 0; i < list.length; i++) {

    //        if(list[i].Lang == $scope.currentLang) {
    //            return list[i].Text;
    //        }
    //    }
    //};

    //$scope.getLang = function(){
    //    return $translate.use();
    //};
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvEmployer.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.employers = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteEmployer = function (employer) {
        var ed = mvEmployer.get({ _id: employer._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvEmployerRepo.updateCurrentEmployer(ed).then(function () {
                mvNotifier.notify('Employer has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();
});

angular.module('app').factory('mvVacancy', function ($resource, mvIdentity) {
    var vacancyResource = $resource('/api/vacancies/:_id', { _id: '@id' }, {
        
        update: { method: 'PUT', isArray: false },
        getForDetail: {
            url: 'api/vacancies/getForDetail/:_id', method: 'GET', params: { _id: '@id' }
        },
        vacanciesSearchResult: {
            url: 'api/vacanciesSearchResult/', method: 'GET'
        },
        getForUpdate: {
            url: 'api/vacancies/getForUpdate/:_id', method: 'GET', params: { _id: '@id' }
        }
  
    });
    return vacancyResource;
});
angular.module('app').factory('mvCachedVacancy', function (mvCourse) {
    var vacancyList;
    return {
        query: function () {
            if (!vacancyList) {
                vacancyList = mvVacancy.query();
            }
            return vacancyList;
        }
    };
});
angular.module('app').controller('mvVacancyDetailCtrl', function ($scope, mvVacancy,
    $routeParams , queryBulider,
    mvApplicantRepo , mvNotifier , mvApplicant, mvIdentity) {
    $scope.vacancy = mvVacancy.getForDetail({ _id: $routeParams.id });
    $scope.isApplied = false;
    $scope.isJobSeeker = false;
    $scope.appliedMessage = "";
    if (mvIdentity.currentJobSeeker)
        $scope.isJobSeeker = true;
    if ($scope.isJobSeeker) {
        $scope.oldApplicant = mvApplicant.getVacancyForApplicant({ jobSeeker: mvIdentity.currentJobSeeker._id, vacancy: $routeParams.id },
            function(data, getResponseHeaders) {
                if (data.Vacancy) {
                    $scope.isApplied = true;
                    $scope.appliedMessage = "You Already Applied For this Job";
                }


            });
    }           
    $scope.apply = function () {
        $scope.applicant = new mvApplicant();
        $scope.applicant.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.applicant.Vacancy = $scope.vacancy._id;
        $scope.applicant.Status = "N";
        mvApplicantRepo.createApplicant($scope.applicant).then(function () {
            $scope.isApplied = true;
            $scope.appliedMessage = "You Already Applied For this Job";
            mvNotifier.notify('You Applied For This Job Sucssefully!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});
angular.module('app').factory('mvVacancyRepo', function ($http, $q, mvVacancy,mvIdentity) {
    return {

        createVacancy: function (newVacancyData) {
            var newVacancy = new mvVacancy(newVacancyData);
            newVacancy.CreatedBy = mvIdentity.currentUser;
            newVacancy.Employer = mvIdentity.currentEmployer;
            var dfd = $q.defer();
            console.log("Saving Vacancy");
            newVacancy.$save().then(function (newVancancy) {
                console.log("Vacancy Saved");
                dfd.resolve(newVancancy);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createEmployerAfterCreatingUser: function (newVacancyData) {
            var newVacancy = new mvVacancy(newVacancyData);
            var dfd = $q.defer();
            console.log("Saving Vacancy");
            newVacancy.$save().then(function () {
                console.log("Vacancy Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentVacancy: function (newVacancyData) {
            newVacancyData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newVacancyData);
            angular.extend(clone,newVacancyData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }, updateAllVacanciesCity: function (cityId) {
            
            $.ajax({
                type: "get",
                async: false,
                url: "/api/updateVacanciesCity/" + cityId,
                data: {},
                success: function (data) {
                    console.log(data);
                   
                },
                error: function (error) {
                    
                    console.log(error);
                },
                failure: function (response) {
                    alert(response.responseText);
                },
                beforeSend: function () {
                    
                },
                complete: function () {
                    
                  
                }
            });
        }, updateAllVacanciesArea: function (areaId) {
            
            $.ajax({
                type: "get",
                async: false,
                url: "/api/updateVacanciesArea/" + areaId,
                data: {},
                success: function (data) {
                    console.log(data);
                   
                },
                error: function (error) {
                    
                    console.log(error);
                },
                failure: function (response) {
                    alert(response.responseText);
                },
                beforeSend: function () {
                    
                },
                complete: function () {
                    
                  
                }
            });
        }
    };
});
angular.module('app').controller('mvVacancyCtrl', function ($scope, mvNotifier, mvVacancyRepo, $rootScope, mvVacancy, $routeParams, $translate, mvCity, mvCityRepo, mvArea, mvAreaRepo, mvIdentity, $location) {
    var id = $routeParams.id;
    $scope.identity = mvIdentity;
    $scope.addEnabled = false;
    var stepclass = "";
    var added = false;
    $scope.selectedJobRole = {};
    $scope.selectedIndustry = {};

    
    $scope.completed = function () {
        if (added)
            return true;
        return false;
    };
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.vacancy = mvVacancy.getForUpdate({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            $scope.vacancy.AvailableFrom = new Date($scope.vacancy.AvailableFrom);
            $scope.vacancy.AvailableTo = new Date($scope.vacancy.AvailableTo);
            $("#hfCityId").val($scope.vacancy.City._id);
            $("#hfAreaId").val($scope.vacancy.Area._id);
            $rootScope.vacancy = $scope.vacancy;
        }));


    } else {
        $scope.vacancy = new mvVacancy();
        $rootScope.vacancy = $scope.vacancy;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.vacancy.Deleted = false;
    }
    
    $scope.update = function () {
        if ($scope.vacancyForm.$valid) {
            $scope.vacancy.LanguageSkills = $rootScope.vacancy.LanguageSkills;
            createCity();
            createArea();
            if (validate()) {
                mvVacancyRepo.updateCurrentVacancy($scope.vacancy).then(function () {
                    mvNotifier.notify('Vacancy has been updated!');
                    added = true;
                    $scope.vacancy = mvVacancy.get({ _id: $scope.vacancy._id }, (function () {

                        $scope.vacancy.AvailableFrom = new Date($scope.vacancy.AvailableFrom);
                        $scope.vacancy.AvailableTo = new Date($scope.vacancy.AvailableTo);
                    }));
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            }
        }
    };
    
    
    $scope.getStep1Class = function () {
        
        if (mvIdentity.currentUser.isEmployer() || mvIdentity.currentUser.isAdmin())
            return "completed";
        else
            return "active";
    };
    
    $scope.getStep2Class = function () {
        
        if (mvIdentity.currentUser.isEmployer() || mvIdentity.currentUser.isAdmin())
            return "completed";
        else
            return "active";
    };
    
    
    $scope.getStep3Class = function () {
        
        if (mvIdentity.currentUser.isEmployer() && !$scope.completed() || mvIdentity.currentUser.isAdmin() && !$scope.completed())
            return "active";
        else
            return "completed";
    };
    
    
    $scope.getStep4Class = function () {
        
        if ($scope.completed())
            return "active";
        else
            return "";
    };
    
    

    $scope.add = function () {


        $scope.vacancy.LanguageSkills = $rootScope.vacancy.LanguageSkills;

        if ($scope.vacancyForm.$valid && $scope.addEnabled) {
            var cityPromise = createCity();
            if (cityPromise) {
                cityPromise.then(createArea().then(function () {

                    if (validate()) {
                        mvVacancyRepo.createVacancy($scope.vacancy).then(function (newVacancy) {
                            mvNotifier.notify('New Vacancy Added!');
                            added = true;
                            $scope.addEnabled = false;
                            
                            $scope.vacancy = mvVacancy.get({ _id: newVacancy._id }, (function () {

                                $scope.vacancy.AvailableFrom = new Date($scope.vacancy.AvailableFrom);
                                $scope.vacancy.AvailableTo = new Date($scope.vacancy.AvailableTo);
                            }));
                        }, function (reason) {
                            mvNotifier.error(reason);
                        });
                    }
                }))
                    ;

            }
            else
            {
                var areaPromise = createArea();
                if (areaPromise) {
                    createArea().then(function () {


                    });
                }
                else {
                    if (validate()) {
                        mvVacancyRepo.createVacancy($scope.vacancy).then(function (newVacancy) {
                            mvNotifier.notify('New Vacancy Added!');
                            added = true;
                            $scope.addEnabled = false;
                            
                            $scope.vacancy = mvVacancy.get({ _id: newVacancy._id }, (function () {

                                $scope.vacancy.AvailableFrom = new Date($scope.vacancy.AvailableFrom);
                                $scope.vacancy.AvailableTo = new Date($scope.vacancy.AvailableTo);
                            }));
                        }, function (reason) {
                            mvNotifier.error(reason);
                        });
                    }
                }
                
            }
            

            
            
        }
       
    };
    
    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/citiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {
                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedCity");
                        var offset = p.offset();
                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfCityId").val(i.item.id);
                $('#hfCityId').trigger('change');
                var p = $("#selectedCity");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
    
    
    $(function () {
        $("#areaName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/areasByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {
                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedCity");
                        var offset = p.offset();
                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfAreaId").val(i.item.id);
                $('#hfAreaId').trigger('change');
                var p = $("#selectedArea");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
    
    $('#hfCityId').change(function () {

    });
    
    function createCity() {
        var cityId = $("#hfCityId").val();
        var cityName = $("#cityName").val();
        if (!cityId && cityName !="") {
            if (cityName != '') {
                var city = new mvCity();
                city.Confirmed = false;
                city.Deleted = false;
                city.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var cityNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": cityName };
                    city.Name.push(cityNameObj);
                }
                return mvCityRepo.createCity(city).then(function (createdCity) {
                    mvNotifier.notify('New City Added!');
                    $scope.vacancy.City = createdCity._id;
                    $("#hfCityId").val(createdCity._id);
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            }
        }
        else {
            $scope.vacancy.City = cityId;
        }
    };
    

    function createArea() {
        var areaId = $("#hfAreaId").val();
        var areaName = $("#areaName").val();
        if (!areaId && areaName != "") {
            if (areaName != '') {
                var area = new mvArea();
                area.Confirmed = false;
                area.Deleted = false;
                area.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var areaNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": areaName };
                    area.Name.push(areaNameObj);
                }
                return mvAreaRepo.createArea(area).then(function (createdArea) {
                    mvNotifier.notify('New Area Added!');
                    $scope.vacancy.Area = createdArea._id;
                    $("#hfAreaId").val(createdArea._id);
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            }
        }
        else {
            $scope.vacancy.Area = areaId;
        }
    };


    function validate() {
        var flag = true;
        var cityId = $("#hfCityId").val();
        var areaId = $("#hfAreaId").val();

        var startDate = new Date($("#availableFrom").val());
        var endDate = new Date($("#availableTo").val());

        if (startDate.getTime() > endDate.getTime()) {
            mvNotifier.error("Available To Date is greater than Available From Date");
            flag = false;
        }

        var salaryFrom = new Date($("#salaryRangeFrom").val());
        var salaryTo = new Date($("#salaryRangeTo").val());

        if (salaryFrom > salaryTo) {
            mvNotifier.error("Salary From is greater than Salary To");
            flag = false;
        }

        if (!cityId) {
            mvNotifier.error("City is required");
            flag = false;
        }
        else if (!areaId) {
            mvNotifier.error("Area is required");
            flag = false;
        }

        return flag;


    };
    

    $scope.finish =  function finish() {
        $location.path('/vacancies');
    };

    $scope.puplish = function puplish() {

        $scope.vacancy.Puplished = true;
        mvVacancyRepo.updateCurrentVacancy($scope.vacancy).then(function () {
            mvNotifier.notify('Vacancy has been Puplished!');
            
            $location.path('/vacancies');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };


    $scope.addJobRole = function () {
        var flag = true;
        if ($scope.vacancy.JobRole == undefined)
            $scope.vacancy.JobRole = [];

        $scope.vacancy.JobRole.forEach(function (element) {
            if (element._id == $scope.selectedJobRole._id) {
                flag = false;
            }

        });
        if (flag) 
        $scope.vacancy.JobRole.push($scope.selectedJobRole);
    };


    $scope.addIndustry = function () {
        var flag = true;
        if ($scope.vacancy.Industry == undefined)
            $scope.vacancy.Industry = [];

        $scope.vacancy.Industry.forEach(function (element) {
            if (element._id == $scope.selectedIndustry._id) {
                flag = false;
                
            }


        });
        if(flag)
        $scope.vacancy.Industry.push($scope.selectedIndustry);
    };


    $scope.deleteIndustry = function (industry) {

        var array = $scope.vacancy.Industry;

        $scope.vacancy.Industry.forEach(function (element) {
            if (element == industry) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });
    };

        $scope.deleteJobRole = function (jobRole) {

            var array = $scope.vacancy.JobRole;

            $scope.vacancy.JobRole.forEach(function (element) {
                if (element == jobRole) {
                    var index = array.indexOf(element);
                    array.splice(index, 1);
                    //$rootScope.vacancy.Questions.remove(element);
                }

            });

    };

    
    
});
angular.module('app').controller('mvVacancyListCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo, mvNotifier,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.vacancies = mvVacancy.query();
    ////$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'VacancyName', text: 'Sort by VacancyName'},
    //    {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    //$scope.sortOrder = $scope.sortOptions[0].value;
    //$scope.getName = function(list){
    //    for(var i = 0; i < list.length; i++) {

    //        if(list[i].Lang == $scope.currentLang) {
    //            return list[i].Text;
    //        }
    //    }
    //};

    //$scope.getLang = function(){
    //    return $translate.use();
    //};
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteVacancy = function (vacancy) {
        var ed = mvVacancy.get({ _id: vacancy._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvVacancyRepo.updateCurrentVacancy(ed).then(function () {
                mvNotifier.notify('Vacancy has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();
});

angular.module('app').controller('mvVacancyByIndustryListCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo, mvNotifier, $translate, mvIdentity, $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    
    var id = $routeParams.industryId;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("Industry=='" + id + "'"),
            Industry: id,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    
    };
    
    $scope.deleteVacancy = function (vacancy) {
        var ed = mvVacancy.get({ _id: vacancy._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvVacancyRepo.updateCurrentVacancy(ed).then(function () {
                mvNotifier.notify('Vacancy has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();
});

angular.module('app').controller('mvVacanciesSearchResultCtrl', function ($scope, $translate, mvVacancy,
    mvVacancyRepo, queryBulider, mvNotifier, mvIdentity) {
    
    //to add new search in accordion 
    //1- add new accordion header and content at html  
    //   change name of the field ,in these blocks I use 'Industry' 
    //2- add list  like one at code #1    
    //3- add block like one at code #2
    //4- add block like one at code #3 
    //5- change name of the field in these blocks I use 'Industry' 
    //6- go to vacancies controller at server to change at function getVacanciesSearchResult
    
    $scope.currentUser = mvIdentity.currentUser;
    
    //start code #1
    var SelectedIndustries = [];
    var IndustriesHeaderFlag = false;
    //end code #1
    
    var SelectedCountries = [];
    var CountriesHeaderFlag = false;
    
    var SelectedCities = [];
    var CitiesHeaderFlag = false;
    
    var SelectedAreas = [];
    var AreasHeaderFlag = false;
    
    var SelectedJobRoles = [];
    var JobRolesHeaderFlag = false;
    
    var SelectedJobTypes = [];
    var JobTypesHeaderFlag = false;
    
    var SelectedEducationalLevels = [];
    var EducationalLevelsHeaderFlag = false;
    
    var SelectedCareerLevels = [];
    var CareerLevelsHeaderFlag = false;
    if (mvIdentity.currentJobSeeker)

        var jobSeekerId = null;
        if (mvIdentity.currentJobSeeker)
        jobSeekerId = mvIdentity.currentJobSeeker._id;
    debugger;
    if (!jobSeekerId)
        jobSeekerId = 0;

    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        
        var qr = '';

        // start code #2
        if (SelectedIndustries.length > 0) {
            var qrIndustry = '';
            
            if (SelectedIndustries[0].flag !== true) {
                for (var y = 0; y < SelectedIndustries.length; y++) {
                    if (SelectedIndustries[y].flag) {
                        qrIndustry += "Industry=='" + SelectedIndustries[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedIndustries.length; y++) {
                    qrIndustry += "Industry=='" + SelectedIndustries[y].id + "'||";
                }
            }
            
            if (qrIndustry.length > 0) {
                qr += '(' + qrIndustry.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        // end code #2
        
        //start country code #2
        if (SelectedCountries.length > 0) {
            var qrCountry = '';
            
            if (SelectedCountries[0].flag !== true) {
                for (var y = 0; y < SelectedCountries.length; y++) {
                    if (SelectedCountries[y].flag) {
                        qrCountry += "Country=='" + SelectedCountries[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedCountries.length; y++) {
                    qrCountry += "Country=='" + SelectedCountries[y].id + "'||";
                }
            }
            
            if (qrCountry.length > 0) {
                qr +=  '(' + qrCountry.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }                
        //end country code #2

        //start city code #2 
        if (SelectedCities.length > 0) {
            var qrCity = '';
            
            if (SelectedCities[0].flag !== true) {
                for (var y = 0; y < SelectedCities.length; y++) {
                    if (SelectedCities[y].flag) {
                        qrCity += "City=='" + SelectedCities[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedCities.length; y++) {
                    qrCity += "City=='" + SelectedCities[y].id + "'||";
                }
            }
            
            if (qrCity.length > 0) {
                qr += '(' + qrCity.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end city code #2
        
        //start area code #2 
        if (SelectedAreas.length > 0) {
            var qrArea = '';
            
            if (SelectedAreas[0].flag !== true) {
                for (var y = 0; y < SelectedAreas.length; y++) {
                    if (SelectedAreas[y].flag) {
                        qrArea += "Area=='" + SelectedAreas[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedAreas.length; y++) {
                    qrArea += "Area=='" + SelectedAreas[y].id + "'||";
                }
            }
            
            if (qrArea.length > 0) {
                qr += '(' + qrArea.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end area code #2
        
        
        //start job role code #2 
        if (SelectedJobRoles.length > 0) {
            var qrJobRole = '';
            
            if (SelectedJobRoles[0].flag !== true) {
                for (var y = 0; y < SelectedJobRoles.length; y++) {
                    if (SelectedJobRoles[y].flag) {
                        qrJobRole += "JobRole=='" + SelectedJobRoles[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedJobRoles.length; y++) {
                    qrJobRole += "JobRole=='" + SelectedJobRoles[y].id + "'||";
                }
            }
            
            if (qrJobRole.length > 0) {
                qr += '(' + qrJobRole.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end job role code #2
        
        
        //start job type code #2 
        if (SelectedJobTypes.length > 0) {
            var qrJobType = '';
            
            if (SelectedJobTypes[0].flag !== true) {
                for (var y = 0; y < SelectedJobTypes.length; y++) {
                    if (SelectedJobTypes[y].flag) {
                        qrJobType += "JobType=='" + SelectedJobTypes[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedJobTypes.length; y++) {
                    qrJobType += "JobType=='" + SelectedJobTypes[y].id + "'||";
                }
            }
            
            if (qrJobType.length > 0) {
                qr += '(' + qrJobType.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end job type code #2
        
        
        
        //start educational level code #2 
        if (SelectedEducationalLevels.length > 0) {
            var qrEducationalLevel = '';
            
            if (SelectedEducationalLevels[0].flag !== true) {
                for (var y = 0; y < SelectedEducationalLevels.length; y++) {
                    if (SelectedEducationalLevels[y].flag) {
                        qrEducationalLevel += "EducationalLevel=='" + SelectedEducationalLevels[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedEducationalLevels.length; y++) {
                    qrEducationalLevel += "EducationalLevel=='" + SelectedEducationalLevels[y].id + "'||";
                }
            }
            
            if (qrEducationalLevel.length > 0) {
                qr += '(' + qrEducationalLevel.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end educational level code #2
        
        
        //start career level code #2 
        if (SelectedCareerLevels.length > 0) {
            var qrCareerLevel = '';
            
            if (SelectedCareerLevels[0].flag !== true) {
                for (var y = 0; y < SelectedCareerLevels.length; y++) {
                    if (SelectedCareerLevels[y].flag) {
                        qrCareerLevel += "CareerLevel=='" + SelectedCareerLevels[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedCareerLevels.length; y++) {
                    qrCareerLevel += "CareerLevel=='" + SelectedCareerLevels[y].id + "'||";
                }
            }
            
            if (qrCareerLevel.length > 0) {
                qr += '(' + qrCareerLevel.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end career level code #2
        
        
        
        


        
        if (qr.length > 0) { qr = '!Deleted&&(' + qr.slice(0, -2) + ')'; } else { qr = '!Deleted'; }
        debugger;
        mvVacancy.query({
            query: queryBulider.qb(qr),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize,
            jobSeeker: jobSeekerId,
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.getData();

    var addCheckBoxToDiv = function(id, lab, flag, name, selectedList) {
        var flg = true;
        for (var y = 0; y < selectedList.length; y++) {
            if (selectedList[y].id == id) {
                flg = false;
                break;
            }
        }
        if (flg) {
            selectedList.push({ 'id': id, 'flag': flag });
            var div = document.getElementById(name + 'Div');
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = name;
            checkbox.value = id;
            checkbox.id = id;
            checkbox.checked = flag;

            var label = document.createElement('label');
            label.htmlFor = "id";
            label.appendChild(document.createTextNode(lab));

            var br = document.createElement("br");

            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(br);            
            
            
            checkbox.addEventListener('change', function(event) {

                var name = checkbox.name;
                var checkboxes = document.getElementsByName(name); //checkbox items                                          

                //uncheck all check boxes when check select all 
                if (checkbox.id == 0) {
                    if ($(this).is(":checked")) {
                        for (i = 1; i < checkboxes.length; i++) {
                            checkboxes[i].checked = false;
                        }
                    } else {
                        checkboxes[0].checked = true;
                    }
                } else {
                    if ($(this).is(":checked")) {
                        checkboxes[0].checked = false;
                    }
                }

                //check "select all" if all checkbox items are checked                
                //if ($('input[name="' + name + '"]:checked').length == checkboxes.length - 1) {
                //    checkboxes[0].checked = true; //change "select all" checked status to true
                //    for (i = 1; i < checkboxes.length; i++) {
                //        checkboxes[i].checked = false;
                //    }
                //}

                //check "select all" if all checkbox items are unchecked                
                if ($('input[name="' + name + '"]:not(:checked)').not(":eq(0)").length == checkboxes.length - 1) {
                    checkboxes[0].checked = true; //change "select all" checked status to true
                }

                for (i = 0; i < checkboxes.length; i++) {
                    $.each(selectedList, function() {
                        if (this.id == checkboxes[i].id) {
                            this.flag = checkboxes[i].checked;
                        }
                    });
                }

                $scope.getData();

            });

        }
    };
    
    
    // start code #3
    var IndustriesHeaderClickFunction = function () {
        if (IndustriesHeaderFlag) {
            IndustriesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "Industry", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'industries', SelectedIndustries);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'industries', SelectedIndustries);
                    });
                }
            });

            IndustriesHeaderFlag = true;
        }
    }
    $("#industriesHeader").click(IndustriesHeaderClickFunction);    
    $(function () {
        $("#industryName").autocomplete({
            source: function (request, response) {
                $scope.SelectedIndustries = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "Industry", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'industries', SelectedIndustries);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //end code #3
    
    //start country code #3
    var CountriesHeaderClickFunction = function () {
        if (CountriesHeaderFlag) {
            CountriesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "Country", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'countries', SelectedCountries);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'countries', SelectedCountries);
                    });
                }
            });

            CountriesHeaderFlag = true;
        }
    }
    $("#countriesHeader").click(CountriesHeaderClickFunction);    
    $(function () {
        $("#countryName").autocomplete({
            source: function (request, response) {
                $scope.SelectedCountries = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "Country", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'countries', SelectedCountries);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start country code #3
    

    //start city code #3
    var citiesHeaderClickFunction = function () {
        if (CitiesHeaderFlag) {
            CitiesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "City", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'cities', SelectedCities);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'cities', SelectedCities);
                    });
                }
            });

            CitiesHeaderFlag = true;
        }
    }
    $("#citiesHeader").click(citiesHeaderClickFunction);    
    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $scope.SelectedCities = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "City", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'cities', SelectedCities);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start city code #3
    
    //start area code #3
    var AreasHeaderClickFunction = function () {
        if (AreasHeaderFlag) {
            AreasHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "Area", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'areas', SelectedAreas);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'areas', SelectedAreas);
                    });
                }
            });

            AreasHeaderFlag = true;
        }
    }
    $("#areasHeader").click(AreasHeaderClickFunction);    
    $(function () {
        $("#areaName").autocomplete({
            source: function (request, response) {
                $scope.SelectedAreas = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "Area", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'areas', SelectedAreas);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start area code #3    
    
    //start job role code #3
    var JobRolesHeaderClickFunction = function () {
        if (JobRolesHeaderFlag) {
            JobRolesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "JobRole", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'jobRoles', SelectedJobRoles);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'jobRoles', SelectedJobRoles);
                    });
                }
            });

            JobRolesHeaderFlag = true;
        }
    }     
    $("#jobRolesHeader").click(JobRolesHeaderClickFunction);    
    $(function () {
        $("#jobRoleName").autocomplete({
            source: function (request, response) {
                $scope.SelectedJobRoles = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "JobRole", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'jobRoles', SelectedJobRoles);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start job role code #3    
    
    //start job type code #3
    var JobTypesHeaderClickFunction = function () {
        if (JobTypesHeaderFlag) {
            JobTypesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "JobType", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'jobTypes', SelectedJobTypes);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'jobTypes', SelectedJobTypes);
                    });
                }
            });

            JobTypesHeaderFlag = true;
        }
    }
    $("#jobTypesHeader").click(JobTypesHeaderClickFunction);    
    $(function () {
        $("#jobTypeName").autocomplete({
            source: function (request, response) {
                $scope.SelectedJobTypes = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "JobType", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'jobTypes', SelectedJobTypes);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start job type code #3    
        
    //start educational level code #3
    var EducationalLevelsHeaderClickFunction = function () {
        if (EducationalLevelsHeaderFlag) {
            EducationalLevelsHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "EducationalLevel", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'educationalLevels', SelectedEducationalLevels);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'educationalLevels', SelectedEducationalLevels);
                    });
                }
            });

            EducationalLevelsHeaderFlag = true;
        }
    }
    $("#educationalLevelsHeader").click(EducationalLevelsHeaderClickFunction);    
    $(function () {
        $("#educationalLevelName").autocomplete({
            source: function (request, response) {
                $scope.SelectedEducationalLevels = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "EducationalLevel", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'educationalLevels', SelectedEducationalLevels);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start educational level code #3    
    
    //start career level code #3
    var CareerLevelsHeaderClickFunction = function () {
        if (CareerLevelsHeaderFlag) {
            CareerLevelsHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "CareerLevel", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'careerLevels', SelectedCareerLevels);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'careerLevels', SelectedCareerLevels);
                    });
                }
            });

            CareerLevelsHeaderFlag = true;
        }
    }
    $("#careerLevelsHeader").click(CareerLevelsHeaderClickFunction);    
    $(function () {
        $("#careerLevelName").autocomplete({
            source: function (request, response) {
                $scope.SelectedCareerLevels = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "CareerLevel", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {                        
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'careerLevels', SelectedCareerLevels);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start career level code #3    

    
        
    
    //// accordions start
    
    var headers = $('#accordion1 .accordion-header');
    var contentAreas = $('#accordion1 .ui-accordion-content').show();
    var expandLink = $('.accordion-expand-all');
    
    // add the accordion functionality
    headers.click(function () {
        var panel = $(this).next();
        var isOpen = panel.is(':visible');
        
        // open or close as necessary
        panel[isOpen? 'slideUp': 'slideDown']()
        // trigger the correct custom event
        .trigger(isOpen? 'hide': 'show');
        
        // stop the link from causing a pagescroll
        return false;
    });
    
    // hook up the expand/collapse all
    expandLink.click(function () {
        var isAllOpen = $(this).data('isAllOpen');
        
        contentAreas[isAllOpen? 'hide': 'show']().trigger(isAllOpen? 'hide': 'show');
    });
    
    // when panels open or close, check to see if they're all open
    contentAreas.on({
        // whenever we open a panel, check to see if they're all open
        // if all open, swap the button to collapser
        show: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (isAllOpen) {
                expandLink.text('Collapse All').data('isAllOpen', true);
            }
        },
        // whenever we close a panel, check to see if they're all open
        // if not all open, swap the button to expander
        hide: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (!isAllOpen) {
                expandLink.text('Expand all').data('isAllOpen', false);
            }
        }
    });
    //// accordions end


    $(function () {
        //IndustriesHeaderClickFunction();
        CountriesHeaderClickFunction();
        citiesHeaderClickFunction();
        AreasHeaderClickFunction();
        //JobRolesHeaderClickFunction();
        JobTypesHeaderClickFunction();
        EducationalLevelsHeaderClickFunction();
        CareerLevelsHeaderClickFunction();
    });

});

angular.module('app').factory('mvIndustry', function ($resource,mvIdentity) {
    var IndustryResource = $resource('/api/industries/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return IndustryResource;
});
angular.module('app').factory('mvCachedIndustry', function (mvCourse) {
    var industryList;
    return {
        query: function () {
            if (!industryList) {
                industryList = mvIndustry.query();
            }
            return industryList;
        }
    };
});
angular.module('app').controller('mvIndustryDetailCtrl', function ($scope, mvIndustry, $routeParams) {
    $scope.industry = mvIndustry.get({_id: $routeParams.id});
});
angular.module('app').factory('mvIndustryRepo', function ($http, $q, mvIndustry,mvIdentity) {
    return {

        createIndustry: function (newIndustryData) {

            var newIndustry = new mvIndustry(newIndustryData);
            newIndustry.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Industry");
            newIndustry.$save().then(function () {
                console.log("Industry Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentIndustry: function (newIndustryData) {
            newIndustryData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newIndustryData);
            angular.extend(clone,newIndustryData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvIndustryCtrl', function ($scope, $location,  mvNotifier, mvIndustryRepo,mvIndustry,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.industry = mvIndustry.get({_id:id },(function(){
        if($scope.industry.Name) {
            for (var i = 0; i < $scope.industry.Name.length; i++) {

                if ($scope.industry.Name[i].Lang == $scope.currentLang) {
                    $scope.nameText = $scope.industry.Name[i].Text;
                    $scope.lang = $scope.industry.Name[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.industry = new mvIndustry();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.industry.Deleted = false;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'},
        {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {
        if ($scope.industryForm.$valid) {

            $scope.loop();
            mvIndustryRepo.updateCurrentIndustry($scope.industry).then(function () {
                mvNotifier.notify('Industry has been updated!');
                $location.path('/industries/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }

    };

    $scope.add = function () {
        if ($scope.industryForm.$valid && $scope.addEnabled) {

            $scope.loop();
            mvIndustryRepo.createIndustry($scope.industry).then(function () {
                mvNotifier.notify('New Industry Added!');
                $scope.addEnabled = false;
                $location.path('/industries/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.loop = function(){

        var listItems = $("#names li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();

        });
    };

   $scope.saveName = function () {

        var old = false;
        if($scope.industry.Name) {
            for (var i = 0; i < $scope.industry.Name.length; i++) {
                var obj = $scope.industry.Name[i];

                if ($scope.industry.Name[i].Lang == $scope.lang) {
                    $scope.industry.Name[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.industry.Name)
            {
                $scope.industry.Name = [];
            }
            var name = {"Lang": $scope.lang, "Text": $scope.nameText};
            $scope.industry.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (industry) {
      $scope.lang = industry.Lang;
      $scope.nameText = industry.Text;
    };

    $scope.deleteName = function (industry) {

        for(var i = 0; i < $scope.industry.Name.length; i++) {
            var obj = $scope.industry.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + industry.Lang);
            if(industry.Lang == obj.Lang) {
                $scope.industry.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var names = $scope.industry.Name;
        console.log(names);
        names.delete(industry);
        $scope.industry.Name = names;



    };*/


});
angular.module('app').controller('mvIndustryListCtrl', function ($scope, mvIndustry,$translate, mvIdentity, mvIndustryRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvIndustry.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.industries = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteIndustry = function (industry) {
        var ed = mvIndustry.get({ _id: industry._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvIndustryRepo.updateCurrentIndustry(ed).then(function () {
                mvNotifier.notify('Industry has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvJobType', function ($resource) {
    var jobTypeResource = $resource('/api/jobTypes/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return jobTypeResource;
});
angular.module('app').factory('mvCachedJobType', function (mvCourse) {
    var jobTypeList;
    return {
        query: function () {
            if (!jobTypeList) {
                jobTypeList = mvJobType.query();
            }
            return jobTypeList;
        }
    };
});
angular.module('app').controller('mvJobTypeDetailCtrl', function ($scope, mvJobType, $routeParams) {
    $scope.jobType = mvJobType.get({_id: $routeParams.id});
});
angular.module('app').controller('mvJobTypeCtrl', function ($scope, mvNotifier, mvJobTypeRepo, mvJobType, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.jobType = mvJobType.get({ _id: id }, (function () {
            if ($scope.jobType.Name) {
                for (var i = 0; i < $scope.jobType.Name.length; i++) {
                    
                    if ($scope.jobType.Name[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.jobType.Name[i].Text;
                        $scope.lang = $scope.jobType.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.jobType = new mvJobType();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.jobType.Deleted = false;
    }
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;
        
        if (list) {
            for (var i = 0; i < list.length; i++) {
                
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' }
        ];
    
    $scope.lang = $scope.languages[0].value;
    
    
    $scope.update = function () {
        //if ($scope.jobTypeForm.$valid) {
            
            $scope.loop();
            mvJobTypeRepo.updateCurrentJobType($scope.jobType).then(function () {
                mvNotifier.notify('JobType has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}

    };
    
    $scope.add = function () {
        //if ($scope.jobTypeForm.$valid && $scope.addEnabled) {
            
            $scope.loop();
            
            mvJobTypeRepo.createJobType($scope.jobType).then(function () {
                mvNotifier.notify('New JobType Added!');
                console.log("jj");
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.loop = function () {
        
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.descriptionText = input.val();
            $scope.saveName();

        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.jobType.Name) {
            for (var i = 0; i < $scope.jobType.Name.length; i++) {
                var obj = $scope.jobType.Name[i];
                
                if ($scope.jobType.Name[i].Lang == $scope.lang) {
                    $scope.jobType.Name[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }
        
        if (!old) {
            if (!$scope.jobType.Name) {
                $scope.jobType.Name = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.jobType.Name.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (jobType) {
      $scope.lang = jobType.Lang;
      $scope.descriptionText = jobType.Text;
    };

    $scope.deleteName = function (jobType) {

        for(var i = 0; i < $scope.jobType.Name.length; i++) {
            var obj = $scope.jobType.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + jobType.Lang);
            if(jobType.Lang == obj.Lang) {
                $scope.jobType.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.jobType.Name;
        console.log(descriptions);
        descriptions.delete(jobType);
        $scope.jobType.Name = descriptions;



    };*/


});
angular.module('app').controller('mvJobTypeListCtrl', function ($scope, mvJobType,$translate, mvJobTypeRepo, queryBulider, mvNotifier,$rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvJobType.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.jobTypes = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteJobType = function (jobType) {
        var ed = mvJobType.get({ _id: jobType._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvJobTypeRepo.updateCurrentJobType(ed).then(function () {
                mvNotifier.notify('JobType has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvJobTypeRepo', function ($http, $q, mvJobType,mvIdentity) {
    return {

        createJobType: function (newJobTypeData) {

            var newJobType = new mvJobType(newJobTypeData);
            newJobType.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving JobType");
            newJobType.$save().then(function () {
                console.log("JobType Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentJobType: function (newJobTypeData) {
            newJobTypeData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newJobTypeData);
            angular.extend(clone,newJobTypeData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvJobRole', function ($resource) {
    var jobRoleResource = $resource('/api/jobRoles/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return jobRoleResource;
});
angular.module('app').factory('mvCachedJobRole', function (mvCourse) {
    var jobRoleList;
    return {
        query: function () {
            if (!jobRoleList) {
                jobRoleList = mvJobRole.query();
            }
            return jobRoleList;
        }
    };
});
angular.module('app').controller('mvJobRoleDetailCtrl', function ($scope, mvJobRole, $routeParams) {
    $scope.jobRole = mvJobRole.get({_id: $routeParams.id});
});
angular.module('app').controller('mvJobRoleCtrl', function ($scope, mvNotifier, mvJobRoleRepo, mvJobRole, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.jobRole = mvJobRole.get({ _id: id }, (function () {
            if ($scope.jobRole.Name) {
                for (var i = 0; i < $scope.jobRole.Name.length; i++) {
                    
                    if ($scope.jobRole.Name[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.jobRole.Name[i].Text;
                        $scope.lang = $scope.jobRole.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.jobRole = new mvJobRole();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.jobRole.Deleted = false;
    }
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;
        
        if (list) {
            for (var i = 0; i < list.length; i++) {
                
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];
    
    $scope.lang = $scope.languages[0].value;
    
    
    $scope.update = function () {
        //if ($scope.jobRoleForm.$valid) {
            
            $scope.loop();
            mvJobRoleRepo.updateCurrentJobRole($scope.jobRole).then(function () {
                mvNotifier.notify('JobRole has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}

    };
    
    $scope.add = function () {
        //if ($scope.jobRoleForm.$valid && $scope.addEnabled) {
            
            $scope.loop();
            
            mvJobRoleRepo.createJobRole($scope.jobRole).then(function () {
                mvNotifier.notify('New JobRole Added!');
                console.log("jj");
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.loop = function () {
        
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.descriptionText = input.val();
            $scope.saveName();

        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.jobRole.Name) {
            for (var i = 0; i < $scope.jobRole.Name.length; i++) {
                var obj = $scope.jobRole.Name[i];
                
                if ($scope.jobRole.Name[i].Lang == $scope.lang) {
                    $scope.jobRole.Name[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }
        
        if (!old) {
            if (!$scope.jobRole.Name) {
                $scope.jobRole.Name = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.jobRole.Name.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (jobRole) {
      $scope.lang = jobRole.Lang;
      $scope.descriptionText = jobRole.Text;
    };

    $scope.deleteName = function (jobRole) {

        for(var i = 0; i < $scope.jobRole.Name.length; i++) {
            var obj = $scope.jobRole.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + jobRole.Lang);
            if(jobRole.Lang == obj.Lang) {
                $scope.jobRole.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.jobRole.Name;
        console.log(descriptions);
        descriptions.delete(jobRole);
        $scope.jobRole.Name = descriptions;



    };*/


});
angular.module('app').controller('mvJobRoleListCtrl', function ($scope, mvJobRole,$translate, mvJobRoleRepo, queryBulider, mvNotifier,$rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvJobRole.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.jobRoles = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteJobRole = function (jobRole) {
        var ed = mvJobRole.get({ _id: jobRole._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvJobRoleRepo.updateCurrentJobRole(ed).then(function () {
                mvNotifier.notify('JobRole has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvJobRoleRepo', function ($http, $q, mvJobRole,mvIdentity) {
    return {

        createJobRole: function (newJobRoleData) {

            var newJobRole = new mvJobRole(newJobRoleData);
            newJobRole.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving JobRole");
            newJobRole.$save().then(function () {
                console.log("JobRole Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentJobRole: function (newJobRoleData) {
            newJobRoleData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newJobRoleData);
            angular.extend(clone,newJobRoleData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCategory', function ($resource) {
    var categoryResource = $resource('/api/categories/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return categoryResource;
});
angular.module('app').factory('mvCachedCategory', function (mvCategory) {
    var categoryList;
    return {
        query: function () {
            if (!categoryList) {
                categoryList = mvCategory.query();
            }
            return categoryList;
        }
    };
});
angular.module('app').controller('mvCategoryDetailCtrl', function ($scope, mvCategory, $routeParams) {
    $scope.category = mvCategory.get({_id: $routeParams.id});
});
angular.module('app').factory('mvCategoryRepo', function ($http, $q, mvCategory,mvIdentity) {
    return {

        createCategory: function (newCategoryData) {

            var newCategory = new mvCategory(newCategoryData);
            newCategory.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Category");
            newCategory.$save().then(function () {
                console.log("Category Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCategory: function (newCategoryData) {
            newCategoryData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCategoryData);
            angular.extend(clone,newCategoryData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvCategoryCtrl', function ($scope, mvNotifier, mvCategoryRepo, mvCategory, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    
    if (id) {
        $scope.category = mvCategory.get({ _id: id }, (function () {
            if ($scope.category.Name) {
                for (var i = 0; i < $scope.category.Name.length; i++) {                    
                    if ($scope.category.Name[i].Lang == $scope.currentLang) {
                        $scope.nameText = $scope.category.Name[i].Text;
                        $scope.lang = $scope.category.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.category = new mvCategory();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
   
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];
    
    $scope.lang = $scope.languages[0].value;
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;
        
        if (list) {
            for (var i = 0; i < list.length; i++) {
                
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };       
    
    $scope.update = function () {
        $scope.loop();
        mvCategoryRepo.updateCurrentCategory($scope.category).then(function () {
            mvNotifier.notify('Category has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.add = function () {
        $scope.loop();
        mvCategoryRepo.createCategory($scope.category).then(function () {
            mvNotifier.notify('New Category Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.loop = function () {        
        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText");
            $scope.nameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {        
        var old = false;
        if ($scope.category.Name) {
            for (var i = 0; i < $scope.category.Name.length; i++) {                
                if ($scope.category.Name[i].Lang == $scope.lang) {
                    $scope.category.Name[i].Text = $scope.nameText;
                    old = true;
                }
            }
        }
        
        if (!old) {
            if (!$scope.category.Name) {
                $scope.category.Name = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.category.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };

});
angular.module('app').controller('mvCategoryListCtrl', function ($scope, mvCategory,$translate, $rootScope) {

    $scope.categories = mvCategory.query();
    $scope.sortOptions = [{value: 'Name', text: 'Sort by Name'}];

    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getName = function(list){
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == $scope.currentLang) {
                return list[i].Text;
            }
        }
    };

    $scope.getLang = function(){
        return $translate.use();
    };
});

angular.module('app').factory('mvJobSeeker', function ($resource) {
    var jobSeekerResource = $resource('/api/jobSeekers/:_id', { _id: '@id' },{
        update: { method: 'PUT', isArray: false }
    });
    return jobSeekerResource;
});
angular.module('app').factory('mvCachedJobSeeker', function (mvJobSeeker) {
    var jobSeekerList;
    return {
        query: function () {
            if (!jobSeekerList) {
                jobSeekerList = mvJobSeeker.query();
            }
            return jobSeekerList;
        }
    };
});
angular.module('app').controller('mvJobSeekerDetailCtrl', function ($scope, mvJobSeeker,
    $routeParams, $translate) {
    $scope.currentLang = $translate.use();
    $scope.jobSeeker = mvJobSeeker.get({ _id: $routeParams.id });

    $scope.showContactInformation = false;

    $scope.showContactInformationFunction = function () {
        $scope.showContactInformation = true;
    };
});
angular.module('app').factory('mvJobSeekerRepo', function ($http, $q, mvJobSeeker, mvIdentity, $rootScope) {
    return {
        
        createJobSeeker: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            newJobSeeker.CreatedBy = mvIdentity.currentUser;
            //if ($rootScope.AddressId) {
            //    newJobSeeker.Address = $rootScope.AddressId;
            //    $rootScope.AddressId = undefined;
            //}          
            var dfd = $q.defer();
            newJobSeeker.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        createJobSeekerAfterCreatingUser: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            var dfd = $q.defer();
            newJobSeeker.$save().then(function (jobSeeker) {
                mvIdentity.currentJobSeeker = jobSeeker;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        updateCurrentJobSeeker: function (newJobSeekerData) {
            newJobSeekerData.ModifiedBy = mvIdentity.currentUser;
            //if ($rootScope.AddressId) {
            //    newJobSeekerData.Address += $rootScope.AddressId;
            //    $rootScope.AddressId = undefined;
            //}       
            var dfd = $q.defer();
            var clone = angular.copy(newJobSeekerData);
            angular.extend(clone, newJobSeekerData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }, updateAllJobSeekersUnivirsty: function (areaId) {
            
            $.ajax({
                type: "get",
                async: false,
                url: "/api/updateJobSeekersUnivirsty/" + areaId,
                data: {},
                success: function (data) {
                    console.log(data);
    
                },
                error: function (error) {
                    
                    console.log(error);
                },
                failure: function (response) {
                    alert(response.responseText);
                },
                beforeSend: function () {
    
                },
                complete: function () {
    
    
                }
            });
        }
    
    
    };
});
angular.module('app').controller('mvJobSeekerCtrl', function ($scope, $routeParams, mvIdentity, mvJobSeeker, $rootScope) {
    debugger;
    $scope.identity = mvIdentity;
    var id = $routeParams.id;
    var tabName = $routeParams.tab;
    $scope.activeTab = 1;
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.init0 = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id });
        }
    };

    switch (tabName) {
        case 'PersonalInformation':
            $scope.activeTab = 0;
            $scope.init0();
            break;
        case 'EducationalInformation':
            $scope.activeTab = 1;
            break;
        case 'ContactInformation':
            $scope.activeTab = 2;
            $scope.init0();
            break;
        case 'Experiances':
            $scope.activeTab = 3;
            break;
        case 'Adresses':
            $scope.activeTab = 4;
            break;
        case 'Courses':
            $scope.activeTab = 5;
            break;
        case 'LanguageSkills':
            $scope.activeTab = 6;
            break;
        case 'Skills':
            $scope.activeTab = 7;           
            break;
        case 'JobPreferences':
            $scope.activeTab = 8;
            $scope.init0();
            break;
    }
    var added = false;

    $scope.completed = function () {
        if (added)
            return true;
        return false;
    };
    $scope.getStep1Class = function () {
        debugger;
        if (mvIdentity.currentUser.isEmployer() || mvIdentity.currentUser.isAdmin())
            return "completed";
        else
            return "active";
    };
    
    $scope.getStep2Class = function () {
        if (mvIdentity.currentUser.isEmployer() || mvIdentity.currentUser.isAdmin())
            return "completed";
        else
            return "active";
    };
    
    
    $scope.getStep3Class = function () {
        if (mvIdentity.currentUser.isEmployer() && !$scope.completed() || mvIdentity.currentUser.isAdmin() && !$scope.completed())
            return "active";
        else
            return "completed";
    };
    
    
    $scope.getStep4Class = function () {
        if ($scope.completed())
            return "active";
        else
            return "";
    };
    
             
});
angular.module('app').controller('mvJobSeekerListCtrl', function ($scope, mvJobSeeker, mvJobSeekerRepo, queryBulider, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.jobSeekers = mvJobSeeker.query();
    //console.log($scope.jobSeekers);
    //$scope.sortOptions = [{value: 'BirthDate', text: 'Sort by Birth Date'},
    //    {value: 'Gender', text: 'Sort by Gender'}];
    //$scope.sortOrder = $scope.sortOptions[0].value;
    

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvJobSeeker.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.jobSeekers = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteJobSeeker = function (jobSeeker) {
        var ed = mvJobSeeker.get({ _id: jobSeeker._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvJobSeekerRepo.updateCurrentJobSeeker(ed).then(function () {
                mvNotifier.notify('JobSeeker has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();
    
});

angular.module('app').controller('mvJobSeekerPersonalInformationCtrl'
    , function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, mvGender, $routeParams, $rootScope) {
    
    var id = $routeParams.id;
    $scope.addEnabled = false;
    
    if (id) {
        $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            
            $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            
        }));
    } else {
        $rootScope.jobSeeker = new mvJobSeeker();
        
        $rootScope.jobSeeker.Confirmed = false;
        $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        
    }
    
    $scope.update = function () {
        if ($scope.jobSeekerForm.$valid) {
            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($rootScope.jobSeekerForm.$valid && $scope.addEnabled) {
            mvJobSeekerRepo.createJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('New JobSeeker Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});
angular.module('app').controller('mvJobSeekerContactInformationCtrl', function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, $routeParams, $rootScope) {
    
    var id = $routeParams.id;
    
    $scope.genders = [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
    ];
    
    $scope.addEnabled = false;
    $scope.IsMobileInserted = false;
    // $rootScope.jobSeekers = mvJobSeeker.query();
    if (id) {
         $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function() {
            $scope.updateMode = true;
            $scope.addMode = false;
            $scope.IsMobileInserted = true;
             $rootScope.jobSeeker.MobileNo =  $rootScope.jobSeeker.MobileNo;
             $rootScope.jobSeeker.Email =  $rootScope.jobSeeker.Email;
           
                //if ( $rootScope.jobSeeker.MobileNo == null ||  $rootScope.jobSeeker.MobileNo == "" ||  $rootScope.jobSeeker.Email == null ||  $rootScope.jobSeeker.Email == "") {
                //    $scope.IsMobileInserted = false;
                //}
                
          
            // $rootScope.jobSeeker.BirthDate = new Date( $rootScope.jobSeeker.BirthDate);
            //if (! $rootScope.jobSeeker.Gender) {
            //     $rootScope.jobSeeker.Gender = $scope.genders[0].value;
            //}
        }));
    } else {
        //$http.get('/api/getJobSeekerWhereMobileNumberNotNull').then(function(res) {
            //if (res.data.length > 0) {
                //mvNotifier.notify('This link is expired please make another link');
        //$location.path('/forget');
        
         $rootScope.jobSeeker = new mvJobSeeker();
         $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        //$.ajax({
        //    url: "api/getJobSeekerWhereMobileNumberNotNull",
        //    dataType: 'json',
        //    async: false,
        //    success: function (data) {
        //        if (data) {
               
        //             $rootScope.jobSeeker = new mvJobSeeker();
        //            // $rootScope.jobSeeker.Gender = $scope.genders[0].value;
        //            $scope.IsMobileInserted = true;
        //            $scope.updateMode = false;
        //            $scope.addMode = true;
        //            $scope.addEnabled = false;
        //        } 
        //    },
        //    error: function (err) {
        //         $rootScope.jobSeeker = new mvJobSeeker();
        //        // $rootScope.jobSeeker.Gender = $scope.genders[0].value;
        //        $scope.IsMobileInserted = false;
        //        $scope.updateMode = false;
        //        $scope.addMode = true;
        //        $scope.addEnabled = true;
        //  }
        //});
               
            //}
        //});
    }
    // $rootScope.jobSeeker = mvJobSeeker.get({ MobileNumber: "" }, (function() {
        //    if (! $rootScope.jobSeekers.lenght > 0) {
              
        //    }

        //}));
    
    $scope.update = function () {
        if ( $scope.jobSeekerForm.$valid) {
            mvJobSeekerRepo.updateCurrentJobSeeker( $rootScope.jobSeeker).then(function () {
                //$scope.IsMobileInserted = true;
                mvNotifier.notify('JobSeeker has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        } 
    };
    
    $scope.add = function () {
        if ($scope.jobSeekerForm.$valid && $scope.addEnabled) {
            $scope.addEnabled = false;
            mvJobSeekerRepo.createJobSeeker( $rootScope.jobSeeker).then(function () {
                
                mvNotifier.notify('New Contact Added!'); 
                //$scope.IsMobileInserted = true;    
                //var u = $rootScope.AddressId;
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});
angular.module('app').controller('mvJobSeekerJobPreferencesCtrl'
    , function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, mvGender, $routeParams, $rootScope) {
    
    var id = $routeParams.id;
    $scope.addEnabled = false;
    
    if (id) {
        $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;            
        }));
    } else {
         $rootScope.jobSeeker = new mvJobSeeker();
        
         $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
    
    $scope.update = function () {
        if ($scope.jobSeekerForm.$valid) {
            mvJobSeekerRepo.updateCurrentJobSeeker( $rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.jobSeekerForm.$valid && $scope.addEnabled) {
            mvJobSeekerRepo.createJobSeeker( $rootScope.jobSeeker).then(function () {
                mvNotifier.notify('New JobSeeker Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});
angular.module('app').factory('mvInnerPage', function ($resource,mvIdentity) {
    var InnerPageResource = $resource('/api/innerPages/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return InnerPageResource;
});
angular.module('app').factory('mvCachedInnerPage', function (mvInnperPage) {
    var innerPageList;
    return {
        query: function () {
            if (!innerPageList) {
                innerPageList = mvInnperPage.query();
            }
            return innerPageList;
        }
    };
});
angular.module('app').controller('mvInnerPageDetailCtrl', function ($scope, mvInnerPage, $routeParams) {
    $scope.innerPage = mvInnerPage.get({_id: $routeParams.id});
});
angular.module('app').factory('mvInnerPageRepo', function ($http, $q, mvInnerPage,mvIdentity) {
    return {

        createInnerPage: function (newInnerPageData) {

            var newInnerPage = new mvInnerPage(newInnerPageData);
            newInnerPage.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Industry");
            newInnerPage.$save().then(function () {
                console.log("Industry Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentInnerPage: function (newInnerPageData) {
            newInnerPageData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newInnerPageData);
            angular.extend(clone,newInnerPageData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvInnerPageCtrl', function ($scope, mvNotifier, mvInnerPageRepo, mvInnerPage, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.innerPage = mvInnerPage.get({ _id: id }, (function () {
            if ($scope.innerPage.PageTitle) {
                for (var i = 0; i < $scope.innerPage.PageTitle.length; i++) {

                    if ($scope.innerPage.PageTitle[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.innerPage.PageTitle[i].Text;
                        $scope.lang = $scope.innerPage.PageTitle[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.innerPage = new mvInnerPage();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.innerPage.Deleted = false;


    }

    $scope.getName = function (list, lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;

        if (list) {
            for (var i = 0; i < list.length; i++) {

                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };


    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' }];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {
        $scope.loop();
        $scope.loopBody();
        mvInnerPageRepo.updateCurrentInnerPage($scope.innerPage).then(function () {
            mvNotifier.notify('Inner page has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function () {
        $scope.loop();
        $scope.loopBody();
        mvInnerPageRepo.createInnerPage($scope.innerPage).then(function () {
            mvNotifier.notify('New Inner page Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function () {

        var listItems = $("#descriptions li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#DescriptionText2");
            $scope.descriptionText = input.val();
            $scope.saveDescription();

        });
    };
    $scope.loopBody = function () {

        var listItems = $("#descriptionsBody li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#DescriptionText3");
            $scope.descriptionTextTitle = input.val();
            $scope.saveDescriptionBody();

        });
    };
    $scope.saveDescription = function () {

        var old = false;
        if ($scope.innerPage.PageTitle) {
            for (var i = 0; i < $scope.innerPage.PageTitle.length; i++) {
                var obj = $scope.innerPage.PageTitle[i];

                if ($scope.innerPage.PageTitle[i].Lang == $scope.lang) {
                    $scope.innerPage.PageTitle[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }


        if (!old) {
            if (!$scope.innerPage.PageTitle) {
                $scope.innerPage.PageTitle = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.innerPage.PageTitle.push(description);
        }
        $scope.descriptionText = "";
        //$scope.lang = "";



    };

    $scope.saveDescriptionBody = function () {
        var old = false;
        if ($scope.innerPage.PageBody) {
            for (var i = 0; i < $scope.innerPage.PageBody.length; i++) {
                var obj = $scope.innerPage.PageBody[i];

                if ($scope.innerPage.PageBody[i].Lang == $scope.lang) {
                    $scope.innerPage.PageBody[i].Text = $scope.descriptionTextTitle;
                    old = true;
                }

            }
        }


        if (!old) {
            if (!$scope.innerPage.PageBody) {
                $scope.innerPage.PageBody = [];
            }
            var descriptionBody = { "Lang": $scope.lang, "Text": $scope.descriptionTextTitle };
            $scope.innerPage.PageBody.push(descriptionBody);
        }
        $scope.lang = "";
        $scope.descriptionTextTitle = "";
    }
    /*
   $scope.updateDescription = function (industry) {
     $scope.lang = industry.Lang;
     $scope.descriptionText = industry.Text;
   };

   $scope.deleteDescription = function (industry) {

       for(var i = 0; i < $scope.industry.Description.length; i++) {
           var obj = $scope.industry.Description[i];
           console.log("Old" + obj.Lang);
           console.log("New " + industry.Lang);
           if(industry.Lang == obj.Lang) {
               $scope.industry.Description.splice(i, 1);
               i--;
           }
       }
       /*
       var descriptions = $scope.industry.Description;
       console.log(descriptions);
       descriptions.delete(industry);
       $scope.industry.Description = descriptions;



   };*/


});
angular.module('app').controller('mvInnerPageListCtrl', function ($scope, mvInnerPage,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.innerPages = mvInnerPage.query();
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'PageTitle', text: 'Sort by Page Title'}];

    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getName = function(list){
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == $scope.currentLang) {
                return list[i].Text;
            }
        }
    };

    $scope.getLang = function(){
        return $translate.use();
    };
});

angular.module('app').factory('mvExperiance', function ($resource) {
    var ExperianceResource = $resource('/api/experiances/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return ExperianceResource;
});
angular.module('app').factory('mvCachedEmployer', function (mvCourse) {
    var employerList;
    return {
        query: function () {
            if (!employerList) {
                employerList = mvEmployer.query();
            }
            return employerList;
        }
    };
});
angular.module('app').controller('mvExperianceDetailCtrl', function ($scope, mvExperiance, $routeParams) {
    $scope.experiance = mvExperiance.get({_id: $routeParams.id});
});
angular.module('app').factory('mvExperianceRepo', function ($http, $q, mvExperiance,mvIdentity) {
    return {

        createExperiance: function (newExperianceData) {
            var newExperiance = new mvExperiance(newExperianceData);
            newExperiance.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Experiance");
            newExperiance.$save().then(function () {
                console.log("Experiance Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createExperianceAfterCreatingUser: function (newExperianceData) {
            var newExperiance = new mvExperiance(newExperianceData);
            var dfd = $q.defer();
            console.log("Saving Experiance");
            newExperiance.$save().then(function (experiance) {
                console.log("Experiance Saved");
                mvIdentity.currentExperiance = experiance;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentExperiance: function (newExperianceData) {
            newExperianceData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newExperianceData);
            angular.extend(clone,newExperianceData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvExperianceCtrl', function ($scope, $rootScope, mvNotifier, mvExperianceRepo, mvExperiance, $routeParams
    , $translate, mvIdentity, $location, mvJobSeekerRepo) {
    
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    
    $scope.experiance = new mvExperiance();
        
    if(mvIdentity.currentJobSeeker)
            $scope.experiance.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.experiance.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateExperiance = function updateExperiance(experiane) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        experiane.PeriodFrom = new Date(experiane.PeriodFrom)
        experiane.PeriodTo = new Date(experiane.PeriodTo)
        $scope.experiance = experiane;
    }

    $scope.addExperiance = function addExperiance() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.experiance = new mvExperiance();
        
    }

    $scope.deleteExperiance = function (experiane) {

        var array = $rootScope.jobSeeker.Experiances;

        $rootScope.jobSeeker.Experiances.forEach(function (element) {
            if (element._id == experiane._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var experiance = {
            Company: $scope.experiance.Company,
            JobSeeker: $scope.experiance.JobSeeker,
            CompanySize: $scope.experiance.CompanySize,
            CompanyType: $scope.experiance.CompanyType,
            Country: $scope.experiance.Country,
            Position: $scope.experiance.Position,
            Salary: $scope.experiance.Salary,
            Achievements: $scope.experiance.Achievements,
            FunctionalTasks: $scope.experiance.FunctionalTasks,
            PeriodFrom: $scope.experiance.PeriodFrom,
            PeriodTo: $scope.experiance.PeriodTo,
            Current: $scope.experiance.Current
        };
        if ($rootScope.jobSeeker.Experiances == undefined)
            $rootScope.jobSeeker.Experiances = [];

        $rootScope.jobSeeker.Experiances.push(experiance);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);
                    
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var experiance = {
            Company: $scope.experiance.Company,
            JobSeeker: $scope.experiance.JobSeeker,
            CompanySize: $scope.experiance.CompanySize,
            CompanyType: $scope.experiance.CompanyType,
            Country: $scope.experiance.Country,
            Position: $scope.experiance.Position,
            Salary: $scope.experiance.Salary,
            Achievements: $scope.experiance.Achievements,
            FunctionalTasks: $scope.experiance.FunctionalTasks,
            PeriodFrom: new Date($scope.experiance.PeriodFrom),
            PeriodTo: new Date($scope.experiance.PeriodTo),
            Current: $scope.experiance.Current,
            _id :  $scope.experiance._id
        };

        var array = $rootScope.jobSeeker.Experiances;

        $rootScope.jobSeeker.Experiances.forEach(function (element) {
            if (element._id == experiance._id) {
                var index = array.indexOf(element);
                array[index] = experiance;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };



    
   
});
angular.module('app').controller('mvExperianceListCtrl', function ($scope, mvExperiance, $translate, mvIdentity, mvExperianceRepo,
    mvNotifier , queryBulider , mvJobSeeker , $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.experiances = mvExperiance.query({ jobSeeker: mvIdentity.currentJobSeeker });
    var id = $routeParams.id;
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'ExperianceName', text: 'Sort by ExperianceName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvExperiance.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.experiances = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    $scope.deleteExperiance = function (experiance) {
        
        var ex = mvExperiance.get({ _id: experiance._id }, (function () {
            ex.Deleted = true;
            ex.DeletedBy = mvIdentity.currentUser;
            mvExperianceRepo.updateCurrentExperiance(ex).then(function () {
                mvNotifier.notify('Experiance has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getLang = function(){
        return $translate.use();
    };
    
   
});

angular.module('app').factory('mvEducationalInformation', function ($resource) {
    var educationalInformationResource = $resource('/api/educationalInformations/:_id'
        , { _id: '@id' }
        , { update: { method: 'PUT', isArray: false } }
    );
    return educationalInformationResource;
});
angular.module('app').controller('mvEducationalInformationCtrl'
    , function ($scope, mvNotifier, mvEducationalInformationRepo,
        mvEducationalInformation, mvIdentity, mvGender, $routeParams,
        $location , mvUnivirsty , mvUnivirstyRepo , mvFaculty , 
        mvFacultyRepo, $rootScope, mvSpecialization, mvSpecializationRepo, $translate, mvJobSeekerRepo, mvJobSeeker ) {
    
        $scope.addEnabled = false;
        $scope.currentLang = $translate.use();
        $("#currentLang").val($rootScope.currentLang);

        $scope.educationalInformation = new mvEducationalInformation();

        if (mvIdentity.currentJobSeeker)
            $scope.educationalInformation.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.educationalInformation.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.showForm = false;

        $scope.updateEducationalInformation = function updateEducationalInformation(educationalInformation) {
            $scope.updateMode = true;
            $scope.addMode = false;
            $scope.showForm = true;
            educationalInformation.EducationalLevel = educationalInformation.EducationalLevel._id;
            educationalInformation.Grade = educationalInformation.Grade._id;
            //educationalInformation.Grade = educationalInformation.Grade._id;

            $scope.educationalInformation = educationalInformation;
        }

        $scope.addEducationalInformation = function addEducationalInformation() {
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.showForm = true;
            $scope.educationalInformation = new mvEducationalInformation();

        }

        $scope.deleteEducationalInformation = function (educationalInformation) {

            var array = $rootScope.jobSeeker.EducationalInformation;

            $rootScope.jobSeeker.EducationalInformation.forEach(function (element) {
                if (element._id == educationalInformation._id) {
                    var index = array.indexOf(element);
                    array.splice(index, 1);
                    //$rootScope.vacancy.Questions.remove(element);
                }

            });

            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
                //$location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);

            }, function (reason) {
                mvNotifier.error(reason);
            });

        };

        $scope.add = function () {
            createUnivirsty(function () {
                createFaculty(function () {
                    createSpecialization(function () {
                        var educationalInformation = {
                            EducationalLevel: $scope.educationalInformation.EducationalLevel,
                            JobSeeker: $scope.educationalInformation.JobSeeker,
                            Univirsty: $scope.educationalInformation.Univirsty,
                            Faculty: $scope.educationalInformation.Faculty,
                            Grade: $scope.educationalInformation.Grade,
                            Specialization: $scope.educationalInformation.Specialization,
                            GraduationYear: $scope.educationalInformation.GraduationYear
                        };
                        if ($rootScope.jobSeeker.EducationalInformation == undefined)
                            $rootScope.jobSeeker.EducationalInformation = [];

                        $rootScope.jobSeeker.EducationalInformation.push(educationalInformation);

                        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                            mvNotifier.notify('JobSeeker has been updated!');
                            $scope.showForm = false;
                            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                               

                                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);

                            }));
                            //$location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);

                        }, function (reason) {
                            mvNotifier.error(reason);
                        });
                    });
                });
            });
        };


        $scope.update = function () {
            createUnivirsty(function () {
                createFaculty(function () {
                    createSpecialization(function () {
            var educationalInformation = {
                EducationalLevel: $scope.educationalInformation.EducationalLevel,
                JobSeeker: $scope.educationalInformation.JobSeeker,
                Univirsty: $scope.educationalInformation.Univirsty,
                Faculty: $scope.educationalInformation.Faculty,
                Grade: $scope.educationalInformation.Grade,
                Specialization: $scope.educationalInformation.Specialization,
                GraduationYear: $scope.educationalInformation.GraduationYear,
                _id: $scope.educationalInformation._id
            };

            var array = $rootScope.jobSeeker.EducationalInformation;

            $rootScope.jobSeeker.EducationalInformation.forEach(function (element) {
                if (element._id == educationalInformation._id) {
                    var index = array.indexOf(element);
                    array[index] = educationalInformation;
                }

            });

            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {


                    $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);

                }));
                mvNotifier.notify('JobSeeker has been updated!');
                $scope.showForm = false;
                //$location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);

            }, function (reason) {
                mvNotifier.error(reason);
            });
                    });
                });
            });
        };
    function createUnivirsty(callback) {
        var univirstyId = $("#hfUnivirstyId").val();
        var univirstyName = $("#univirstyName").val();
        if (!univirstyId) {
            if (univirstyName != '') {
                var univirsty = new mvUnivirsty();
                univirsty.Confirmed = false;
                univirsty.Deleted = false;
                univirsty.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var univirstyNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": univirstyName };
                    univirsty.Name.push(univirstyNameObj);
                }
                
                
                
                return mvUnivirstyRepo.createUnivirsty(univirsty).then(function (createdUnivirsty) {
                    
                    mvNotifier.notify('New Univirsty Added!');
                    $scope.educationalInformation.Univirsty = createdUnivirsty._id;
                    callback();
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }

        }
        else {
            $scope.educationalInformation.Univirsty = univirstyId;
            callback();
        }
    }
    
    function createFaculty(callback) {
        var facultyId = $("#hfFacultyId").val();
        var facultyName = $("#facultyName").val();
        if (!facultyId) {
            if (facultyName != '') {
                var faculty = new mvFaculty();
                faculty.Confirmed = false;
                faculty.Deleted = false;
                faculty.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var facultyNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": facultyName };
                    faculty.Name.push(facultyNameObj);
                }
                
                
                
                return mvFacultyRepo.createFaculty(faculty).then(function (createdFaculty) {
                    
                    mvNotifier.notify('New Faculty Added!');
                    $scope.educationalInformation.Faculty = createdFaculty._id;
                    callback();
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }
        } else {
            $scope.educationalInformation.Faculty = facultyId;
            callback();
        }
        
    }
        
    function createSpecialization(callback) {
        var specializationId = $("#hfSpecializationId").val();
        var specializationName = $("#specializationName").val();
        if (!specializationId) {
            if (specializationName != '') {
                var specialization = new mvSpecialization();
                specialization.Confirmed = false;
                specialization.Deleted = false;
                specialization.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var specializationNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": specializationName };
                    specialization.Name.push(specializationNameObj);
                }
                
                
                
                return mvSpecializationRepo.createSpecialization(specialization).then(function (createdSpecialization) {
                    
                    mvNotifier.notify('New Specialization Added!');
                    $scope.educationalInformation.Specialization = createdSpecialization._id;
                    callback();
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }
        } else {
            $scope.educationalInformation.Specialization = specializationId;
            callback();
        }
        
    } 

    $(function () {
        $("#univirstyName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/universtiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {

                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedUnivirsty");
                        var offset = p.offset();

                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {

                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfUnivirstyId").val(i.item.id);
                $('#hfUnivirstyId').trigger('change');
                var p = $("#selectedUnivirsty");
                p.text(i.item.label);

            },
            minLength: 2
        });


    });
    $('#hfUnivirstyId').change(function () {
        var customerID = $(this).val();


    });

    $(function () {
        $("#facultyName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/facultiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {

                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedFaculty");
                        var offset = p.offset();

                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {

                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfFacultyId").val(i.item.id);
                $('#hfFacultyId').trigger('change');
                var p = $("#selectedFaculty");
                p.text(i.item.label);

            },
            minLength: 2
        });


    });
    $('#hfFacultyId').change(function () {
        var customerID = $(this).val();


    });

    $(function () {
        $("#specializationName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/specializationsByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {

                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedFaculty");
                        var offset = p.offset();

                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {

                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfSpecializationId").val(i.item.id);
                $('#hfSpecializationId').trigger('change');
                var p = $("#selectedSpecialization");
                p.text(i.item.label);

            },
            minLength: 2
        });


    });
    $('#hfSpecializationId').change(function () {
        var customerID = $(this).val();


    });
     
});
angular.module('app').controller('mvEducationalInformationDetailCtrl', function ($scope, mvEducationalInformation, $routeParams) {
    $scope.educationalInformation = mvEducationalInformation.get({_id: $routeParams.id});
});
angular.module('app').controller('mvEducationalInformationListCtrl', function ($scope, mvEducationalInformation, $translate, mvIdentity, mvEducationalInformationRepo,
    mvNotifier , queryBulider , mvJobSeeker , $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.educationalInformations = mvEducationalInformation.query({ jobSeeker: mvIdentity.currentJobSeeker });
    var id = $routeParams.id;
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'EducationalInformationName', text: 'Sort by EducationalInformationName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvEducationalInformation.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.educationalInformations = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    $scope.deleteEducationalInformation = function (educationalInformation) {
        var ed = mvEducationalInformation.get({ _id: educationalInformation._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvEducationalInformationRepo.updateCurrentEducationalInformation(ed).then(function () {
                mvNotifier.notify('Educational Information has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getLang = function(){
        return $translate.use();
    };
    
   
});

angular.module('app').factory('mvEducationalInformationRepo', function ($http, $q, mvEducationalInformation,mvIdentity) {
    return {

        createEducationalInformation: function (newEducationalInformationData) {
            var newEducationalInformation = new mvEducationalInformation(newEducationalInformationData);
            newEducationalInformation.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving EducationalInformation");
            newEducationalInformation.$save().then(function () {
                console.log("EducationalInformation Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
        ,updateCurrentEducationalInformation: function (newEducationalInformationData) {
            newEducationalInformationData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newEducationalInformationData);
            angular.extend(clone,newEducationalInformationData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvAddress', function ($resource) {
    var addressResource = $resource('/api/addresses/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return addressResource;
}); 

angular.module('app').controller('mvAddressCtrl', function ($scope, $location, mvNotifier, mvAddressRepo, mvAddress,
    mvIdentity, $routeParams, $translate, mvCityRepo, $q, mvCity, $rootScope, mvAreaRepo, mvArea, $route, mvJobSeekerRepo) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $scope.address = new mvAddress();

    if (mvIdentity.currentJobSeeker)
        $scope.address.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.address.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateaddress = function updateaddress(address) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        if (address.Country != undefined)
        address.Country = address.Country._id;
        $scope.address = address;
    }

    $scope.addaddress = function addaddress() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.address = new mvAddress();

    }

    $scope.deleteaddress = function (address) {

        var array = $rootScope.jobSeeker.Address;

        $rootScope.jobSeeker.Address.forEach(function (element) {
            if (element._id == address._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/addresss/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {
        createCity(function () {
            createArea(function () { 
        var address = {
            Country: $scope.address.Country,
            City: $scope.address.City,
            Area: $scope.address.Area,
            AddressLine1: $scope.address.AddressLine1,
            AddressLine2: $scope.address.AddressLine2
        };
        if ($rootScope.jobSeeker.address == undefined)
            $rootScope.jobSeeker.address = [];

        $rootScope.jobSeeker.Address.push(address);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/addresss/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });
            });
        })
    };


    $scope.update = function () {
        createCity(function () { createArea(function () { 
        var address = {
            Country: $scope.address.Country,
            City: $scope.address.City,
            Area: $scope.address.Area,
            AddressLine1: $scope.address.AddressLine1,
            AddressLine2: $scope.address.AddressLine2,
            _id: $scope.address._id
        };

        var array = $rootScope.jobSeeker.Address;

        $rootScope.jobSeeker.Address.forEach(function (element) {
            if (element._id == address._id) {
                var index = array.indexOf(element);
                array[index] = address;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/addresss/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });
        })
        });
    };

    function createCity(callback) {
        var cityId = $("#hfCityId").val();
        var cityName = $("#cityName").val();
        if (!cityId) {
            if (cityName != '') {
                var city = new mvCity();
                city.Confirmed = false;
                city.Deleted = false;
                city.Country = $scope.address.Country;
                city.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {

                    var cityNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": cityName };
                    city.Name.push(cityNameObj);
                }



                return mvCityRepo.createCity(city).then(function (createdCity) {

                    mvNotifier.notify('New City Added!');
                    $scope.address.City = createdCity._id;
                    callback();
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }

        }
        else {
            $scope.address.City = cityId;
            callback();
        }
    }

    function createArea(callback) {
        var areaId = $("#hfAreaId").val();
        var areaName = $("#areaName").val();
        if (!areaId) {
            if (areaName != '') {
                var area = new mvArea();
                area.Confirmed = false;
                area.Deleted = false;
                area.City = $scope.address.City;
                area.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {

                    var areaNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": areaName };
                    area.Name.push(areaNameObj);
                }



                return mvAreaRepo.createArea(area).then(function (createdArea) {

                    mvNotifier.notify('New Area Added!');
                    $scope.address.Area = createdArea._id;
                    callback();
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }
        } else {
            $scope.address.Area = areaId;
            callback();
        }

    }  

    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/citiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {

                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedCity");
                        var offset = p.offset();

                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {

                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfCityId").val(i.item.id);
                $('#hfCityId').trigger('change');
                var p = $("#selectedCity");
                p.text(i.item.label);

            },
            minLength: 2
        });


    });
    $('#hfCityId').change(function () {
        var customerID = $(this).val();


    });

    $(function () {
        $("#areaName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/areasByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {

                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedArea");
                        var offset = p.offset();

                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {

                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfAreaId").val(i.item.id);
                $('#hfAreaId').trigger('change');
                var p = $("#selectedArea");
                p.text(i.item.label);

            },
            minLength: 2
        });


    });
    $('#hfAreaId').change(function () {
        var customerID = $(this).val();


    });

});

angular.module('app').controller('mvAddressDetailCtrl', function ($scope, mvAddress, $routeParams) {
    $scope.address = mvAddress.get({_id: $routeParams.id});
});
angular.module('app').controller('mvAddressListCtrl', function ($scope, mvAddress, $translate, mvIdentity ,
    queryBulider , mvJobSeeker, $routeParams , mvAddressRepo , mvNotifier) {
    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.id;
    //$scope.addresses = mvAddress.query({ jobSeeker: mvIdentity.currentJobSeeker });
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvAddress.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.addresses = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();     
    
    $scope.deleteAdress = function (adress) {
        var ad = mvAddress.get({ _id: adress._id }, (function () {
            ad.Deleted = true;
            ad.DeletedBy = mvIdentity.currentUser;
            mvAddressRepo.updateCurrentAddress(ad).then(function () {
                mvNotifier.notify('Address has been deleted!');
                $scope.getData();   
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    $scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: '_id', text: 'Sort by _id'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getName = function(list){
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == $scope.currentLang) {
                return list[i].Text;
            }
        }
    };

    $scope.getLang = function(){
        return $translate.use();
    };
});

angular.module('app').factory('mvAddressRepo', function ($http, $q, mvAddress, mvIdentity, $rootScope) {
    return {
        
        createAddress: function (newAddressData) {
            var newAddress = new mvAddress(newAddressData);
            newAddress.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Address");
            newAddress.$save().then(function (response) {
                console.log(response.data);
                //$rootScope.AddressId = [100, 200, 300];
                //if (!$rootScope.AddressId) {
                //    $rootScope.AddressId = [];
                
                //}                                                                      
                //$rootScope.AddressId[$rootScope.AddressId.length] = response._id;                       
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentAddress: function (newAddressData) {
            newAddressData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newAddressData);
            angular.extend(clone, newAddressData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }, updateAllAddressesCity: function (cityId) {
            
            $.ajax({
                type: "get",
                async: false,
                url: "/api/updateAddressCity/" + cityId,
                data: {},
                success: function (data) {
                    console.log(data);
                   
                },
                error: function (error) {
                    
                    console.log(error);
                },
                failure: function (response) {
                    alert(response.responseText);
                },
                beforeSend: function () {
                    
                },
                complete: function () {
                    
                  
                }
            });
        }, updateAllAddressesArea: function (areaId) {
            
            $.ajax({
                type: "get",
                async: false,
                url: "/api/updateAddressArea/" + areaId,
                data: {},
                success: function (data) {
                    console.log(data);
                   
                },
                error: function (error) {
                    
                    console.log(error);
                },
                failure: function (response) {
                    alert(response.responseText);
                },
                beforeSend: function () {
                    
                },
                complete: function () {
                    
                  
                }
            });
        }
    };
});
angular.module('app').factory('mvCachedAddress', function (mvCourse) {
    var addressList;
    return {
        query: function () {
            if (!addressList) {
                addressList = mvAddress.query();
            }
            return addressList;
        }
    };
});
angular.module('app').factory('mvGender', function ($resource) {
    var genderResource = $resource('/api/genders/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return genderResource;
});
angular.module('app').factory('mvGenderRepo', function ($http, $q, mvGender, mvIdentity) {
    return {
        createGender: function (newGenderData) {
            var newGender = new mvGender(newGenderData);
            newGender.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Gender");
            newGender.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentGender: function (newGenderData) {
            newGenderData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newGenderData);
            angular.extend(clone, newGenderData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvMaritalStatus', function ($resource) {
    var maritalStatusResource = $resource('/api/maritalStatuses/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return maritalStatusResource;
});
angular.module('app').factory('mvMaritalStatusRepo', function ($http, $q, mvMaritalStatus, mvIdentity) {
    return {
        createMaritalStatus: function (newMaritalStatusData) {
            var newMaritalStatus = new mvMaritalStatus(newMaritalStatusData);
            newMaritalStatus.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving MaritalStatus");
            newMaritalStatus.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentMaritalStatus: function (newMaritalStatusData) {
            newMaritalStatusData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newMaritalStatusData);
            angular.extend(clone, newMaritalStatusData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvMilitaryStatus', function ($resource) {
    var militaryStatusResource = $resource('/api/militaryStatuses/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    
    return militaryStatusResource;
});
angular.module('app').factory('mvMilitaryStatusRepo', function ($http, $q, mvMilitaryStatus, mvIdentity) {
    return {
        createMilitaryStatus: function (newMilitaryStatusData) {
            var newMilitaryStatus = new mvMilitaryStatus(newMilitaryStatusData);
            newMilitaryStatus.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving MilitaryStatus");
            newMilitaryStatus.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentMilitaryStatus: function (newMilitaryStatusData) {
            newMilitaryStatusData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newMilitaryStatusData);
            angular.extend(clone, newMilitaryStatusData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCarLicenceType', function ($resource) {
    var carLicenceTypeResource = $resource('/api/carLicenceTypes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return carLicenceTypeResource;
});
angular.module('app').factory('mvCarLicenceTypeRepo', function ($http, $q, mvCarLicenceType, mvIdentity) {
    return {
        createCarLicenceType: function (newCarLicenceTypeData) {
            var newCarLicenceType = new mvCarLicenceType(newCarLicenceTypeData);
            newCarLicenceType.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving CarLicenceType");
            newCarLicenceType.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentCarLicenceType: function (newCarLicenceTypeData) {
            newCarLicenceTypeData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newCarLicenceTypeData);
            angular.extend(clone, newCarLicenceTypeData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvEducationalLevel', function ($resource) {
    var educationalLevelResource = $resource('/api/educationalLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return educationalLevelResource;
}); 
angular.module('app').factory('mvEducationalLevelRepo', function ($http, $q, mvEducationalLevel, mvIdentity) {
    return {
        createEducationalLevel: function (newEducationalLevelData) {
            var newEducationalLevel = new mvEducationalLevel(newEducationalLevelData);
            newEducationalLevel.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving EducationalLevel");
            newEducationalLevel.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentEducationalLevel: function (newEducationalLevelData) {
            newEducationalLevelData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newEducationalLevelData);
            angular.extend(clone, newEducationalLevelData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvEducationalLevelCtrl', function ($scope, mvNotifier, mvEducationalLevelRepo, mvEducationalLevel, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    
    if (id) {
        $scope.educationalLevel = mvEducationalLevel.get({ _id: id }, (function () {
            if ($scope.educationalLevel.Name) {
                for (var i = 0; i < $scope.educationalLevel.Name.length; i++) {
                    if ($scope.educationalLevel.Name[i].Lang == $scope.currentLang) {
                        $scope.nameText = $scope.educationalLevel.Name[i].Text;
                        $scope.lang = $scope.educationalLevel.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.educationalLevel = new mvEducationalLevel();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.educationalLevel.Deleted = false;
    }
    
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: '����' },
        { value: 'fr', text: 'French' }];
    
    $scope.lang = $scope.languages[0].value;
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;
        
        if (list) {
            for (var i = 0; i < list.length; i++) {
                
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.update = function () {
        //if ($scope.educationalLevelForm.$valid) {
            $scope.loop();
            mvEducationalLevelRepo.updateCurrentEducationalLevel($scope.educationalLevel).then(function () {
                mvNotifier.notify('EducationalLevel has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.add = function () {
        //if ($scope.educationalLevelForm.$valid && $scope.addEnabled) {            
            $scope.loop();
            mvEducationalLevelRepo.createEducationalLevel($scope.educationalLevel).then(function () {
                mvNotifier.notify('New EducationalLevel Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.loop = function () {
        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        var old = false;
        if ($scope.educationalLevel.Name) {
            for (var i = 0; i < $scope.educationalLevel.Name.length; i++) {
                if ($scope.educationalLevel.Name[i].Lang == $scope.lang) {
                    $scope.educationalLevel.Name[i].Text = $scope.nameText;
                    old = true;
                }
            }
        }
        
        if (!old) {
            if (!$scope.educationalLevel.Name) {
                $scope.educationalLevel.Name = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.educationalLevel.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };

});
angular.module('app').controller('mvEducationalLevelDetailCtrl', function ($scope, mvEducationalLevel, $routeParams) {
    $scope.educationalLevel = mvEducationalLevel.get({_id: $routeParams.id});
});
angular.module('app').controller('mvEducationalLevelListCtrl', 
    function ($scope, mvEducationalLevel, mvEducationalLevelRepo, queryBulider,$translate, mvIdentity, mvIndustryRepo, mvNotifier) {
        
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvEducationalLevel.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res2) {
            $scope.educationalLevels = res2[0].collection;
            $scope.allDataCount = res2[0].allDataCount;
        }));
    };
    
    $scope.deleteEducationalLevel = function (educationalLevel) {
        var ed = mvEducationalLevel.get({ _id: educationalLevel._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvEducationalLevelRepo.updateCurrentEducationalLevel(ed).then(function () {
                mvNotifier.notify('EducationalLevel has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvCareerLevelRepo', function ($http, $q, mvCareerLevel, mvIdentity) {
    return {
        createCareerLevel: function (newCareerLevelData) {
            var newCareerLevel = new mvCareerLevel(newCareerLevelData);
            newCareerLevel.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving CareerLevel");
            newCareerLevel.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentCareerLevel: function (newCareerLevelData) {
            newCareerLevelData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newCareerLevelData);
            angular.extend(clone, newCareerLevelData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCareerLevel', function ($resource) {
    var careerLevelResource = $resource('/api/careerLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return careerLevelResource;
});
angular.module('app').factory('mvFaculty', function ($resource) {
    var facultyResource = $resource('/api/faculties/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return facultyResource;
});
angular.module('app').factory('mvFacultyRepo', function ($http, $q, mvFaculty,mvIdentity) {
    return {

        createFaculty: function (newFacultyData) {

            var newFaculty = new mvFaculty(newFacultyData);
            newFaculty.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Faculty");
            newFaculty.$save().then(function (createdFaculty) {
                console.log("Faculty Saved");
                dfd.resolve(createdFaculty);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentFaculty: function (newFacultyData) {
            newFacultyData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newFacultyData);
            angular.extend(clone,newFacultyData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedFaculty', function (mvFaculty) {
    var facultyList;
    return {
        query: function () {
            if (!facultyList) {
                facultyList = mvFaculty.query();
            }
            return facultyList;
        }
    };
});
angular.module('app').controller('mvFacultyCtrl', function ($scope, mvNotifier, mvFacultyRepo, mvFaculty, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.facultyNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: '????' }];
        
    $scope.init = function () {
        if (id) {
            $scope.faculty = mvFaculty.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.faculty = new mvFaculty();
            $scope.faculty.Confirmed = true;
            $scope.faculty.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.facultyForm.$valid) {
            $scope.loop();
            mvFacultyRepo.updateCurrentFaculty($scope.faculty).then(function () {
                mvNotifier.notify('Faculty has been updated!');
                $location.path('/faculties');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.facultyForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvFacultyRepo.createFaculty($scope.faculty).then(function () {
                mvNotifier.notify('New Faculty Added!');
                $location.path('/faculties');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang) {
            selectedLang = lang;
        } else {
            selectedLang = $scope.currentLang;
        }
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.facultyNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.faculty.Name) {
            for (var i = 0; i < $scope.faculty.Name.length; i++) {
                if ($scope.faculty.Name[i].Lang == $scope.lang) {
                    $scope.faculty.Name[i].Text = $scope.facultyNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.faculty.Name) {
                $scope.faculty.Name = [];
            }
            var facultyName = { "Lang": $scope.lang, "Text": $scope.facultyNameText };
            $scope.faculty.Name.push(facultyName);
        }
        $scope.facultyNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});
angular.module('app').controller('mvFacultyDetailCtrl', function ($scope, mvFaculty, $routeParams) {
    $scope.faculty = mvFaculty.get({_id: $routeParams.id});
});
angular.module('app').controller('mvFacultyListCtrl', function ($scope, mvFaculty, $translate, mvIdentity, mvFacultyRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvFaculty.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.faculties = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteFaculty = function (faculty) {
        var ed = mvFaculty.get({ _id: faculty._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvFacultyRepo.updateCurrentFaculty(ed).then(function () {
                mvNotifier.notify('Faculty has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvGrade', function ($resource) {
    var gradeResource = $resource('/api/grades/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return gradeResource;
});
angular.module('app').factory('mvGradeRepo', function ($http, $q, mvGrade, mvIdentity) {
    return {
        createGrade: function (newGradeData) {
            var newGrade = new mvGrade(newGradeData);
            newGrade.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Grade");
            newGrade.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentGrade: function (newGradeData) {
            newGradeData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newGradeData);
            angular.extend(clone, newGradeData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvSpecialization', function ($resource) {
    var specializationResource = $resource('/api/specializations/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return specializationResource;
});
angular.module('app').factory('mvSpecializationRepo', function ($http, $q, mvSpecialization, mvIdentity) {
    return {
        createSpecialization: function (newSpecializationData) {
            var newSpecialization = new mvSpecialization(newSpecializationData);
            newSpecialization.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Specialization");
            newSpecialization.$save().then(function (response) {
                console.log(response.data);
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentSpecialization: function (newSpecializationData) {
            newSpecializationData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newSpecializationData);
            angular.extend(clone, newSpecializationData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedSpecialization', function (mvSpecialization) {
    var specializationList;
    return {
        query: function () {
            if (!specializationList) {
                specializationList = mvSpecialization.query();
            }
            return specializationList;
        }
    };
});
angular.module('app').controller('mvSpecializationCtrl', function ($scope, mvNotifier, mvSpecializationRepo, mvSpecialization, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.specializationNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: '����' }];
        
    $scope.init = function () {
        if (id) {
            $scope.specialization = mvSpecialization.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.specialization = new mvSpecialization();
            $scope.specialization.Confirmed = true;
            $scope.specialization.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.specializationForm.$valid) {
            $scope.loop();
            mvSpecializationRepo.updateCurrentSpecialization($scope.specialization).then(function () {
                mvNotifier.notify('Specialization has been updated!');
                $location.path('/specializations');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.specializationForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvSpecializationRepo.createSpecialization($scope.specialization).then(function () {
                mvNotifier.notify('New Specialization Added!');
                $location.path('/specializations');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang) {
            selectedLang = lang;
        } else {
            selectedLang = $scope.currentLang;
        }
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.specializationNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.specialization.Name) {
            for (var i = 0; i < $scope.specialization.Name.length; i++) {
                if ($scope.specialization.Name[i].Lang == $scope.lang) {
                    $scope.specialization.Name[i].Text = $scope.specializationNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.specialization.Name) {
                $scope.specialization.Name = [];
            }
            var specializationName = { "Lang": $scope.lang, "Text": $scope.specializationNameText };
            $scope.specialization.Name.push(specializationName);
        }
        $scope.specializationNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});
angular.module('app').controller('mvSpecializationDetailCtrl', function ($scope, mvSpecialization, $routeParams) {
    $scope.specialization = mvSpecialization.get({_id: $routeParams.id});
});
angular.module('app').controller('mvSpecializationListCtrl', function ($scope, mvSpecialization, $translate, mvIdentity, mvSpecializationRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvSpecialization.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.specializations = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteSpecialization = function (specialization) {
        var ed = mvSpecialization.get({ _id: specialization._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvSpecializationRepo.updateCurrentSpecialization(ed).then(function () {
                mvNotifier.notify('Specialization has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvUnivirsty', function ($resource) {
    var univirstyResource = $resource('/api/univirsties/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return univirstyResource;
});
angular.module('app').factory('mvUnivirstyRepo', function ($http, $q, mvUnivirsty,mvIdentity) {
    return {

        createUnivirsty: function (newUnivirstyData) {

            var newUnivirsty = new mvUnivirsty(newUnivirstyData);
            newUnivirsty.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Univirsty");
            newUnivirsty.$save().then(function (univirsty) {
                console.log("Univirsty Saved");
                dfd.resolve(univirsty);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUnivirsty: function (newUnivirstyData) {
            newUnivirstyData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newUnivirstyData);
            angular.extend(clone,newUnivirstyData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvUnivirstyCtrl', function ($scope, mvNotifier, mvUnivirstyRepo, mvUnivirsty, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.univirstyNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: '????' }];
        
    $scope.init = function () {
        if (id) {
            $scope.univirsty = mvUnivirsty.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.univirsty = new mvUnivirsty();
            $scope.univirsty.Confirmed = true;
            $scope.univirsty.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.univirstyForm.$valid) {
            $scope.loop();
            mvUnivirstyRepo.updateCurrentUnivirsty($scope.univirsty).then(function () {
                mvNotifier.notify('Univirsty has been updated!');
                $location.path('/univirsties');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.univirstyForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvUnivirstyRepo.createUnivirsty($scope.univirsty).then(function () {
                mvNotifier.notify('New Univirsty Added!');
                $location.path('/univirsties');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang) {
            selectedLang = lang;
        } else {
            selectedLang = $scope.currentLang;
        }
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.univirstyNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.univirsty.Name) {
            for (var i = 0; i < $scope.univirsty.Name.length; i++) {
                if ($scope.univirsty.Name[i].Lang == $scope.lang) {
                    $scope.univirsty.Name[i].Text = $scope.univirstyNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.univirsty.Name) {
                $scope.univirsty.Name = [];
            }
            var univirstyName = { "Lang": $scope.lang, "Text": $scope.univirstyNameText };
            $scope.univirsty.Name.push(univirstyName);
        }
        $scope.univirstyNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});
angular.module('app').controller('mvUnivirstyDetailCtrl', function ($scope, mvUnivirsty, $routeParams) {
    $scope.univirsty = mvUnivirsty.get({_id: $routeParams.id});
});
angular.module('app').controller('mvUnivirstyListCtrl', function ($scope, mvUnivirsty, $translate, mvIdentity, mvUnivirstyRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvUnivirsty.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.univirsties = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteUnivirsty = function (univirsty) {
        var ed = mvUnivirsty.get({ _id: univirsty._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvUnivirstyRepo.updateCurrentUnivirsty(ed).then(function () {
                mvNotifier.notify('Univirsty has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvCachedUnivirsty', function (mvUnivirsty) {
    var univirstyList;
    return {
        query: function () {
            if (!univirstyList) {
                univirstyList = mvUnivirsty.query();
            }
            return univirstyList;
        }
    };
});

angular.module('app').controller('mvUnivirstyNotConfirmedListCtrl', function ($scope, mvUnivirsty, $translate, mvIdentity, 
    mvUnivirstyRepo, mvNotifier, queryBulider, mvAddressRepo, mvJobSeekerRepo) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvUnivirsty.query({
            query: queryBulider.qb("!Confirmed&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.univirsties = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.selectUnivirsty = function(univirsty) {
        $("#message").text("");
        var flag = true;
        var id = univirsty._id;
        var ids = $("#selectedNotConfirmedUnivirstiesIds").val();
        var res = ids.split(",");
        if (res != null) {
            res.forEach(function(entry) {
                console.log(entry);
                if (id == entry) {
                    $("#message").text("This Univirsty Selected Before !");
                    flag = false;
                    return;
                }

            });
        }
        if (flag) {
            var text = $("#selectedNotConfirmedUnivirsties").text();
            if (text != '') {
                text += ' , ';
            }

            text += univirsty.Name[0].Text;
            $("#selectedNotConfirmedUnivirsties").text(text);


            if (ids != '') {
                ids += ',';
            }

            ids += id;
            $("#selectedNotConfirmedUnivirstiesIds").val(ids);
        }

    };
    
    $scope.saveUnivirsty = function () {
        $("#message").text("");
        var id = $("#hfUnivirstyId").val();
        console.log(id);
        if (id) {


            var ids = $("#selectedNotConfirmedUnivirstiesIds").val();
            if (ids != "") {
                var res = ids.split(",");
                if (res != null) {

                    res.forEach(function(entry) {
                        var ed = mvUnivirsty.get({ _id: entry }, (function () {
                            ed.Deleted = true;
                            ed.DeletedBy = mvIdentity.currentUser;
                            mvUnivirstyRepo.updateCurrentUnivirsty(ed).then(function () {
                                mvNotifier.notify('Univirsty has been deleted!');
                                mvAddressRepo.updateAllAddressesUnivirsty(id + "_" + entry);//
                                mvJobSeekerRepo.updateAllJobSeekersUnivirsty(id + "_" + entry);
                                
                            }, function (reason) {
                                
                                mvNotifier.error(reason);
                            });
                        }));
                        

                    });

                    $("#selectedNotConfirmedUnivirstiesIds").val("");
                    $("#selectedNotConfirmedUnivirsties").text("");
                    
                    $("#message").text("Univirsties Updated Succeffuly!");
                    $scope.getData();
                }
            } else {
                $("#message").text("No Citities Selected !");
            }
        } else {
            $("#message").text("No Confirmed Univirsty Selected !");
        }


    };

    $scope.getData();

    $(function () {
        $("#univirstyName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/univirstiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {
                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedUnivirsty");
                        var offset = p.offset();
                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfUnivirstyId").val(i.item.id);
                $('#hfUnivirstyId').trigger('change');
                var p = $("#selectedUnivirsty");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
});

angular.module('app').factory('mvCity', function ($resource) {
    var cityResource = $resource('/api/cities/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return cityResource;
});
angular.module('app').controller('mvCityCtrl', function ($scope, mvNotifier, mvCityRepo, mvCity, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.cityNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: '����' }];
        
    $scope.init = function () {
        if (id) {
            $scope.city = mvCity.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.city = new mvCity();
            $scope.city.Confirmed = true;
            $scope.city.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
       // if ($scope.cityForm.$valid) {
            $scope.loop();
            mvCityRepo.updateCurrentCity($scope.city).then(function () {
                mvNotifier.notify('City has been updated!');
                $location.path('/cities');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.add = function () {
        //if ($scope.cityForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvCityRepo.createCity($scope.city).then(function () {
                mvNotifier.notify('New City Added!');
                $location.path('/cities');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang) {
            selectedLang = lang;
        } else {
            selectedLang = $scope.currentLang;
        }
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.cityNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.city.Name) {
            for (var i = 0; i < $scope.city.Name.length; i++) {
                if ($scope.city.Name[i].Lang == $scope.lang) {
                    $scope.city.Name[i].Text = $scope.cityNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.city.Name) {
                $scope.city.Name = [];
            }
            var cityName = { "Lang": $scope.lang, "Text": $scope.cityNameText };
            $scope.city.Name.push(cityName);
        }
        $scope.cityNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});
angular.module('app').controller('mvCityDetailCtrl', function ($scope, mvCity, $routeParams) {
    $scope.city = mvCity.get({_id: $routeParams.id});
});
angular.module('app').controller('mvCityListCtrl', function ($scope, mvCity, $translate, mvIdentity, mvCityRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvCity.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.cities = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteCity = function (city) {
        var ed = mvCity.get({ _id: city._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvCityRepo.updateCurrentCity(ed).then(function () {
                mvNotifier.notify('City has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvCityRepo', function ($http, $q, mvCity,mvIdentity) {
    return {

        createCity: function (newCityData) {
            var newCity = new mvCity(newCityData);
            newCity.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving City");
            newCity.$save().then(function (city) {
                console.log(city);
                console.log("City Saved");
                dfd.resolve(city);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createCityAfterCreatingUser: function (newCityData) {
            var newCity = new mvCity(newCityData);
            var dfd = $q.defer();
            console.log("Saving City");
            newCity.$save().then(function (employer) {
                console.log("City Saved");
                mvIdentity.currentCity = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCity: function (newCityData) {
            newCityData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCityData);
            angular.extend(clone,newCityData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedCity', function (mvCity) {
    var cityList;
    return {
        query: function () {
            if (!cityList) {
                cityList = mvCity.query();
            }
            return cityList;
        }
    };
});
angular.module('app').controller('mvCityNotConfirmedListCtrl', function ($scope, mvCity, $translate, mvIdentity, 
    mvCityRepo, mvNotifier, queryBulider, mvAddressRepo, mvVacancyRepo) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvCity.query({
            query: queryBulider.qb("!Confirmed&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.cities = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.selectCity = function(city) {
        $("#message").text("");
        var flag = true;
        var id = city._id;
        var ids = $("#selectedNotConfirmedCitiesIds").val();
        var res = ids.split(",");
        if (res != null) {
            res.forEach(function(entry) {
                console.log(entry);
                if (id == entry) {
                    $("#message").text("This City Selected Before !");
                    flag = false;
                    return;
                }

            });
        }
        if (flag) {
            var text = $("#selectedNotConfirmedCities").text();
            if (text != '') {
                text += ' , ';
            }

            text += city.Name[0].Text;
            $("#selectedNotConfirmedCities").text(text);


            if (ids != '') {
                ids += ',';
            }

            ids += id;
            $("#selectedNotConfirmedCitiesIds").val(ids);
        }

    };
    
    $scope.saveCity = function () {
        $("#message").text("");
        var id = $("#hfCityId").val();
        console.log(id);
        if (id) {


            var ids = $("#selectedNotConfirmedCitiesIds").val();
            if (ids != "") {
                var res = ids.split(",");
                if (res != null) {

                    res.forEach(function(entry) {
                        var ed = mvCity.get({ _id: entry }, (function () {
                            ed.Deleted = true;
                            ed.DeletedBy = mvIdentity.currentUser;
                            mvCityRepo.updateCurrentCity(ed).then(function () {
                                mvNotifier.notify('City has been deleted!');
                                mvAddressRepo.updateAllAddressesCity(id + "_" + entry);
                                mvVacancyRepo.updateAllVacanciesCity(id + "_" + entry);
                               //entry is city for change to name of id
                            }, function (reason) {
                                
                                mvNotifier.error(reason);
                            });
                        }));
                        

                    });

                    $("#selectedNotConfirmedCitiesIds").val("");
                    $("#selectedNotConfirmedCities").text("");
                    
                    $("#message").text("Cities Updated Succeffuly!");
                    $scope.getData();
                }
            } else {
                $("#message").text("No Citities Selected !");
            }
        } else {
            $("#message").text("No Confirmed City Selected !");
        }


    };

    $scope.getData();

    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/citiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() , Confirmed : true},
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {
                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedCity");
                        var offset = p.offset();
                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfCityId").val(i.item.id);
                $('#hfCityId').trigger('change');
                var p = $("#selectedCity");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
});

angular.module('app').factory('mvArea', function ($resource) {
    var areaResource = $resource('/api/areas/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return areaResource;
});
angular.module('app').controller('mvAreaCtrl', function ($scope, mvNotifier, mvAreaRepo, mvArea, $routeParams, $translate, $location, mvCity, mvCityRepo) {
    var id = $routeParams.id;
    $scope.areaNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: '����' }];
        
    $scope.init = function () {
        if (id) {
            $scope.area = mvArea.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.area = new mvArea();
            $scope.area.Confirmed = true;
            $scope.area.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.areaForm.$valid) {
            $scope.loop();
            createCity();
            mvAreaRepo.updateCurrentArea($scope.area).then(function () {
                mvNotifier.notify('Area has been updated!');
                $location.path('/areas');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.areaForm.$valid && $scope.addEnabled) {
            $scope.loop();
            createCity();
            mvAreaRepo.createArea($scope.area).then(function () {
                mvNotifier.notify('New Area Added!');
                $location.path('/areas');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang) {
            selectedLang = lang;
        } else {
            selectedLang = $scope.currentLang;
        }
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.areaNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.area.Name) {
            for (var i = 0; i < $scope.area.Name.length; i++) {
                if ($scope.area.Name[i].Lang == $scope.lang) {
                    $scope.area.Name[i].Text = $scope.areaNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.area.Name) {
                $scope.area.Name = [];
            }
            var areaName = { "Lang": $scope.lang, "Text": $scope.areaNameText };
            $scope.area.Name.push(areaName);
        }
        $scope.areaNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
        
    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/citiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {
                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedCity");
                        var offset = p.offset();
                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfCityId").val(i.item.id);
                $('#hfCityId').trigger('change');
                var p = $("#selectedCity");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
    
    $('#hfCityId').change(function () {

    });
    
    function createCity() {
        var cityId = $("#hfCityId").val();
        var cityName = $("#cityName").val();
        if (!cityId) {
            if (cityName != '') {
                var city = new mvCity();
                city.Confirmed = false;
                city.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var cityNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": cityName };
                    city.Name.push(cityNameObj);
                }                                                
                return mvCityRepo.createCity(city).then(function (createdCity) {                    
                    mvNotifier.notify('New City Added!');
                    $scope.area.City = createdCity._id;
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } 
        }
        else {
            $scope.area.City = cityId;
        }
    };

});
angular.module('app').controller('mvAreaDetailCtrl', function ($scope, mvArea, $routeParams) {
    $scope.area = mvArea.get({_id: $routeParams.id});
});
angular.module('app').controller('mvAreaListCtrl', function ($scope, mvArea, $translate, mvIdentity, mvAreaRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvArea.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.areas = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteArea = function (area) {
        var ed = mvArea.get({ _id: area._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvAreaRepo.updateCurrentArea(ed).then(function () {
                mvNotifier.notify('Area has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvAreaRepo', function ($http, $q, mvArea,mvIdentity) {
    return {

        createArea: function (newAreaData) {
            var newArea = new mvArea(newAreaData);
            newArea.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Area");
            newArea.$save().then(function (area) {
                console.log(area);
                console.log("Area Saved");
                dfd.resolve(area);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createAreaAfterCreatingUser: function (newAreaData) {
            var newArea = new mvArea(newAreaData);
            var dfd = $q.defer();
            console.log("Saving Area");
            newArea.$save().then(function (employer) {
                console.log("Area Saved");
                mvIdentity.currentArea = employer;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentArea: function (newAreaData) {
            newAreaData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newAreaData);
            angular.extend(clone,newAreaData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedArea', function (mvArea) {
    var areaList;
    return {
        query: function () {
            if (!areaList) {
                areaList = mvArea.query();
            }
            return areaList;
        }
    };
});
angular.module('app').controller('mvAreaNotConfirmedListCtrl', function ($scope, mvArea, $translate, mvIdentity, 
    mvAreaRepo, mvNotifier, queryBulider, mvAddressRepo, mvVacancyRepo) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvArea.query({
            query: queryBulider.qb("!Confirmed&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.areas = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.selectArea = function(area) {
        $("#message").text("");
        var flag = true;
        var id = area._id;
        var ids = $("#selectedNotConfirmedAreasIds").val();
        var res = ids.split(",");
        if (res != null) {
            res.forEach(function(entry) {
                console.log(entry);
                if (id == entry) {
                    $("#message").text("This Area Selected Before !");
                    flag = false;
                    return;
                }

            });
        }
        if (flag) {
            var text = $("#selectedNotConfirmedAreas").text();
            if (text != '') {
                text += ' , ';
            }

            text += area.Name[0].Text;
            $("#selectedNotConfirmedAreas").text(text);


            if (ids != '') {
                ids += ',';
            }

            ids += id;
            $("#selectedNotConfirmedAreasIds").val(ids);
        }

    };
    
    $scope.saveArea = function () {
        $("#message").text("");
        var id = $("#hfAreaId").val();
        console.log(id);
        if (id) {


            var ids = $("#selectedNotConfirmedAreasIds").val();
            if (ids != "") {
                var res = ids.split(",");
                if (res != null) {

                    res.forEach(function(entry) {
                        var ed = mvArea.get({ _id: entry }, (function () {
                            ed.Deleted = true;
                            ed.DeletedBy = mvIdentity.currentUser;
                            mvAreaRepo.updateCurrentArea(ed).then(function () {
                                mvNotifier.notify('Area has been deleted!');
                                mvAddressRepo.updateAllAddressesArea(id + "_" + entry);
                                mvVacancyRepo.updateAllVacanciesArea(id + "_" + entry);
                            }, function (reason) {
                                
                                mvNotifier.error(reason);
                            });
                        }));
                        

                    });

                    $("#selectedNotConfirmedAreasIds").val("");
                    $("#selectedNotConfirmedAreas").text("");
                    
                    $("#message").text("Areas Updated Succeffuly!");
                    $scope.getData();
                }
            } else {
                $("#message").text("No Citities Selected !");
            }
        } else {
            $("#message").text("No Confirmed Area Selected !");
        }


    };

    $scope.getData();

    $(function () {
        $("#areaName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/areasByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val(),Confirmed : true },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {
                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedArea");
                        var offset = p.offset();
                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfAreaId").val(i.item.id);
                $('#hfAreaId').trigger('change');
                var p = $("#selectedArea");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
});

angular.module('app').controller('mvUserListCtrl', function ($scope, queryBulider, mvNotifier, mvUser) {
    //$scope.users = mvUser.query();
    //console.log(mvUser.query());
    console.log($scope.users);

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvUser.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.users = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    //$scope.deleteCity = function (city) {
    //    var ed = mvUser.get({ _id: city._id }, (function () {
    //        ed.Deleted = true;
    //        ed.DeletedBy = mvIdentity.currentUser;
    //        mvUserRepo.updateCurrentCity(ed).then(function () {
    //            mvNotifier.notify('City has been deleted!');
    //            $scope.getData();
    //        }, function (reason) {
    //            mvNotifier.error(reason);
    //        });
    //    }));
    //};

    $scope.getData();
});
(function () {
    'use strict';
    
    var core = angular.module('app');
    
    var config = {
        appErrorPrefix: '[hot-towel Error] ',
        appTitle: 'hot-towel'
    };
    
    core.value('config', config);
    
    core.config(configure);
    
    configure.$inject = ['$translateProvider'];
    /* @ngInject */
    function configure($translateProvider) {
        
        var english = {
            'Title': 'Internationalization Test',
            "Language": "Language",
            "Languages": {
                "English": "English",
                "French": "French",
                "Arabic": "عربى"
            },
            "Created_By": "Created by John Papa",
            "Forget Password": "Forget Password",
            "First_Name": "First Name",
            "Last_Name": "Last Name",
            "Age": "Age",
            "Location": "Location",
            "Messages": "Messages",
            "People": "People",
            "Splash_Msg": "Loading . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "Featured Jobs",
            "Welcome": "Welcome To Empower !",
            "Signin": "Sign In",
            "New_Jobs": "New Jobs",
            'Jobs_Title': "Jobs Title",
            "FacebookSignin": "Facebook SignUp/Login",
            "GoogleSignin": "Google SignUp/Login",
            "Agreement": "I agree with the Terms of use",
            "Employer": {
                "Employer": "Employer",
                "EmployerName": "Name",
                "EmployerType": "Type",
                "NumberOfEmployees": "Employees",
                "AverageNumberOfJobOpeningsPerMonth": "Jobs Per Month",
                "ContactFirstName": "Contact First Name",
                "ContactLastName": "Contact Last Name",
                "ContactTitle": "Contact Title",
                "ContactMobileNumber": "Contact Mobile Number",
                "ContactPersonInformation": "Contact Person Information",
                "CompanyPhone": "CompanyPhone",
                "CompanyWebsite": "Company Website",
                "CompanySize": "Company Size",
                "Country": "Country",
                "Photo": "Photo"

            },
            "JobSeeker": {
                "JobSeeker": "JobSeeker",
                "Gender": "Gender",
                "BirthDate": "Birth Date",
                "Address": "Address",
                "ResumeLink": "Resume Link",
                "ExperienceLevel": "Experience Years",
                "MostRecentEmployer": "Most Recent Employer",
                "MostRecentJobTitle": "Most Recent Job Title",
                "JobCategory": "JobCategory",
                "PreferredJobCategory": "PreferredJobCategory",
                "EducationLevel": "Education Level",
                "SchoolName": "School Name",
                "GraduationGrade": "GraduationGrade",
                "LanguageSpoken": "Language Spoken",
                "SalaryPreference": "Salary Preference",
                "PreferredWork": "PreferredWork",
                "Reference1": "Reference1",
                "Reference1Contact": "Reference1 Contact",
                "Reference2": "Reference2",
                "Reference2Contact": "Reference2 Contact",
                'Personal Information': 'Personal Information',
                'Educational Information': 'Educational',
                'Contact Information': 'Contact Information',
                "Country": "Country",
                "MobileNo": "MobileNo",
                "Email": "Email",
                "Experiances": "Experiances",
                'FirstName': 'First Name',
                'MiddleName': 'Middle Name',
                'LastName': 'Last Name',
                'FullName': 'Full Name',
                'MaritalStatus': 'Marital Status',
                'MilitaryStatus': 'Military Status',
                'CarLicenceType': 'Car Licence Type',
                'FacebookAcount': 'Facebook Acount',
                'TwitterAcount': 'Twitter Acount',
                'LinkedinAccount': 'Linkedin Account',
                'Course': 'Course',
                'Skills': 'Skills',
                'LanguageSkills': 'Language Skills',
                'HasACar': 'Has a Car',
                'PeriodOfEnrollment': 'Period Of Enrollment',
                'MoreInformation': 'More Information',
                'Job Preferences': 'Job Preferences'
            },
            "Vacancy": {
                "Vacancy": "Vacancy",
                "JobTitle": "Job Title",
                "JobDescrption": "Job Descrption",
                "AvailableFrom": "Available From",
                "AvailableTo": "Available To",
                "SalaryRangeFrom": "Salary From",
                "SalaryRangeTo": "To",
                "SalaryCurancy": "Curancy",
                "RequiredExperiance": "Required Experience",
                "JobType": "Job Type",
                "Industry": "Industry",
                "Country": "Country",
                "City": "City",
                'EducationalLevel': 'Educational Level',
                'CareerLevel': 'Career Level',
                'HotJobFlag': 'Hot Job Flag',
                'Area': 'Area',
                'JobRole': 'Job Role',
                'JobRequirements': 'Requirements',
                'Benfits': 'Benfits',
                'HideSalary': 'Hide Salary',
                'ReciveApplicationsByEmail': 'Recive Applications By Email',
                'HideCompany': 'Hide Company',
                'SendRecommendedCandidatesDailyOrWeekly': 'Send Recommended Candidates Daily Or Weekly'

            },
            'City': {
                "City": "City",
                "Name": "Name",
                "Country": "Country",
                "Confirmed": "Confirmed"
            },
            'Area': {
                "Area": "Area",
                "City": "City",
                "Name": "Name",
                "Confirmed": "Confirmed"
            },
            "User": {
                "UserName": "User Name",
                "FirstName": "First Name",
                "LastName": "Last Name",
                "UserType": "User Type",
                "CreatedBy": "Created By",
                "ModifiedBy": "Modified By",
                "Package": "Package",
                'Features': 'Features'
            },
            "Industry": {
                "Name": "Name"
            },
            "Specialization": {
                "Name": "Name"
            },
            "Faculty": {
                "Name": "Name"
            },
            "Univirstynivirsty": {
                "Name": "Name"
            },
            "JobType": {
                "Name": "Name"
            },
            "JobRole": {
                "Name": "Name"
            },
            "Address": {
                "Country": "Country",
                "City": "City",
                "Area": "Area",
                "AddressLine1": "Address Line1",
                "AddressLine2": "Address Line2"
            },
            "Experiance": {
                "Country": "Country",
                "Company": "Company",
                "CompanySize": "Company Size",
                "CompanyType": "Company Type",
                "Position": "Position",
                "Salary": "Salary",
                "PeriodFrom": "Period From",
                "PeriodTo": "Period To",
                "Achievements": "Achievements",
                "FunctionalTasks": "Functional Tasks"
            },
            "LanguageSkill": {
                "Language": "Language",
                "LanguageLevel": "LanguageLevel"

            },
            "Skill": {
                "SkillType": "SkillType",
                "SkillLevel": "SkillLevel"
            },
            "Category": {
                "Description": "Description"
            },
            "InnerPage": {
                "PageTitle": "Page Title",
                "PageBody": "Page Body"
            },
            "EducationalInformation": {
                'EducationalLevel': 'Educational Level',
                'Univirsty': 'Univirsty',
                'Faculty': 'Faculty',
                'Specialization': 'Specialization',
                'Grade': 'Grade'
            }, "EducationalLevel": {
                "Name": "Name"
            },
            'Course': {
                'Title': 'Title',
                'TrainingCenter': 'Training Center',
                'Specialization': 'Specialization',
                'Grade': 'Grade',
                'CourseYear': 'CourseYear'
            },
            'Main': {
                'Empower': 'Empower',
                'Welcome': 'Welcome to the Empower!',
                'Search1': 'FIND THE BEST',
                'Search2': 'JOBS IN EGYPT',
                'Search3': 'Search Jobs (e.g. Sales in Cairo)',
                'Messge1': '1.Register an account to start',
                'Messge2': '2. Specify & search your desired job',
                'Messge3': '3. Send your resume to employers'
            },
            "Buttons": {
                "ArrangeInterview":"Arrange Interview",
                "Update": "Update",
                "Save": "Save",
                "Cancel": "Cancel",
                "Delete": "Delete",
                "Add": "Add New",
                "Select": "Select",
                "Apply": "Apply",
                "Search": "Search",
                "NewAddress": "New Address",
                "Change Password": "Change Password",
                "Reset Password": "Reset Password",
                'Previous': 'Previous',
                'Next': 'Next',
                'First': 'First',
                'Last': 'Last',
                'Finish': 'Finish',
                "Accept": "Accept",
                "Reject": "Decline",
                "Rollback": "Rollback",
                "ShortList": "ShortList",
                "Approve": "Approve"
            },
            "Menu": {
                "SubTitle": "Jobs IN Egypt",
                "Home": "Home",
                "Jobs": "Jobs",
                "Employers": "Employers",
                "Vacancies": "Vacancies",
                "ContactUs": "Contact US",
                "AboutUs": "About US",
                "MyProfile": "User Profile",
                "SearchJobs": "Search Jobs",
                "Users": "Users",
                "Industries": "Industries",
                "JobTypes": "Job Types",
                "JobRoles": "Job Roles",
                "InnerPages": "Inner Pages",
                "JobSeekers": "Job Seekers",
                "Signout": "Sign Out",
                "PostJob": "Post Job",
                "UserMenu": "User Menu",
                "EducationalLevels": "Educational Levels",
                "Categories": "Categories",
                "CompanyProfile": "Company Profile",
                "InviteSubUser": "Invite Sub User",
                "SignUpSubUser": "SignUpSubUser",
                "subUserFeatures": "SubUserFeatures",
                "Experiances": "Experiances",
                'SelectValue': 'Select Value',
                'JobSeekerProfile': 'Job Seeker Profile',
                'Cities': 'Cities',
                'CitiesNotConfirmed': 'Cities Not Confirmed',
                'Areas': 'Areas',
                'AreasNotConfirmed': 'Areas Not Confirmed',
                'Specializations': 'Specializations',
                'Faculties': 'Faculties',
                'Univirsties': 'Univirsties',
                'UnivirstiesNotConfirmed': 'Univirsties Not Confirmed',
                'Applicants': 'Applicants',
                'Login': 'Login',
                'Register': 'Register ',
                'Packages': 'Packages',
                'Features': 'Features',
                'Candidates': 'Candidates'

            },
            "Footer": {
                "Copy": " \u00A9 2016 Empower Corp International Ltd."
            },
            "AccordionHeader": {
                'Location': 'Location',
                'Country': 'Country',
                'City': 'City',
                'Area': 'Area',
                'JobClassification': 'Job Classification',
                'Industry': 'Industry',
                'JobRole': 'Job Role',
                'JobType': 'Job Type',
                'JobDetails': 'Job Details',
                'EducationalLevel': 'Educational Level',
                'CareerLevel': 'Career Level',
                'Dates': 'Dates',
                'BirthDate': 'Birth Date'
            },
            'Package': {
                "Name": "Name",
                "Type": "Type",
                "Features": "Features",
                "Costs": "Costs"
            },
            'Feature': {
                "Name": "Name",
                "Code": "Code",
                "Type": "Type"
            },
            'PackageFeature': {
                "Points": "Points",
                "Feature": "Feature"
            },
            'PackageCost': {
                "PeriodFromByMonth": "Period From By Month",
                "PeriodToByMonth": "Period To By Month",
                "CostPerMonth": "Cost Per Month"
            },
            'UserPackage': {
                "NoOfMonths": "No Of Months",
                "Discount": "Discount",
                "TotalAmount": "Total Amount",
                "PackageAmount": "Package Amount",
                "StartDate": "Start Date",
                "ExpiryDate": "Expiry Date",
                "Package": "Package"
            },
            'UserFeature': {
                "Points": "Points",
                "DistrbuitedForSubUsers": "Distrbuited For Sub Users",
                "UsedFromPoints": "Used From Points",
                "Package": "Package",
                "Feature": "Feature",
                "ExpiryDate": "Expiry Date",
                "User": "User"
            },
            'Applicant': {
                "ArrangeInterviewLocation": "Interview Location",
                "ArrangeInterviewDate": "Interview Date",
                "ArrangeInterviewTime": "Interview Time"
            }
        };
        
        var arabic = {
            "Title": "أختبار ",
            "Language": "اللغات",
            "Languages": {
                "English": "English",
                "French": "French",
                "Arabic": "عربى"
            },
            "Email": "البريد الالكتروني",
            "Password": "كلمة السر",
            "Remember Me": "تذكرني",
            "Forget Password": "نسيت كلمة السر",
            "Confirm Password": "تاكيد كلمة السر",
            "Sign Up": "فتح حساب",
            "Created_By": "اضيف بواسطة",
            "First_Name": "الاسم الاول",
            "Last_Name": "الاسم الثانى",
            "Age": "العمر",
            "Location": "الموقع",
            "Messages": "الرسائل",
            "People": "الاشخاص",
            "Splash_Msg": "تحميل . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "الوظائف المفضلة",
            "Welcome": "مرحبا بكم فى Empower",
            "Signin": "تسجيل الدخول",
            "New_Jobs": "الوظائف الجديده",
            "Jobs_Title": "عنوان الوظيف",
            "FacebookSignin": "تسجيل الدخول عن طريق الفيس بوك",
            "GoogleSignin": "تسجيل الدخول عن طريق جوجل",
            "Agreement": "أوافق على الشروط والأحكام",
            "Employer": {
                "Employer": "معلن عن وظيفة",
                "EmployerName": "اسم الشركة",
                "EmployerType": "نوع الشركة",
                "NumberOfEmployees": "عدد الموظفين",
                "AverageNumberOfJobOpeningsPerMonth": " عدد الوظائف شهريا",
                "ContactFirstName": "الاسم الأول",
                "ContactLastName": "الاسم الأخير",
                "ContactTitle": "الوظيفة",
                "ContactMobileNumber": "رقم التليفون",
                "ContactPersonInformation": "بيانات المسئول",
                "CompanyPhone": "تليفون الشركة",
                "CompanyWebsite": "الموقع الاليكترونى",
                "CompanySize": "عدد الموظفين",
                "Country": "الدولة",
                "Photo": "الصورة"
            },
            "JobSeeker": {
                "JobSeeker": "باحث عن وظيفة",
                "Gender": "النوع",
                "BirthDate": "تاريخ الميلاد",
                "Address": "العنوان",
                "ResumeLink": "السيرة الذاتية",
                "ExperienceLevel": "سنوات الخبرة",
                "MostRecentEmployer": "الشركة الحالية",
                "MostRecentJobTitle": "المسمي الوظيفي الحالي",
                "JobCategory": "فئة الوظيفة",
                "PreferredJobCategory": "فئة الوظيفة المفضلة",
                "EducationLevel": "مستوي التعليم",
                "SchoolName": "اسم المدرسة او الجامعة",
                "GraduationGrade": "درجة التخرج",
                "LanguageSpoken": "اللغات",
                "SalaryPreference": "المرتب المفضل",
                "PreferredWork": "نوع العمل",
                "Reference1": "Reference1",
                "Reference1Contact": "Reference1 Contact",
                "Reference2": "Reference2",
                "Reference2Contact": "Reference2 Contact",
                'Personal Information': 'المعلومات الشخصية',
                'Educational Information': 'المعلومات الدراسية',
                'Contact Information': 'معلومات الاتصال',
                "MobileNo": "رقم المبيل",
                "Email": "البريد الألكتروني",
                "Experiances": "الخبرات",
                'FirstName': 'الاسم الاول',
                'MiddleName': 'الاسم الاوسط',
                'LastName': 'الاسم الاخير',
                'FullName': 'الاسم',
                'MaritalStatus': 'الحالة الاجتماعية',
                'MilitaryStatus': 'موقف من التجنيد',
                'CarLicenceType': 'نوع رخصة السيارة',
                'FacebookAcount': 'حساب الفيسبوك',
                'TwitterAcount': 'حساب التويتر',
                'LinkedinAccount': 'حساب لينكدان',
                'Course': 'الدورات',
                'Skills': 'المهارات',
                'LanguageSkills': 'مهارات اللغة',
                'HasACar': 'لديك سيارة',
                'PeriodOfEnrollment': 'مهلة ترك الشركة الحالية',
                'MoreInformation': 'معلومات اضافية',
                'Job Preferences': 'خيارات الوظيفة'
            },
            'City': {
                "City": "المدينة",
                "Name": "الاسم",
                "Country": "البلد",
                "Confirmed": "تاكيد"
            },
            'Area': {
                "Area": "المنطقة",
                "City": "المدينة",
                "Name": "الاسم",
                "Confirmed": "تاكيد"
            },
            "Vacancy": {
                "Vacancy": "فرصة عمل",
                "JobTitle": "عنوان الوظيفة",
                "JobDescrption": "وصف الوظيفة",
                "AvailableFrom": "متاحة من",
                "AvailableTo": "متاحة الى",
                "SalaryRangeFrom": "المرتب من ",
                "SalaryRangeTo": " الى",
                "SalaryCurancy": "عملة المرتب",
                "RequiredExperiance": "الخبرة المطلوبة",
                "JobType": "نوع الوظيفة",
                "JobRole": "مجال الوظيفة",
                "Industry": "قطاع العمل",
                "Country": "الدولة",
                "City": "المدينة",
                'EducationalLevel': 'مستوي التعليم',
                'CareerLevel': 'مستوي الوظيفة',
                'HotJobFlag': 'وظيفة مهمة',
                'Area': 'المنطقة',
                'NoData': 'لا يوجد وظائف للعرض',
                'JobRequirements': 'المتطلبات',
                'Benfits': 'المزايا',
                'HideSalary': 'اخفاءالمرتب',
                'ReciveApplicationsByEmail': 'استلام الطلبات عن طريق الايميل',
                'HideCompany': 'اخفاء بيانات الشركة',
                'SendRecommendedCandidatesDailyOrWeekly': 'ارسال المرشحين يوميا أو اسبوعيا'
            },
            "LanguageSkill": {
                "Language": "اللغة",
                "LanguageLevel": "مستوى اللغة"

            },
            "Skill": {
                "SkillType": "نوع المهارة",
                "SkillLevel": "مستوى المهارة"
            },
            "User": {
                "UserName": "اسم المستخدم",
                "FirstName": "الاسم الأول",
                "LastName": "الاسم الأخير",
                "UserType": "نوع المستخدم",
                "CreatedBy": "سجل بواسطة",
                "ModifiedBy": "عدل بواسطة",
                "Package": "الحزمة",
                'Features': 'الخواص'
            },
            "Industry": {
                "Name": "الأسم"
            },
            "Specialization": {
                "Name": "الأسم"
            },
            "Faculty": {
                "Name": "الأسم"
            },
            "Univirstynivirsty": {
                "Name": "الأسم"
            },
            "JobType": {
                "Name": "نوع الوظيفة"
            },
            "JobRole": {
                "Name": "نوع المجال"
            },
            "Address": {
                "Country": "دولة",
                "City": "مدينة",
                "Area": "منطقة",
                "AddressLine1": "العنوان الأول",
                "AddressLine2": "العنوان الثاني"
            },
            "Experiance": {
                "Country": "الدولة",
                "Company": "الشركة",
                "CompanySize": "حجم الشركة",
                "CompanyType": "نوع الشركة",
                "Position": "الوظيفة",
                "Salary": "المرتب",
                "PeriodFrom": "الفتره من ",
                "PeriodTo": "الفتره الى",
                "Achievements": "الانجازات",
                "FunctionalTasks": "المهام"
            },
            "Category": {
                "Name": "الأسم"
            },
            "InnerPage": {
                "PageTitle": "عنوان الصفحة",
                "PageBody": "تفاصيل الصفحة"
            },
            'EducationalInformation': {
                'Educational Level': 'المرحلة التعليمية',
                'Univirsty': 'الجامعة',
                'Faculty': 'الكلية',
                'Specialization': 'التخصص',
                'Grade': 'التقدير'
            }, 'EducationalLevel': {
                "Name": "الأسم"
            },
            'Course': {
                'Title': 'اسم الدورة',
                'TrainingCenter': 'مركز التدريب',
                'Specialization': 'التخصص',
                'Grade': 'التقدير',
                'CourseYear': 'السنة'
            },
            'Main': {
                'Empower': 'ايم باور',
                'Welcome': 'مرحبا بكم فى الموقع',
                'Search1': 'ابحث عن أفضل',
                'Search2': 'الوظائف فى مصر',
                'Search3': 'بحث عن وظائف مثلا مبيعات القاهرة',
                'Messge1': '1- تسجيل مستخدم جديد',
                'Messge2': '2. ابحث عن وظيفتك المفضله',
                'Messge3': '3. ارسل بياناتك للشركات'
            },
            "Buttons": {
                "ArrangeInterview":"تنظيم مقابلة",
                "Update": "تعديل",
                "Save": "حفظ",
                "Cancel": "الغاء",
                "Delete": "حذف",
                "Add": "اضافة جديد",
                "Select": "اختر",
                "Apply": "التقدم للوظيفة",
                "Search": "بحث",
                "NewAddress": "عنوان جديد",
                "Change Password": "تغيير كلمة السر",
                "Reset Password": "ارسال ميل",
                'Previous': 'السابق',
                'Next': 'التالي',
                'First': 'الاول',
                'Last': 'الاخير',
                'Finish': 'تم',
                "Accept": "موافق",
                "Reject": "رفض",
                "Rollback": "رجوع",
                "ShortList": "قائمة مختصره",
                "Approve": "مقبول"
            },
            "Menu": {
                "SubTitle": "وظائف فى مصر",
                "Home": "الرئيسية",
                "Jobs": "الوظائف",
                "Employers": "الشركات",
                "Vacancies": "فرص العمل",
                "ContactUs": "اتصل بنا",
                "AboutUs": "عنا",
                "MyProfile": "بيانات المستخدم",
                "SearchJobs": "بحث في الوظائف",
                "Users": "المستخدمين",
                "Industries": "قطاعات العمل",
                "JobTypes": "انواع الوظائف",
                "JobRoles": "مجالات الوظائف",
                "InnerPages": "الصفحات الداخلية",
                "JobSeekers": "الباحثين عن العمل",
                "Signout": "تسجيل الخروج",
                "PostJob": "أعلن عن وظيفة",
                "UserMenu": "قائمة المستخدم",
                "EducationalLevels": "المستويات التعليمية",
                "Categories": "التصنيفات",
                "CompanyProfile": "بيانات الشركة",
                "InviteSubUser": "دعوة المستخدمين",
                "SignUpSubUser": "SignUpSubUser",
                "subUserFeatures": "SubUserFeatures",
                "Experiances": "الخبرات",
                'SelectValue': 'اختار من القائمة',
                'JobSeekerProfile': 'بيانات طالب العمل',
                'Cities': 'المدن',
                'Areas': 'المناطق',
                'Specializations': 'التخصصات',
                'Faculties': 'الكليات',
                'Univirsties': 'الجامعات',
                'CitiesNotConfirmed': 'المدن التي لم يتم تاكيدها',
                'AreassNotConfirmed': 'المناطق التي لم يتم تاكيدها',
                'UnivirstiesNotConfirmed': 'الجامعات التي لم يتم تاكيدها',
                'Applicants': 'متقدم لوظيفه',
                'Login': 'تسجيل الدخول',
                'Register': 'تسجيل ',
                'Features': 'الخواص',
                'Packages': 'الحزم',
                'Candidates': 'المرشحين'

            },
            "Footer": {
                "Copy": "\u00A9" + " شركة ايم باور 2016"
            },
            "AccordionHeader": {
                'Location': 'الموقع',
                'Country': 'البلد',
                'City': 'المدينة',
                'Area': 'المنطقة',
                'JobClassification': 'تصنيف الوظائف',
                'Industry': 'صناعة',
                'JobRole': 'الدور الوظيفي',
                'JobType': 'نوع الوظيفة',
                'JobDetails': 'تفاصيل الوظيفة',
                'EducationalLevel': 'المستوى التعليمي',
                'CareerLevel': 'المستوى الوظيفي',
                'Dates': 'التواريخ',
                'BirthDate' : 'تاريخ الميلاد'
            },
            'Package': {
                "Name": "الأسم",
                "Type": "النوع",
                "Features": "الخواص",
                "Costs": "القيم"
            },
            'Feature': {
                "Name": "الأسم",
                "Code": "Code",
                "Type": "النوع"
            },
            'PackageFeature': {
                "Points": "النقاط",
                "Feature": "الخاصية"
            },
            'PackageCost': {
                "PeriodFromByMonth": "بداية الفترة بالشهورر",
                "PeriodToByMonth": "نهاية الفترة بالشهور",
                "CostPerMonth": "القيمة الشهر"
            },
            'UserPackage': {
                "NoOfMonths": "عدد الاشهر",
                "Discount": "الخصم",
                "TotalAmount": "القيمة الكلية",
                "PackageAmount": "قيمة الحزمة",
                "StartDate": "تاريخ البداية",
                "ExpiryDate": "تاريخ النهاية",
                "Package": "الحزمة"
            },
            'UserFeature': {
                "Points": "النقاط",
                "DistrbuitedForSubUsers": "الموزع علي المستخدمين التابعين",
                "UsedFromPoints": "المستخدم من النقاط",
                "Package": "الحزمة",
                "Feature": "الخاصية",
                "ExpiryDate": "تاريخ النهاية",
                "User": "المستخدم"
            },
            'Applicant': {
                "ArrangeInterviewLocation": "مكان المقابلة",
                "ArrangeInterviewDate": "تاريخ المقابلة",
                "ArrangeInterviewTime": "وقت المقابلة"
            }
        };
        
        
        
        $translateProvider.translations('en', english);
        $translateProvider.translations('ar', arabic);
        
        $translateProvider.registerAvailableLanguageKeys(['en', 'ar'], {
            'en-US': 'en',
            'ar-EG': 'ar'
        });
        $translateProvider.preferredLanguage('ar');
        //$translateProvider.determinePreferredLanguage();
        
        $translateProvider.useCookieStorage();
        $translateProvider.useLocalStorage();
        
        console.log(navigator.language);

    }
    
    core.run(function ($rootScope) {
        $rootScope.$on('$translateChangeSuccess', function () {
            console.log('Translation Change Success!');
        });
        $rootScope.$on('$translateChangeError', function () {
            console.log('Translation Change Error!');
        });
    });

})();

(function () {
    'use strict';

    angular.module('app').directive('matchPasswordValidationError', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctl) {
                scope.$watch(attrs['matchPasswordValidationError'], function (errorMsg) {
                    elm[0].setCustomValidity(errorMsg);
                    ctl.$setValidity('matchPasswordValidationError', errorMsg ? false : true);
                });
            }
        };
    });

    angular.module('app').directive('widgetHeader', function () {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                'title': '@',
                'hyperlink1': '@',
                'ref': '@',
                'hyperlink2': '@',
                'ref2': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/layout/widgetheader.html',
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('class', 'widget-head');
        }
    });

    angular.module('app').directive('myMap', function () {
            // directive link function
            var link = function (scope, element, attrs) {
                var map, infoWindow;
                var markers = [];

                // map config
                var mapOptions = {
                    center: new google.maps.LatLng(50, 2),
                    zoom: 4,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                };

                // init the map
                function initMap() {
                    if (map === void 0) {
                        map = new google.maps.Map(element[0], mapOptions);
                    }
                }

                // place a marker
                function setMarker(map, position, title, content) {
                    var marker;
                    var markerOptions = {
                        position: position,
                        map: map,
                        title: title,
                        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    };

                    marker = new google.maps.Marker(markerOptions);
                    markers.push(marker); // add marker to array

                    google.maps.event.addListener(marker, 'click', function () {
                        // close window if not undefined
                        if (infoWindow !== void 0) {
                            infoWindow.close();
                        }
                        // create new window
                        var infoWindowOptions = {
                            content: content
                        };
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);
                    });
                }

                // show the map and place some markers
                initMap();

                setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
                setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
                setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
            };

            return {
                restrict: 'A',
                template: '<div id="gmaps"></div>',
                replace: true,
                link: link
            };
        });


})();
angular.module('app').factory('queryBulider', function () {
    //Query builder from the parse tree
    /*
        <expression>  ::=  <term> *( || <term> )
        <term>  ::=  <factor> *( && <factor> )
        <factor>  ::=  <pred>  |  "(" <expression> ")"
        <pred> ::= [!] <var> | <var> (!==|===|==|!=|>=|<=|>|<) ("<string>" | '<string>' | <number> | true | false | null | undefined)
        <var> ::= {a-zA-Z_} *({$_-a-zA-Z0-9})
        <string> ::= "" | {.} *(<string>)
        <number> ::= [-] 1*({0-9}) ["." 1*({0-9})]
    */

    var parseExpression = function (s) {
        var o = parseTerm(s);
        s = o.s.trim();
        var n = o.t;

        var t = { childs: [n] };

        while (s.substr(0, 2) === "||") {
            t.content = "||";
            s = s.substr(2);
            o = parseTerm(s);
            s = o.s.trim();
            n = o.t;
            t.childs.push(n);
        }

        if (!t.content) {
            t = n;
        }

        return { t: t, s: s };
    };

    var parseTerm = function (s) {

        s = s.trim();
        var o = parseFactor(s);
        s = o.s.trim();
        var n = o.t;
        var t = { childs: [n] };

        while (s.substr(0, 2) === '&&') {
            t.content = '&&';
            s = s.substr(2);
            o = parseFactor(s);
            s = o.s.trim();
            n = o.t;
            t.childs.push(n);
        }

        if (!t.content) {
            t = n;
        }

        return { t: t, s: s };
    };

    var parseFactor = function (s) {
        s = s.trim();
        var o;
        if (s.substr(0, 1) === '(') {
            s = s.substr(1);
            o = parseExpression(s);
            s = o.s.trim();
            // remove the close backet )
            if (s.substr(0, 1) !== ')') {
                throw new Error('missing )');
            }
            s = s.substr(1);
        } else if (s.substr(0, 1) === ')') {
            throw new Error('extra )');
        } else {
            o = parsePred(s);
            s = o.s;
        }

        return { s: s, t: o.t };
    };

    var parsePred = function (s) {
        s = s.trim();
        var t = { content: '' };

        if (s.substr(0, 1) === '!') {
            t.content = "!";
            s = s.substr(1);
        }


        var o = parseVar(s);
        s = o.s.trim();

        if (o.ms.trim() === "") {
            throw new Error('missing LHS variable');
        }
        //t.content += o.ms.trim();
        t.childs = [{ content: o.ms.trim() }];

        var comp = "";
        if (s.substr(0, 3) === "===" || s.substr(0, 3) === "!==") {
            comp = s.substr(0, 3);
            s = s.substr(3);
        } else if (s.substr(0, 2) === "==" || s.substr(0, 2) === "!=" || s.substr(0, 2) === ">=" || s.substr(0, 2) === "<=") {
            comp = s.substr(0, 2);
            s = s.substr(2);
        } else if (s.substr(0, 1) === ">" || s.substr(0, 1) === "<") {
            comp = s.substr(0, 1);
            s = s.substr(1);
        }

        if (comp !== "") {
            //t.content += comp;
            t.content = comp;


            s = s.trim();
            if (s.substr(0, 1) === "'") {
                s = s.substr(1);
                o = parseString(s, "'");
                s = o.s.trim();
                if (s.substr(0, 1) !== "'") {
                    throw new Error("missing closing '");
                }
                s = s.substr(1);
                o.ms = o.ms.trim();
            } else if (s.substr(0, 1) === "\"") {
                s = s.substr(1);
                o = parseString(s, "\"");
                s = o.s.trim();
                if (s.substr(0, 1) !== "\"") {
                    throw new Error("missing closing \"");
                }
                s = s.substr(1);
                o.ms = o.ms.trim();
            } else if (s.substr(0, 4) === "true") {
                o.ms = true;
                s = s.substr(4);
            } else if (s.substr(0, 4) === "null") {
                o.ms = null;
                s = s.substr(4);
            } else if (s.substr(0, 5) === "false") {
                s = s.substr(5);
                o.ms = false;
            } else if (s.substr(0, 9) === "undefined") {
                s = s.substr(9);
                o.ms = undefined;
            } else {
                o = parseNumber(s);
                s = o.s;
            }

            //t.content += o.ms.trim();     
            t.childs.push({ content: o.ms });
        }

        if (t.content === "") {
            t.content = t.childs[0].content;
            delete t.childs;
        }

        return { t: t, s: s };


    };

    var parseVar = function (s) {
        s = s.trim();
        var ms = "";
        if (s.substr(0, 1).match(/[a-zA-Z_]/)) {
            ms = s.substr(0, 1);
            s = s.substr(1);

            while (s.substr(0, 1).match(/[a-zA-Z_0-9$\.\-]/)) {
                ms += s.substr(0, 1);
                s = s.substr(1);
            }

        } else {
            throw new Error('invalid character in variable name');
        }

        return { s: s, ms: ms };
    };

    var parseString = function (s, stopChar) {
        var ms = "";
        while (s.substr(0, 1) !== stopChar && s.length !== 0) {
            if (s.substr(0, 2) === '\\' + stopChar) {
                ms += stopChar;
                s = s.substr(2);
            } else {
                ms += s.substr(0, 1);
                s = s.substr(1);
            }
        }
        return { s: s, ms: ms };
    };

    var parseNumber = function (s) {

        s = s.trim();

        var ms = "";
        if (s.substr(0, 1) === "-") {
            ms += "-";
            s = s.substr(1);
        }

        while (s.substr(0, 1).match(/[0-9]/)) {
            ms += s.substr(0, 1);
            s = s.substr(1);
        }

        if (ms === '-' || ms.length === 0) {
            throw new Error('parse RHS variable error');
        }

        if (s.substr(0, 1) === ".") {
            ms += ".";
            s = s.substr(1);

            var c = 0;
            while (s.substr(0, 1).match(/[0-9]/)) {
                ms += s.substr(0, 1);
                s = s.substr(1);
                c++;
            }

            if (c === 0) {
                throw new Error('parse number error');
            }
        }

        return { s: s, ms: parseFloat(ms) };
    };

    var build = function (tree) {

        var query = {};

        var pushChild = function (op, childs) {
            query[op] = [];
            childs.forEach(function (child) {
                query[op].push(build(child));
            });
        };

        // console.log(tree.childs);
        if (tree.content === '||') {
            pushChild('$or', tree.childs);
        } else if (tree.content === '&&') {
            pushChild('$and', tree.childs);
        } else if (tree.content === '===' || tree.content === '==') {
            if (tree.childs[1].content === undefined) {
                query[tree.childs[0].content] = { '$exists': false };
            } else {
                query[tree.childs[0].content] = tree.childs[1].content;
            }
        } else if (tree.content === '!==' || tree.content === '!=') {
            if (tree.childs[1].content === undefined) {
                query[tree.childs[0].content] = { '$exists': true };
            } else {
                query[tree.childs[0].content] = { '$ne': tree.childs[1].content };
            }
        } else if (tree.content === '>') {
            query[tree.childs[0].content] = { '$gt': tree.childs[1].content };
        } else if (tree.content === '>=') {
            query[tree.childs[0].content] = { '$gte': tree.childs[1].content };
        } else if (tree.content === '<') {
            query[tree.childs[0].content] = { '$lt': tree.childs[1].content };
        } else if (tree.content === '<=') {
            query[tree.childs[0].content] = { '$lte': tree.childs[1].content };
        } else if (tree.content === '!') {
            query[tree.childs[0].content] = false;
        } else if (tree.content) {
            query[tree.content] = true;
        }

        return query;
    };

    var parse = function (exp) {
        if (!exp || exp === true || typeof exp === 'string' && exp.trim() === '') {
            return {};
        }

        var o = parseExpression(exp);

        if (o.s !== '') {
            throw new Error('Syntax Error');
        }
        return o.t;
    };

    return {
        qb: function (exp) {
            return build(parse(exp));
        }
    };
});
angular.module('app').factory('mvApplicant', function ($resource,mvIdentity) {
    var ApplicantResource = $resource('/api/applicants/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false},
        getVacancyForApplicant: {
            url: 'api/applicants/getVacancyForApplicant/:jobSeeker/:vacancy', method: 'GET', params: { jobSeeker: '@jobSeeker' , vacancy : "@vacancy" }
        }
    });
    return ApplicantResource;
});
angular.module('app').controller('mvApplicantCtrl', function ($scope,  mvNotifier, mvApplicantRepo,mvApplicant,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.applicant = mvApplicant.get({_id:id },(function(){
        if($scope.applicant.Description) {
            for (var i = 0; i < $scope.applicant.Description.length; i++) {

                if ($scope.applicant.Description[i].Lang == $scope.currentLang) {
                    $scope.descriptionText = $scope.applicant.Description[i].Text;
                    $scope.lang = $scope.applicant.Description[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.applicant = new mvApplicant();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.applicant.Deleted = false;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'},
        {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {
        $scope.loop();
        mvApplicantRepo.updateCurrentApplicant($scope.applicant).then(function () {
            mvNotifier.notify('Applicant has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function(){
        $scope.loop();
        mvApplicantRepo.createApplicant($scope.applicant).then(function () {
            mvNotifier.notify('New Applicant Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#descriptions li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#DescriptionText2");
            $scope.descriptionText = input.val();
            $scope.saveDescription();

        });
    };

   $scope.saveDescription = function () {

        var old = false;
        if($scope.applicant.Description) {
            for (var i = 0; i < $scope.applicant.Description.length; i++) {
                var obj = $scope.applicant.Description[i];

                if ($scope.applicant.Description[i].Lang == $scope.lang) {
                    $scope.applicant.Description[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.applicant.Description)
            {
                $scope.applicant.Description = [];
            }
            var description = {"Lang": $scope.lang, "Text": $scope.descriptionText};
            $scope.applicant.Description.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateDescription = function (applicant) {
      $scope.lang = applicant.Lang;
      $scope.descriptionText = applicant.Text;
    };

    $scope.deleteDescription = function (applicant) {

        for(var i = 0; i < $scope.applicant.Description.length; i++) {
            var obj = $scope.applicant.Description[i];
            console.log("Old" + obj.Lang);
            console.log("New " + applicant.Lang);
            if(applicant.Lang == obj.Lang) {
                $scope.applicant.Description.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.applicant.Description;
        console.log(descriptions);
        descriptions.delete(applicant);
        $scope.applicant.Description = descriptions;



    };*/


});
angular.module('app').controller('mvApplicantDetailCtrl', function ($scope, mvApplicant, $routeParams) {
    $scope.applicant = mvApplicant.get({_id: $routeParams.id});
});
angular.module('app').controller('mvApplicantListCtrl', function ($scope, $translate, mvApplicant, $routeParams,
    mvApplicantRepo, queryBulider, mvNotifier, mvIdentity) {

    //to add new search in accordion 
    //1- add new accordion header and content at html  
    //   change name of the field ,in these blocks I use 'Industry' 
    //2- add list  like one at code #1    
    //3- add block like one at code #2
    //4- add block like one at code #3 
    //5- change name of the field in these blocks I use 'Industry' 
    //6- go to applicants controller at server to change at function getApplicantsSearchResult

    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.vacancyId;

    var SelectedBirthDates = [];
    var BirthDatesHeaderFlag = false;

    if (mvIdentity.currentJobSeeker)
        var jobSeekerId = null;
    if (mvIdentity.currentJobSeeker)
        jobSeekerId = mvIdentity.currentJobSeeker._id;
    debugger;
    if (!jobSeekerId)
        jobSeekerId = 0;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {

        var qr = '';

        // start code #2
        if (SelectedBirthDates.length > 0) {
            var qrBirthDate = '';

            if (SelectedBirthDates[0].flag !== true) {
                for (var y = 0; y < SelectedBirthDates.length; y++) {
                    if (SelectedBirthDates[y].flag) {
                        qrBirthDate += "BirthDate=='" + SelectedBirthDates[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedBirthDates.length; y++) {
                    qrBirthDate += "BirthDate=='" + SelectedBirthDates[y].id + "'||";
                }
            }

            if (qrBirthDate.length > 0) {
                qr += '(' + qrBirthDate.slice(0, -2) + ')&&';
            }
        }
        // end code #2


        if (qr.length > 0) {
            qr = "Vacancy=='" + id + "'&&!Deleted&&(" + qr.slice(0, -2) + ')';
        }
        else {
            qr = "Vacancy=='" + id + "'&&!Deleted";
        }

        mvApplicant.query({
            query: queryBulider.qb(qr),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize,
            jobSeeker: jobSeekerId,
        }, (function (res) {
            $scope.applicants = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.getData();

    var addCheckBoxToDiv = function (id, lab, flag, name, selectedList) {
        var flg = true;
        for (var y = 0; y < selectedList.length; y++) {
            if (selectedList[y].id == id) {
                flg = false;
                break;
            }
        }
        if (flg) {
            selectedList.push({ 'id': id, 'flag': flag });
            var div = document.getElementById(name + 'Div');
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = name;
            checkbox.value = id;
            checkbox.id = id;
            checkbox.checked = flag;

            var label = document.createElement('label');
            label.htmlFor = "id";
            label.appendChild(document.createTextNode(lab));

            var br = document.createElement("br");

            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(br);


            checkbox.addEventListener('change', function (event) {

                var name = checkbox.name;
                var checkboxes = document.getElementsByName(name); //checkbox items                                          

                //uncheck all check boxes when check select all 
                if (checkbox.id == 0) {
                    if ($(this).is(":checked")) {
                        for (i = 1; i < checkboxes.length; i++) {
                            checkboxes[i].checked = false;
                        }
                    } else {
                        checkboxes[0].checked = true;
                    }
                } else {
                    if ($(this).is(":checked")) {
                        checkboxes[0].checked = false;
                    }
                }

                //check "select all" if all checkbox items are checked                
                //if ($('input[name="' + name + '"]:checked').length == checkboxes.length - 1) {
                //    checkboxes[0].checked = true; //change "select all" checked status to true
                //    for (i = 1; i < checkboxes.length; i++) {
                //        checkboxes[i].checked = false;
                //    }
                //}

                //check "select all" if all checkbox items are unchecked                
                if ($('input[name="' + name + '"]:not(:checked)').not(":eq(0)").length == checkboxes.length - 1) {
                    checkboxes[0].checked = true; //change "select all" checked status to true
                }

                for (i = 0; i < checkboxes.length; i++) {
                    $.each(selectedList, function () {
                        if (this.id == checkboxes[i].id) {
                            this.flag = checkboxes[i].checked;
                        }
                    });
                }

                $scope.getData();

            });

        }
    };

    // start code #3
    var BirthDatesHeaderClickFunction = function () {
        if (BirthDatesHeaderFlag) {
            BirthDatesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/applicantsSearchResult",
                data: { groupBy: "JobSeeker.BirthDate", currentLang: $translate.use() ,vacancyId : id},
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'birthDates', SelectedBirthDates);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'birthDates', SelectedBirthDates);
                    });
                }
            });

            BirthDatesHeaderFlag = true;
        }
    }
    $("#birthDatesHeader").click(BirthDatesHeaderClickFunction);
    $(function () {
        $("#birthDateName").autocomplete({
            source: function (request, response) {
                $scope.SelectedBirthDates = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/applicantsSearchResult",
                    data: { groupBy: "JobSeeker.BirthDate", currentLang: $translate.use(), vacancyId: id },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }

                            if (lab == '') {
                                return;
                            }

                            return { label: lab, value: lab, id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'birthDates', SelectedBirthDates);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //end code #3 


    //// accordions start

    var headers = $('#accordion1 .accordion-header');
    var contentAreas = $('#accordion1 .ui-accordion-content').show();
    var expandLink = $('.accordion-expand-all');

    // add the accordion functionality
    headers.click(function () {
        var panel = $(this).next();
        var isOpen = panel.is(':visible');

        // open or close as necessary
        panel[isOpen ? 'slideUp' : 'slideDown']()
            // trigger the correct custom event
            .trigger(isOpen ? 'hide' : 'show');

        // stop the link from causing a pagescroll
        return false;
    });

    // hook up the expand/collapse all
    expandLink.click(function () {
        var isAllOpen = $(this).data('isAllOpen');

        contentAreas[isAllOpen ? 'hide' : 'show']().trigger(isAllOpen ? 'hide' : 'show');
    });

    // when panels open or close, check to see if they're all open
    contentAreas.on({
        // whenever we open a panel, check to see if they're all open
        // if all open, swap the button to collapser
        show: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (isAllOpen) {
                expandLink.text('Collapse All').data('isAllOpen', true);
            }
        },
        // whenever we close a panel, check to see if they're all open
        // if not all open, swap the button to expander
        hide: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (!isAllOpen) {
                expandLink.text('Expand all').data('isAllOpen', false);
            }
        }
    });
    //// accordions end


    $(function () {
        BirthDatesHeaderClickFunction();
    });

});

angular.module('app').factory('mvApplicantRepo', function ($http, $q, mvApplicant,mvIdentity) {
    return {

        createApplicant: function (newApplicantData) {

            var newApplicant = new mvApplicant(newApplicantData);
            newApplicant.CreatedBy = mvIdentity.currentUser;
            newApplicant.Deleted = false;
            newApplicant.JobSeeker = mvIdentity.currentJobSeeker._id;
            var dfd = $q.defer();
            console.log("Saving Applicant");
            newApplicant.$save().then(function () {
                console.log("Applicant Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentApplicant: function (newApplicantData) {
            newApplicantData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newApplicantData);
            angular.extend(clone,newApplicantData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedApplicant', function (mvApplicant) {
    var applicantList;
    return {
        query: function () {
            if (!applicantList) {
                applicantList = mvApplicant.query();
            }
            return applicantList;
        }
    };
});
angular.module('app').controller('mvArrangeInterviewCtrl', function ($scope, mvNotifier, mvApplicantRepo, mvApplicant, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    

    if (id) {
        $scope.applicant = mvApplicant.get({ _id: id }, (function () {
            if ($scope.applicant.Description) {
                for (var i = 0; i < $scope.applicant.Description.length; i++) {

                    if ($scope.applicant.Description[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.applicant.Description[i].Text;
                        $scope.lang = $scope.applicant.Description[i].Lang;
                    }
                }
            }
            $scope.applicant.ArrangeInterviewDate = new Date($scope.applicant.ArrangeInterviewDate);
            $scope.applicant.ArrangeInterviewTime = new Date($scope.applicant.ArrangeInterviewTime);


            $scope.arrangeInterviewDate = new Date($scope.applicant.ArrangeInterviewDate);
            $scope.arrangeInterviewTime = new Date($scope.applicant.ArrangeInterviewTime);

            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.applicant = new mvApplicant();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.applicant.Deleted = false;


    }

    $scope.getName = function (list, lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;

        if (list) {
            for (var i = 0; i < list.length; i++) {

                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };


    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {

        if ($scope.applicant) {
            $scope.applicant.ArrangeInterviewDate = new Date($scope.applicant.ArrangeInterviewDate);
            $scope.applicant.ArrangeInterviewTime = new Date($scope.applicant.ArrangeInterviewTime);

            mvApplicantRepo.updateCurrentApplicant($scope.applicant).then(function () {
                mvNotifier.notify('Applicant has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });

        }
    };

    $scope.add = function () {
        $scope.loop();
        mvApplicantRepo.createApplicant($scope.applicant).then(function () {
            mvNotifier.notify('New Applicant Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function () {

        var listItems = $("#descriptions li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#DescriptionText2");
            $scope.descriptionText = input.val();
            $scope.saveDescription();

        });
    };

    $scope.saveDescription = function () {

        var old = false;
        if ($scope.applicant.Description) {
            for (var i = 0; i < $scope.applicant.Description.length; i++) {
                var obj = $scope.applicant.Description[i];

                if ($scope.applicant.Description[i].Lang == $scope.lang) {
                    $scope.applicant.Description[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if (!old) {
            if (!$scope.applicant.Description) {
                $scope.applicant.Description = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.applicant.Description.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
    /*
   $scope.updateDescription = function (applicant) {
     $scope.lang = applicant.Lang;
     $scope.descriptionText = applicant.Text;
   };

   $scope.deleteDescription = function (applicant) {

       for(var i = 0; i < $scope.applicant.Description.length; i++) {
           var obj = $scope.applicant.Description[i];
           console.log("Old" + obj.Lang);
           console.log("New " + applicant.Lang);
           if(applicant.Lang == obj.Lang) {
               $scope.applicant.Description.splice(i, 1);
               i--;
           }
       }
       /*
       var descriptions = $scope.applicant.Description;
       console.log(descriptions);
       descriptions.delete(applicant);
       $scope.applicant.Description = descriptions;



   };*/


});
angular.module('app').factory('mvPackage', function ($resource,mvIdentity) {
    var PackageResource = $resource('/api/packages/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return PackageResource;
});
angular.module('app').controller('mvPackageCtrl', function ($scope,  $location,mvNotifier, mvPackageRepo,mvPackage,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.Package = mvPackage.get({_id:id },(function(){
        if($scope.Package.Name) {
            for (var i = 0; i < $scope.Package.Name.length; i++) {

                if ($scope.Package.Name[i].Lang == $scope.currentLang) {
                    $scope.nameText = $scope.Package.Name[i].Text;
                    $scope.lang = $scope.Package.Name[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.Package = new mvPackage();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.Package.Deleted = false;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'},
        {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {
        if ($scope.packageForm.$valid) {            
            $scope.loop();
            mvPackageRepo.updateCurrentPackage($scope.Package).then(function () {
                mvNotifier.notify('Package has been updated!');
                $location.path('/packages/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function (){
        if ($scope.packageForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvPackageRepo.createPackage($scope.Package).then(function () {
                mvNotifier.notify('New Package Added!');
                $scope.addEnabled = false;
                $location.path('/packages/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.loop = function(){

        var listItems = $("#names li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();

        });
    };

   $scope.saveName = function () {

        var old = false;
        if($scope.Package.Name) {
            for (var i = 0; i < $scope.Package.Name.length; i++) {
                var obj = $scope.Package.Name[i];

                if ($scope.Package.Name[i].Lang == $scope.lang) {
                    $scope.Package.Name[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.Package.Name)
            {
                $scope.Package.Name = [];
            }
            var name = {"Lang": $scope.lang, "Text": $scope.nameText};
            $scope.Package.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };
 
});
angular.module('app').controller('mvPackageDetailCtrl', function ($scope, mvPackage, $routeParams) {
    $scope.Package = mvPackage.get({_id: $routeParams.id});
});
angular.module('app').controller('mvPackageListCtrl', function ($scope, mvPackage,$translate, mvIdentity, mvPackageRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvPackage.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.industries = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deletePackage = function (Package) {
        var ed = mvPackage.get({ _id: Package._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvPackageRepo.updateCurrentPackage(ed).then(function () {
                mvNotifier.notify('Package has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvPackageRepo', function ($http, $q, mvPackage,mvIdentity) {
    return {

        createPackage: function (newPackageData) {

            var newPackage = new mvPackage(newPackageData);
            newPackage.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Package");
            newPackage.$save().then(function () {
                console.log("Package Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentPackage: function (newPackageData) {
            newPackageData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newPackageData);
            angular.extend(clone,newPackageData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedPackage', function (mvCourse) {
    var PackageList;
    return {
        query: function () {
            if (!PackageList) {
                PackageList = mvPackage.query();
            }
            return PackageList;
        }
    };
});
angular.module('app').factory('mvFeature', function ($resource,mvIdentity) {
    var FeatureResource = $resource('/api/features/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return FeatureResource;
});
angular.module('app').controller('mvFeatureCtrl', function ($scope, $location, mvNotifier, mvPackage, mvPackageFeatureRepo, queryBulider , mvFeatureRepo, mvFeature, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.Feature = mvFeature.get({ _id: id }, (function () {
            if ($scope.Feature.Name) {
                for (var i = 0; i < $scope.Feature.Name.length; i++) {

                    if ($scope.Feature.Name[i].Lang == $scope.currentLang) {
                        $scope.nameText = $scope.Feature.Name[i].Text;
                        $scope.lang = $scope.Feature.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.Feature = new mvFeature();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.Feature.Deleted = false;


    }

    $scope.getName = function (list, lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;

        if (list) {
            for (var i = 0; i < list.length; i++) {

                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };


    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {
        if ($scope.featureForm.$valid) {
            $scope.loop();
            mvFeatureRepo.updateCurrentFeature($scope.Feature).then(function () {
                mvNotifier.notify('Feature has been updated!');
                $location.path('/features/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }

    };

    $scope.add = function () {
        if ($scope.featureForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvFeatureRepo.createFeature($scope.Feature).then(function () {
                mvNotifier.notify('New Feature Added!');
                $scope.addEnabled = false;
                $location.path('/features/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.loop = function () {

        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();

        });
    };

    $scope.saveName = function () {

        var old = false;
        if ($scope.Feature.Name) {
            for (var i = 0; i < $scope.Feature.Name.length; i++) {
                var obj = $scope.Feature.Name[i];

                if ($scope.Feature.Name[i].Lang == $scope.lang) {
                    $scope.Feature.Name[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if (!old) {
            if (!$scope.Feature.Name) {
                $scope.Feature.Name = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.Feature.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };

});
angular.module('app').controller('mvFeatureDetailCtrl', function ($scope, mvFeature, $routeParams) {
    $scope.Feature = mvFeature.get({_id: $routeParams.id});
});
angular.module('app').controller('mvFeatureListCtrl', function ($scope, mvFeature,$translate, mvIdentity, mvFeatureRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvFeature.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.features = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteFeature = function (Feature) {
        var ed = mvFeature.get({ _id: Feature._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvFeatureRepo.updateCurrentFeature(ed).then(function () {
                mvNotifier.notify('Feature has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});

angular.module('app').factory('mvFeatureRepo', function ($http, $q, mvFeature,mvIdentity) {
    return {

        createFeature: function (newFeatureData) {

            var newFeature = new mvFeature(newFeatureData);
            newFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Feature");
            newFeature.$save().then(function () {
                console.log("Feature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentFeature: function (newFeatureData) {
            newFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newFeatureData);
            angular.extend(clone,newFeatureData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedFeature', function (mvCourse) {
    var FeatureList;
    return {
        query: function () {
            if (!FeatureList) {
                FeatureList = mvFeature.query();
            }
            return FeatureList;
        }
    };
});
angular.module('app').factory('mvPackageFeature', function ($resource,mvIdentity) {
    var PackageFeatureResource = $resource('/api/packageFeatures/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return PackageFeatureResource;
});
angular.module('app').controller('mvPackageFeatureCtrl', function ($scope, $location, mvNotifier, mvPackageFeatureRepo, mvPackageFeature, $routeParams, $translate, mvFeature, $rootScope) {

    var pId = $routeParams.pId;
    var id = $routeParams.id;
    $scope.features = mvFeature.query({ currentLang: $rootScope.currentLang });

    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.PackageFeature = mvPackageFeature.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    }
    else {
        if (pId) {
            $scope.PackageFeature = new mvPackageFeature();
            $scope.PackageFeature.Package = pId;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
            $scope.PackageFeature.Deleted = false;
            $scope.PackageFeature.Deleted = false;
        }
    }

    $scope.update = function () {
        if ($scope.packageFeatureForm.$valid) {
            mvPackageFeatureRepo.updateCurrentPackageFeature($scope.PackageFeature).then(function () {
                mvNotifier.notify('PackageFeature has been updated!');
                $location.path('/packageFeatures/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.packageFeatureForm.$valid && $scope.addEnabled) {
            mvPackageFeatureRepo.createPackageFeature($scope.PackageFeature).then(function () {
                mvNotifier.notify('New PackageFeature Added!');
                $scope.addEnabled = false;
                $location.path('/packageFeatures/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});
angular.module('app').controller('mvPackageFeatureDetailCtrl', function ($scope, mvPackageFeature, $routeParams) {
    $scope.PackageFeature = mvPackageFeature.get({_id: $routeParams.pfid});
});
angular.module('app').controller('mvPackageFeatureListCtrl', function ($scope, $routeParams, mvFeature, mvPackage, mvPackageFeature, $translate, mvIdentity, mvPackageFeatureRepo, mvNotifier, queryBulider) {

    $scope.currentUser = mvIdentity.currentUser;
    $scope.pId = $routeParams.pId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 10,
        pageSize: 10
    };

    $scope.getData = function () {
        var packageFeatures = mvPackageFeature.query({
            query: queryBulider.qb("Package=='" + $routeParams.pId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function () {
            var package = mvPackage.get({ _id: $scope.pId }, (function () {

                mvFeature.query({
                    query: queryBulider.qb("Type=='" + package.Type + "'&&!Deleted"),
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (features) {
                        features[0].collection.forEach(function (feature) {
                            if (typeof $scope.searchAtJson(packageFeatures[0].collection, "Feature", feature._id, "_id") == "undefined") {
                            var pf = new mvPackageFeature();
                            pf.Package = $scope.pId;
                            pf.Feature = feature;
                            pf.Points = 0;
                            pf.Deleted = false;
                            packageFeatures[0].collection.push(pf);
                        }
                    });
                    $scope.packageFeatures = packageFeatures[0].collection;
                    $scope.allDataCount = packageFeatures[0].allDataCount;
                }))


            }));
        }));
    };

    $scope.savePackageFeatures = function () {
        $scope.packageFeatures.forEach(function (pf) {
            if (typeof pf._id == "undefined") {

                mvPackageFeatureRepo.createPackageFeature(pf).then(function () {
                    mvNotifier.notify('PackageFeature has been added!');
                    $scope.getData();
                }, function (reason) {
                    mvNotifier.error(reason);
                });

            } else {

                var updatedPF = mvPackageFeature.get({ _id: pf._id }, (function () {
                    updatedPF.Points = pf.Points;
                    mvPackageFeatureRepo.updateCurrentPackageFeature(updatedPF).then(function () {
                        mvNotifier.notify('Package has been updated!');
                        $scope.getData();
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });
                }));

            }

        });

    };

    $scope.getData();

    $scope.searchAtJson = function (obj, searchField, searchVal, returnField) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][searchField]._id == searchVal) {
                return obj[i][returnField];
            }
        }
    };

});


angular.module('app').factory('mvPackageFeatureRepo', function ($http, $q, mvPackageFeature,mvIdentity) {
    return {

        createPackageFeature: function (newPackageFeatureData) {

            var newPackageFeature = new mvPackageFeature(newPackageFeatureData);
            newPackageFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving PackageFeature");
            newPackageFeature.$save().then(function () {
                console.log("PackageFeature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentPackageFeature: function (newPackageFeatureData) {
            newPackageFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newPackageFeatureData);
            angular.extend(clone,newPackageFeatureData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedPackageFeature', function (mvCourse) {
    var PackageFeatureList;
    return {
        query: function () {
            if (!PackageFeatureList) {
                PackageFeatureList = mvPackageFeature.query();
            }
            return PackageFeatureList;
        }
    };
});
angular.module('app').factory('mvPackageCost', function ($resource,mvIdentity) {
    var PackageCostResource = $resource('/api/packageCosts/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return PackageCostResource;
});
angular.module('app').controller('mvPackageCostCtrl', function ($scope, $location, mvNotifier, mvPackageCostRepo, mvPackageCost, $routeParams, $translate, $rootScope) {

    var pId = $routeParams.pId;
    var id = $routeParams.id;

    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.PackageCost = mvPackageCost.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    }
    else {
        if (pId) {
            $scope.PackageCost = new mvPackageCost();
            $scope.PackageCost.Package = pId;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
            $scope.PackageCost.Deleted = false;
            $scope.PackageCost.Deleted = false;
        }
    }

    $scope.update = function () {
        if ($scope.packageCostForm.$valid) {
            mvPackageCostRepo.updateCurrentPackageCost($scope.PackageCost).then(function () {
                mvNotifier.notify('PackageCost has been updated!');
                $location.path('/packageCosts/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.packageCostForm.$valid && $scope.addEnabled) {
            mvPackageCostRepo.createPackageCost($scope.PackageCost).then(function () {
                mvNotifier.notify('New PackageCost Added!');
                $scope.addEnabled = false;
                $location.path('/packageCosts/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});
angular.module('app').controller('mvPackageCostDetailCtrl', function ($scope, mvPackageCost, $routeParams) {
    $scope.PackageCost = mvPackageCost.get({_id: $routeParams.pfid});
});
angular.module('app').controller('mvPackageCostListCtrl', function ($scope,$routeParams, mvPackageCost, $translate, mvIdentity, mvPackageCostRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.pId = $routeParams.pId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvPackageCost.query({
            query: queryBulider.qb("Package=='" + $routeParams.pId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.packageCosts = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deletePackageCost = function (PackageCost) {
        var ed = mvPackageCost.get({ _id: PackageCost._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvPackageCostRepo.updateCurrentPackageCost(ed).then(function () {
                mvNotifier.notify('PackageCost has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});

angular.module('app').factory('mvPackageCostRepo', function ($http, $q, mvPackageCost,mvIdentity) {
    return {

        createPackageCost: function (newPackageCostData) {

            var newPackageCost = new mvPackageCost(newPackageCostData);
            newPackageCost.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving PackageCost");
            newPackageCost.$save().then(function () {
                console.log("PackageCost Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentPackageCost: function (newPackageCostData) {
            newPackageCostData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newPackageCostData);
            angular.extend(clone,newPackageCostData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedPackageCost', function (mvCourse) {
    var PackageCostList;
    return {
        query: function () {
            if (!PackageCostList) {
                PackageCostList = mvPackageCost.query();
            }
            return PackageCostList;
        }
    };
});
angular.module('app').factory('mvUserPackage', function ($resource,mvIdentity) {
    var UserPackageResource = $resource('/api/userPackages/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return UserPackageResource;
});
angular.module('app').controller('mvUserPackageCtrl', function ($scope, mvPackageCost, queryBulider, $location, mvPackage, mvUser, mvNotifier, mvUserPackageRepo, mvUserPackage, $routeParams, $translate, $rootScope) {

    var uId = $scope.uId = $routeParams.uId;

    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();

    if (id) {
        $scope.UserPackage = mvUserPackage.get({ _id: id }, (function () {

            $scope.UserPackage.StartDate = new Date($scope.UserPackage.StartDate);
            $scope.UserPackage.ExpiryDate = new Date($scope.UserPackage.ExpiryDate);

            mvPackage.query({ currentLang: $rootScope.currentLang, userType: $scope.UserPackage.User.UserType[0] }, (function (packs) {
                $scope.packages = packs;
                $scope.startDate = new Date($scope.UserPackage.StartDate);
                $scope.expiryDate = new Date($scope.UserPackage.ExpiryDate);

                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        }));
    }
    else {
        if (uId) {
            $scope.UserPackage = mvUserPackage.query({
                query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 10
            }, (function (res) {

                if (res[0].allDataCount > 0) {
                    $location.path('/userPackages/' + uId);
                }

                mvUser.query({
                    query: queryBulider.qb("_id=='" + $routeParams.uId + "'&&!Deleted"),
                    currentPage: 1,
                    pageSize: 10
                }, (function (users) {
                    mvPackage.query({ currentLang: $rootScope.currentLang, userType: users[0].collection[0].UserType[0] }, (function (packs) {
                        $scope.packages = packs;
                        $scope.UserPackage = new mvUserPackage();
                        $scope.startDate = new Date();
                        $scope.UserPackage.StartDate = new Date($scope.startDate);
                        $scope.updateMode = false;
                        $scope.addMode = true;
                        $scope.addEnabled = true;
                        $scope.UserPackage.User = users[0].collection[0];
                        $scope.UserPackage.Deleted = false;
                        $scope.UserPackage.Deleted = false;
                    }));
                }));

            }));

        }
    }

    $scope.updateFields = function () {
        $scope.expiryDate = undefined;
        $scope.packageAmount = undefined;
        $scope.totalAmount = undefined;

            if ($scope.UserPackage.Package && $scope.UserPackage.NoOfMonths) {
                $scope.expiryDate = new Date(moment($scope.UserPackage.StartDate).add($scope.UserPackage.NoOfMonths, 'month'));
            $scope.UserPackage.ExpiryDate = new Date($scope.expiryDate);

            mvPackageCost.query({
                query: queryBulider.qb("Package=='" + $scope.UserPackage.Package + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 500
            }, (function (res) {
                var flagg = false;
                res[0].collection.forEach(function (entry) {
                    if ($scope.UserPackage.NoOfMonths >= entry.PeriodFromByMonth && $scope.UserPackage.NoOfMonths <= entry.PeriodToByMonth) {
                        $scope.packageAmount = entry.CostPerMonth;
                        $scope.totalAmount = entry.CostPerMonth * $scope.UserPackage.NoOfMonths;
                        $scope.UserPackage.TotalAmount = $scope.totalAmount;
                        $scope.UserPackage.PackageAmount = $scope.packageAmount;
                        flagg = true;
                    }
                });
                if (!flagg) {
                    $scope.packageAmount = undefined;
                    $scope.totalAmount = undefined;
                    $scope.UserPackage.TotalAmount = $scope.totalAmount;
                    $scope.UserPackage.PackageAmount = $scope.packageAmount;
                }
            }));
        }
    };


    $scope.update = function () {
        if ($scope.userPackageForm.$valid) {
            mvUserPackageRepo.createUserPackage($scope.UserPackage).then(function () {
                mvNotifier.notify('UserPackage has been updated!');
                $location.path('/userPackages/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.userPackageForm.$valid && $scope.addEnabled) {
            mvUserPackageRepo.createUserPackage($scope.UserPackage).then(function () {
                mvNotifier.notify('New UserPackage Added!');
                $location.path('/userPackages/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});
angular.module('app').controller('mvUserPackageDetailCtrl', function ($scope, mvUserPackage, $routeParams) {
    $scope.UserPackage = mvUserPackage.get({_id: $routeParams.pfid});
});
angular.module('app').controller('mvUserPackageListCtrl', function ($scope,$routeParams, mvUserPackage, $translate, mvIdentity, mvUserPackageRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.uId = $routeParams.uId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvUserPackage.query({
            query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.userPackages = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deleteUserPackage = function (UserPackage) {
        var ed = mvUserPackage.get({ _id: UserPackage._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvUserPackageRepo.updateCurrentUserPackage(ed).then(function () {
                mvNotifier.notify('UserPackage has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});

angular.module('app').factory('mvUserPackageRepo', function ($http, $q, mvUserPackage,mvIdentity) {
    return {

        createUserPackage: function (newUserPackageData) {

            var newUserPackage = new mvUserPackage(newUserPackageData);
            newUserPackage.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving UserPackage");
            newUserPackage.$save().then(function () {
                console.log("UserPackage Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUserPackage: function (newUserPackageData) {
            newUserPackageData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newUserPackageData);
            angular.extend(clone,newUserPackageData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedUserPackage', function (mvCourse) {
    var UserPackageList;
    return {
        query: function () {
            if (!UserPackageList) {
                UserPackageList = mvUserPackage.query();
            }
            return UserPackageList;
        }
    };
});
angular.module('app').factory('mvUserFeature', function ($resource,mvIdentity) {
    var UserFeatureResource = $resource('/api/userFeatures/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return UserFeatureResource;
});
angular.module('app').controller('mvUserFeatureCtrl', function ($scope, mvFeatureCost, queryBulider, $location, mvFeature, mvUser, mvNotifier, mvUserFeatureRepo, mvUserFeature, $routeParams, $translate, $rootScope) {

    var uId = $scope.uId = $routeParams.uId;

    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();

    if (id) {
        $scope.UserFeature = mvUserFeature.get({ _id: id }, (function () {            
            mvFeature.query({ currentLang: $rootScope.currentLang, userType: $scope.UserFeature.User.UserType[0] }, (function (packs) {
                $scope.features = packs;
                $scope.startDate = new Date($scope.UserFeature.StartDate);
                $scope.expiryDate = new Date($scope.UserFeature.ExpiryDate);
                $scope.updateMode = true;
                $scope.addMode = false;
            }));            
        }));        
    }
    else {
        if (uId) {
            mvUser.query({
                query: queryBulider.qb("_id=='" + $routeParams.uId + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 10
            }, (function (users) {
                mvFeature.query({ currentLang: $rootScope.currentLang, userType: users[0].collection[0].UserType[0] }, (function (packs) {
                    $scope.features = packs;
                    $scope.UserFeature = new mvUserFeature();
                    $scope.startDate = new Date();
                    $scope.UserFeature.StartDate = new Date($scope.startDate);
                    $scope.updateMode = false;
                    $scope.addMode = true;
                    $scope.addEnabled = true;
                    $scope.UserFeature.User = users[0].collection[0];
                    $scope.UserFeature.Deleted = false;
                    $scope.UserFeature.Deleted = false;
                }));
            }));
        }
    }

    $scope.updateFields = function () {
        $scope.expiryDate = undefined;
        $scope.featureAmount = undefined;
        $scope.totalAmount = undefined;

        if ($scope.UserFeature.Feature && $scope.UserFeature.NoOfMonths) {
            $scope.expiryDate = new Date(moment($scope.UserFeature.StartDate).add($scope.UserFeature.NoOfMonths, 'month'));
            $scope.UserFeature.ExpiryDate = new Date($scope.expiryDate);

            mvFeatureCost.query({
                query: queryBulider.qb("Feature=='" + $scope.UserFeature.Feature + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 500
            }, (function (res) {
                var flagg = false;
                res[0].collection.forEach(function (entry) {
                    if ($scope.UserFeature.NoOfMonths >= entry.PeriodFromByMonth && $scope.UserFeature.NoOfMonths <= entry.PeriodToByMonth) {
                        $scope.featureAmount = entry.CostPerMonth;
                        $scope.totalAmount = entry.CostPerMonth * $scope.UserFeature.NoOfMonths;
                        $scope.UserFeature.TotalAmount = $scope.totalAmount;
                        $scope.UserFeature.FeatureAmount = $scope.featureAmount;
                        flagg = true;
                    }
                });
                if (!flagg) {
                    $scope.featureAmount = undefined;
                    $scope.totalAmount = undefined;
                    $scope.UserFeature.TotalAmount = $scope.totalAmount;
                    $scope.UserFeature.FeatureAmount = $scope.featureAmount;
                }
            }));
        }
    };


    $scope.update = function () {
        if ($scope.userFeatureForm.$valid) {
            mvUserFeatureRepo.updateCurrentUserFeature($scope.UserFeature).then(function () {
                mvNotifier.notify('UserFeature has been updated!');
                $location.path('/userFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.userFeatureForm.$valid && $scope.addEnabled) {
            mvUserFeatureRepo.createUserFeature($scope.UserFeature).then(function () {
                mvNotifier.notify('New UserFeature Added!');
                $scope.addEnabled = false;
                $location.path('/userFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});
angular.module('app').controller('mvUserFeatureDetailCtrl', function ($scope, mvUserFeature, $routeParams) {
    $scope.UserFeature = mvUserFeature.get({_id: $routeParams.pfid});
});
angular.module('app').controller('mvUserFeatureListCtrl', function ($scope,$routeParams, mvUserFeature, $translate, mvIdentity, mvUserFeatureRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.uId = $routeParams.uId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvUserFeature.query({
            query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.userFeatures = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deleteUserFeature = function (UserFeature) {
        var ed = mvUserFeature.get({ _id: UserFeature._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvUserFeatureRepo.updateCurrentUserFeature(ed).then(function () {
                mvNotifier.notify('UserFeature has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});

angular.module('app').factory('mvUserFeatureRepo', function ($http, $q, mvUserFeature,mvIdentity) {
    return {

        createUserFeature: function (newUserFeatureData) {

            var newUserFeature = new mvUserFeature(newUserFeatureData);
            newUserFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving UserFeature");
            newUserFeature.$save().then(function () {
                console.log("UserFeature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUserFeature: function (newUserFeatureData) {
            newUserFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newUserFeatureData);
            angular.extend(clone,newUserFeatureData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function (res) {

                dfd.resolve(res);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedUserFeature', function (mvCourse) {
    var UserFeatureList;
    return {
        query: function () {
            if (!UserFeatureList) {
                UserFeatureList = mvUserFeature.query();
            }
            return UserFeatureList;
        }
    };
});
angular.module('app').factory('mvSubUserInvitation', function ($resource,mvIdentity) {
    var SubUserInvitationResource = $resource('/api/subUserInvitations/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return SubUserInvitationResource;
});
angular.module('app').controller('mvSubUserInvitationCtrl', function ($scope, $location, mvNotifier, mvUserFeatureRepo, mvSubUserInvitationRepo, mvSubUserInvitationDetail, mvUserFeature, mvSubUserInvitationDetailRepo, mvSubUserInvitation, mvUserPackage, $routeParams, mvPackageFeature, mvFeature, mvPackage, queryBulider, $translate, mvIdentity) {
    var id = $routeParams.id;
    var curUser = mvIdentity.currentUser._id;
    //$scope.pId = $routeParams.pId;
    //var routeParamspId = '58f6342423b01eec147214e5'
    var routeParamspId = undefined;
    $scope.packageFeaturesMax = undefined;
    //$scope.pId = $routeParams.pId;
    $scope.pId = routeParamspId;
    $scope.maxVal = 0;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.UserFeature = undefined;
    $scope.subInvitationDetail = undefined;
    $scope.packageFeaturesss = [];
    $scope.UserFeature2 = undefined;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.subUserInvitation = mvSubUserInvitation.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.subUserInvitation = new mvSubUserInvitation();
        $scope.subUserInvitation.Status = "O";
        $scope.subUserInvitation.Employer = mvIdentity.currentEmployer;;

        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.subUserInvitation.Deleted = false;


    }

    $scope.getName = function (list, lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;

        if (list) {
            for (var i = 0; i < list.length; i++) {

                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 10,
        pageSize: 10
    };
    //'57f37e81d476e7240ef20e78'
    $scope.getData = function () {

        if (curUser) {
            var datetime = new Date();
            console.log(datetime);
            $scope.UserPackage = mvUserPackage.query({
                query: queryBulider.qb("User=='" + curUser + "'&&!Deleted&&" + "ExpiryDate>=" + Date.now()),
                currentPage: 1,
                pageSize: 10
            }, (function (res) {

                if (res[0].allDataCount > 0) {

                    $scope.UserPackage2 = res[0].collection;
                    $scope.allDataCount2 = res[0].allDataCount;
                    routeParamspId = res[0].collection[0].Package._id;

                    $scope.pId = routeParamspId;

                    //////
                    var packageFeatures = mvPackageFeature.query({
                        query: queryBulider.qb("Package=='" + routeParamspId + "'&&!Deleted"),
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function () {
                        var package = mvPackage.get({ _id: $scope.pId }, (function () {

                            mvFeature.query({
                                query: queryBulider.qb("Type=='" + package.Type + "'&&!Deleted"),
                                currentPage: $scope.paging.currentPage,
                                pageSize: $scope.paging.pageSize
                            }, (function (features) {
                                features[0].collection.forEach(function (feature) {
                                    if (typeof $scope.searchAtJson(packageFeatures[0].collection, "Feature", feature._id, "_id") == "undefined") {
                                        var pf = new mvPackageFeature();
                                        pf.Package = $scope.pId;
                                        pf.Feature = feature;
                                        pf.Points = 0;
                                        pf.Deleted = false;
                                        //$scope.packageFeaturesss = $scope.packageFeatures
                                        $scope.packageFeaturesss = angular.copy(packageFeatures[0].collection);
                                        //angular.extend(clone,);
                                        //$scope.packageFeaturesss = angular.clo .extend(true, {}, packageFeatures[0].collection);
                                        packageFeatures[0].collection.push(pf);
                                    }
                                });
                                $scope.packageFeatures = packageFeatures[0].collection;

                                $scope.allDataCount = packageFeatures[0].allDataCount;
                                //$scope.calculatePoints();



                                $scope.UserFeature = mvUserFeature.query({
                                    //query: queryBulider.qb("User=='" + curUser + "'&&!Deleted&&" + "Package=='" + $scope.packageFeatures[infoIndex].Package + "'&&Feature=='" +
                                    //    $scope.packageFeatures[infoIndex].Feature._id + "'&&" + "ExpiryDate>=" + Date.now()),
                                    query: queryBulider.qb("User=='" + curUser + "'&&!Deleted&&" + "ExpiryDate>=" + Date.now()),
                                    currentPage: $scope.paging.currentPage,
                                    pageSize: $scope.paging.pageSize

                                }, (function (userFeatures) {

                                    userFeatures[0].collection.forEach(function (userfFeatures) {
                                        var i = userfFeatures;
                                        var ii = $scope.packageFeatures;

                                        $.each($scope.packageFeatures, function (i, v) {
                                            var flag = false;
                                            if (v.Feature._id == userfFeatures.Feature._id && v.Package == userfFeatures.Package._id) {
                                                //alert(v);
                                                v.Points = v.Points - userfFeatures.DistrbuitedForSubUsers - userfFeatures.UsedFromPoints
                                                //$scope.maxVal = v.Points;
                                                flag = true;
                                                //alert(v.Points);

                                            }
                                            if (flag == true)
                                                return false;
                                        });
                                    });
                                    $scope.packageFeaturesMax = jQuery.extend(true, {}, $scope.packageFeatures);

                                    $scope.UserFeature2 = userFeatures[0].collection



                                    //if (infoIndex == $scope.packageFeatures.length) infoIndex = 0;
                                    //$scope.userFeatures = userFeatures[0].collection;
                                    //$scope.packageFeatures[infoIndex].Points = $scope.packageFeatures[infoIndex].Points - $scope.userFeatures[0].DistrbuitedForSubUsers - $scope.userFeatures[0].UsedFromPoints
                                    //$scope.allDataCount = userFeatures[0].allDataCount;
                                    //infoIndex++;

                                }));



                            }))


                        }));
                    }));
                }

            }));


        };
    };

    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];


    $scope.lang = $scope.languages[0].value;

    $scope.update = function () {
        if ($scope.subUserInvitationForm.$valid) {


            mvSubUserInvitationRepo.updateCurrentSubUserInvitation($scope.subUserInvitation).then(function () {
                mvNotifier.notify('SubUserInvitation has been updated!');
                $location.path('/subUserInvitations/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }

    };
    $scope.checkData = function (packageFeaturess) {
        //if (packageFeatures.Points > $scope.maxVal)
        //    postMessage('error max valueee');
        $.each($scope.packageFeaturesMax, function (i, v) {
            var flag = false;
            if (v.Feature._id == packageFeaturess.Feature._id && v.Package == packageFeaturess.Package) {
                flag = true;

                if (packageFeaturess.Points > v.Points)
                    packageFeaturess.Points = v.Points;
                //alert("v");
                //v.Points = v.Points - userfFeatures.DistrbuitedForSubUsers - userfFeatures.UsedFromPoints
                //$scope.maxVal = v.Points;

                //alert(v.Points);

            }
            if (flag == true)
                return false;
        });

    }
    $scope.EditData = function (SubUserInvitationObj) {

        //var dfd = $q.defer();
        $scope.subInvitationDetail.SubUserInvitation = SubUserInvitationObj;
        $scope.subInvitationDetail.Points = $scope.packageFeatures[0].Points
        $scope.subInvitationDetail.Feature = $scope.packageFeatures[0].Feature
        $scope.subInvitationDetail.Deleted = false;
        mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {
            mvNotifier.notify('New SubUserInvitationDetails Added!');

            for (infoIndex = 1; infoIndex < $scope.packageFeatures.length; infoIndex++) {
                //$scope.subInvitationDetail[infoIndex].InvitationID += '664644645458yt';
                //$scope.subInvitationDetail[infoIndex].FeatureID += $scope.packageFeatures[infoIndex].Feature._id
                //$scope.subInvitationDetail[infoIndex].Points += $scope.packageFeatures[infoIndex].Points;
                //$scope.subInvitationDetail.push('664644645458yt',)  ;
                //$scope.subInvitationDetail.push({ Points: $scope.packageFeatures[infoIndex].Points, Feature: $scope.packageFeatures[infoIndex].Feature,  Deleted:false })
                //mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {
                //    mvNotifier.notify('New SubUserInvitationDetails Added!');
                //}, function (reason) {
                //    mvNotifier.error(reason);
                //});
                //$scope.subInvitationDetail[infoIndex].Points += ;


                $scope.subInvitationDetail.SubUserInvitation = SubUserInvitationObj;
                $scope.subInvitationDetail.Points = $scope.packageFeatures[infoIndex].Points
                $scope.subInvitationDetail.Feature = $scope.packageFeatures[infoIndex].Feature
                $scope.subInvitationDetail.Deleted = false;
                mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {



                    //mvNotifier.notify('New SubUserInvitationDetails Added!');

                }, function (reason) {
                    mvNotifier.error(reason);
                });

            }
            //$scope.addEnabled = false;
            //$location.path('/subUserInvitations/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
        //return dfd.promise;

    }
    $scope.add = function () {
        if ($scope.subUserInvitationForm.$valid && $scope.addEnabled) {
            mvSubUserInvitationRepo.createSubUserInvitation($scope.subUserInvitation).then(function (SubUserInvitationObj) {


                //mvUserFeatureRepo.updateCurrentUserFeature($scope.UserFeature2).then(function () {
                //    mvNotifier.notify('UserFeature has been updated!');
                //    $location.path('/userFeatures/' + uId);
                //}, function (reason) {
                //    mvNotifier.error(reason);
                //});
                //$scope.UserFeature3 = mvUserFeature.get({ _id: '596778439d67d220184658b6' }, (function () {
                //    $scope.UserFeature3.DistrbuitedForSubUsers += 15;
                //    mvUserFeatureRepo.updateCurrentUserFeature($scope.UserFeature3);

                //}));



                //put save detail here
                var temp1 = $scope.packageFeatures;
                var temp2 = $scope.subInvitationDetail
                $scope.subInvitationDetail = new mvSubUserInvitationDetail();
                var Invitation_id = SubUserInvitationObj._id;
                $scope.EditData(Invitation_id);
                mvNotifier.notify('New SubUserInvitation Added!');
                $scope.subInvitationDetail = new mvSubUserInvitationDetail();


                //$scope.subInvitationDetail.Deleted = false;
                //$scope.subInvitationDetail.Employer = mvIdentity.currentEmployer;;
                //mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {
                //    mvNotifier.notify('New SubUserInvitationDetails Added!');
                //}, function (reason) {
                //    mvNotifier.error(reason);
                //});
                var mail = SubUserInvitationObj.Email;
                //pass distrbuted
                for (infoIndex = 0; infoIndex < $scope.packageFeaturesss.length; infoIndex++) {
                    $.each($scope.UserFeature[0].collection, function (i, v) {
                        var flag = false;
                        if (v.Feature._id == $scope.packageFeaturesss[infoIndex].Feature._id && v.Package._id == $scope.packageFeaturesss[infoIndex].Package) {
                            //v.DistrbuitedForSubUsers += packFeature.Points
                            //var gg = 596778439d67d220184658b6;

                            $scope.UserFeature3 = mvUserFeature.get({ _id: v._id }
                                //$scope.UserFeature3 = mvUserFeature.query({                                           
                                //    query: queryBulider.qb("_id=='" + v._id +"'"),
                                //     currentPage: $scope.paging.currentPage,
                                //     pageSize: $scope.paging.pageSize

                                , (function (UserFeature3) {
                                    //$scope.packageFeaturesss.forEach(function (packFeature) {
                                    //    if (UserFeature3.Feature == packFeature.Feature._id && UserFeature3.Package == packFeature.Package) {
                                    //        UserFeature3.DistrbuitedForSubUsers += packFeature.Points;
                                    //        mvUserFeatureRepo.updateCurrentUserFeature(UserFeature3);
                                    //    }

                                        $.each($scope.packageFeatures, function (i, v2) {
                                            var flag1 = false;
                                            if (UserFeature3.Feature == v2.Feature._id && UserFeature3.Package == v2.Package) {
                                                UserFeature3.DistrbuitedForSubUsers += v2.Points;
                                                mvUserFeatureRepo.updateCurrentUserFeature(UserFeature3);
                                                flag1 = true;
                                            }
                                            if (flag1 == true)
                                                return false;
                                        });


                                    //});


                                }));
                            flag = true;
                            //alert(v.Points);
                        }
                        if (flag == true)
                            return false;
                    })
                }



                $scope.addEnabled = false;
                console.log('Send Message');


                $location.path('/subUserInvitations/');

            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.loop = function () {

        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();

        });
    };

    $scope.saveName = function () {

        var old = false;
        if ($scope.subUserInvitation.Status) {
            for (var i = 0; i < $scope.subUserInvitation.Status.length; i++) {
                var obj = $scope.subUserInvitation.Status[i];

                if ($scope.subUserInvitation.Status[i].Lang == $scope.lang) {
                    $scope.subUserInvitation.Status[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if (!old) {
            if (!$scope.subUserInvitation.Status) {
                $scope.subUserInvitation.Status = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.subUserInvitation.Status.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };
    /*
   $scope.updateName = function (subUserInvitation) {
     $scope.lang = subUserInvitation.Lang;
     $scope.nameText = subUserInvitation.Text;
   };

   $scope.deleteName = function (subUserInvitation) {

       for(var i = 0; i < $scope.subUserInvitation.Status.length; i++) {
           var obj = $scope.subUserInvitation.Status[i];
           console.log("Old" + obj.Lang);
           console.log("New " + subUserInvitation.Lang);
           if(subUserInvitation.Lang == obj.Lang) {
               $scope.subUserInvitation.Status.splice(i, 1);
               i--;
           }
       }
       /*
       var names = $scope.subUserInvitation.Status;
       console.log(names);
       names.delete(subUserInvitation);
       $scope.subUserInvitation.Status = names;



   };*/
    $scope.getData();
    $scope.searchAtJson = function (obj, searchField, searchVal, returnField) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][searchField]._id == searchVal) {
                return obj[i][returnField];
            }
        }
    };
});
angular.module('app').controller('mvSubUserInvitationDetailCtrl', function ($scope, mvSubUserInvitation, $routeParams) {
    $scope.subUserInvitation = mvSubUserInvitation.get({_id: $routeParams.id});
});
angular.module('app').controller('mvSubUserInvitationListCtrl', function ($scope, mvSubUserInvitation,$translate, mvIdentity, mvSubUserInvitationRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvSubUserInvitation.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.subUserInvitations = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    //$scope.deleteSubUserInvitation = function (subUserInvitation) {
    //    var ed = mvSubUserInvitation.get({ _id: subUserInvitation._id }, (function () {
    //        ed.Deleted = true;
    //        ed.DeletedBy = mvIdentity.currentUser;
    //        mvSubUserInvitationRepo.updateCurrentSubUserInvitation(ed).then(function () {
    //            mvNotifier.notify('SubUserInvitation has been deleted!');
    //            $scope.getData();
    //        }, function (reason) {
    //            mvNotifier.error(reason);
    //        });
    //    }));
    //};
      $scope.UpdateStatus = function (subUserInvitation,type) {
          var ed = mvSubUserInvitation.get({ _id: subUserInvitation._id }, (function () {
              if (type == 'Cancel')  
                  ed.Status = "C";    
              else if (type == 'Accept')
                  ed.Status = "A";  
              else if (type == 'Reject')
                  ed.Status = "R";
           
              else  
                  ed.Status = "O";       
            mvSubUserInvitationRepo.updateCurrentSubUserInvitation(ed).then(function () {
                mvNotifier.notify('Status has been updated!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    $scope.getData();

});

angular.module('app').factory('mvSubUserInvitationRepo', function ($http, $q, mvSubUserInvitation,mvIdentity) {
    return {

        createSubUserInvitation: function (newSubUserInvitationData) {

            var newSubUserInvitation = new mvSubUserInvitation(newSubUserInvitationData);
            newSubUserInvitation.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SubUserInvitation");
            newSubUserInvitation.$save().then(function (res) {
                console.log("SubUserInvitation Saved");
                dfd.resolve(res);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSubUserInvitation: function (newSubUserInvitationData) {
            newSubUserInvitationData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSubUserInvitationData);
            angular.extend(clone,newSubUserInvitationData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvSubUserInvitationDetailRepo', function ($http, $q, mvSubUserInvitationDetail,mvIdentity) {
    return {

        createSubUserInvitationDetail: function (newSubUserInvitationDetailData) {

            var newSubUserInvitationDetail = new mvSubUserInvitationDetail(newSubUserInvitationDetailData);
            newSubUserInvitationDetail.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SubUserInvitationDetail");
            newSubUserInvitationDetail.$save().then(function (res) {
                console.log("SubUserInvitationDetail Saved");
                dfd.resolve(res);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSubUserInvitationDetail: function (newSubUserInvitationDetailData) {
            newSubUserInvitationDetailData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSubUserInvitationDetailData);
            angular.extend(clone,newSubUserInvitationDetailData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvSubUserInvitationDetail', function ($resource,mvIdentity) {
    var SubUserInvitationDetailResource = $resource('/api/subUserInvitationDetails/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return SubUserInvitationDetailResource;
});
angular.module('app').factory('mvCachedSubUserInvitation', function (mvCourse) {
    var subUserInvitationList;
    return {
        query: function () {
            if (!subUserInvitationList) {
                subUserInvitationList = mvSubUserInvitation.query();
            }
            return subUserInvitationList;
        }
    };
});
angular.module('app').controller('mvFrontSubUserSignupCtrl', function ($scope, $rootScope, $location, $q,
    mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer,
    mvEmployerRepo, mvSubUserInvitation, mvSubUserInvitationDetail, $routeParams, mvSubUserInvitationRepo, queryBulider, mvSubUserFeature, mvSubUserFeatureRepo) {
    var invitationId = $routeParams.id;

    if (invitationId) {
        $scope.invitation = mvSubUserInvitation.get({ _id: invitationId }, (function () {

            $scope.usertype = "S";
            $scope.email = $scope.invitation.Email;
            //$scope.email = "nnnnnnnnnn@gmail.com"
            $scope.employer = $scope.invitation.Employer;

        }));
    };

    $scope.signup = function () {
        if ($scope.frontSignupForm.$valid) {
            var newUserData = {
                UserName: $scope.email,
                Password: $scope.password,
                FirstName: $scope.firstname,
                LastName: $scope.lastname,
                UserType: $scope.usertype,
                Employer: $scope.employer
            };

            mvSubUserInvitationDetail.query({
                query: queryBulider.qb("SubUserInvitation=='" + $scope.invitation._id + "'&&!Deleted"),
                //currentPage: $scope.paging.currentPage,
                //pageSize: $scope.paging.pageSize
            }, (function (ress) {
                $scope.invitationFeatures = ress[0].collection;
                $scope.allDataCount = ress[0].allDataCount;
                //newUserData._id; subUserFeatures
                mvAuth.createUser(newUserData)
                    .then(function (newUser) {
                        mvNotifier.notify('User account created!');

                        //newUserData._id;            
                        //$scope.invitation._id
                        //pass features to sub user fetures
                        for (infoIndexx = 0; infoIndexx < $scope.invitationFeatures.length; infoIndexx++) {

                            //var newJobSeekerData = {
                            //    User: mvIdentity.currentUser,
                            //    CreatedBy: mvIdentity.currentUser,
                            //    FirstName: name,
                            //    Deleted: false,
                            //    LastName: $scope.lastname
                            //};

                            $scope.mvSubUserFeature = new mvSubUserFeature();
                            $scope.mvSubUserFeature.UsedFromPoints = 0;
                            $scope.mvSubUserFeature.User = newUser._id;
                            $scope.mvSubUserFeature.Points = $scope.invitationFeatures[infoIndexx].Points
                            $scope.mvSubUserFeature.Feature = $scope.invitationFeatures[infoIndexx].Feature
                            $scope.mvSubUserFeature.Deleted = false;
                            mvSubUserFeatureRepo.createSubUserFeature($scope.mvSubUserFeature).then(function (res) {

                            }, function (reason) {
                                mvNotifier.error(reason);
                            });

                        }

                        var type = $scope.usertype;
                        $scope.email = '';
                        $scope.password = '';
                        $scope.firstname = '';
                        $scope.lastname = '';
                        $scope.usertype = '';
                        if ($('#userregisterModal').length) {
                            $('#userregisterModal').modal('hide');
                        }
                        $scope.UpdateStatus($scope.invitation, "Accept");
                        $location.path('/profile');
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });

            }));

        }
    };

    $scope.UpdateStatus = function (subUserInvitation, type) {
        var ed = mvSubUserInvitation.get({ _id: subUserInvitation._id }, (function () {
            if (type == 'Cancel')
                ed.Status = "C";
            else if (type == 'Accept')
                ed.Status = "A";
            else if (type == 'Reject')
                ed.Status = "R";

            else
                ed.Status = "O";
            mvSubUserInvitationRepo.updateCurrentSubUserInvitation(ed).then(function () {
                mvNotifier.notify('Status has been updated!');
                //$scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };


});
angular.module('app').controller('mvDeclineSupUserCtrl', function ($scope, $rootScope, $location, $q,
    mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer,
    mvEmployerRepo, mvSubUserInvitation, $routeParams, mvSubUserInvitationRepo) {
    var invitationId = $routeParams.id;

    if (invitationId) {
       $scope.invitation = mvSubUserInvitation.get({ _id: invitationId }, (function () {
            

           $scope.UpdateStatus($scope.invitation, "Reject");



        }));
    };

   

    $scope.UpdateStatus = function (subUserInvitation, type) {
        var ed = mvSubUserInvitation.get({ _id: subUserInvitation._id }, (function () {
            if (type == 'Cancel')
                ed.Status = "C";
            else if (type == 'Accept')
                ed.Status = "A";
            else if (type == 'Reject')
                ed.Status = "R";

            else
                ed.Status = "O";
            mvSubUserInvitationRepo.updateCurrentSubUserInvitation(ed).then(function () {
                $scope.invitation
                mvNotifier.notify('Status has been updated!');
                $scope.invitation = mvSubUserInvitation.get({ _id: invitationId }, (function () {

                }));
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
       
       
});
angular.module('app').controller('mvSubUserListCtrl', function ($scope, queryBulider, mvNotifier, mvUser) {
    //$scope.users = mvUser.query();
    console.log(mvUser.query());
    //console.log(mvUserPackage.query());
    //console.log($scope.users);

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvUser.query({
            query: queryBulider.qb("UserType=='S'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.users = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    //$scope.deleteCity = function (city) {
    //    var ed = mvUser.get({ _id: city._id }, (function () {
    //        ed.Deleted = true;
    //        ed.DeletedBy = mvIdentity.currentUser;
    //        mvUserRepo.updateCurrentCity(ed).then(function () {
    //            mvNotifier.notify('City has been deleted!');
    //            $scope.getData();
    //        }, function (reason) {
    //            mvNotifier.error(reason);
    //        });
    //    }));
    //};

    $scope.getData();
});
angular.module('app').factory('mvCandidate', function ($resource,mvIdentity) {
    var CandidateResource = $resource('/api/candidates/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return CandidateResource;
});
angular.module('app').controller('mvCandidateCtrl', function ($scope, $location, mvNotifier, mvCandidateRepo, mvCandidate, $routeParams, $translate, mvFeature, $rootScope) {

    var vId = $routeParams.vId;
    var id = $routeParams.id;
    $scope.features = mvFeature.query({ currentLang: $rootScope.currentLang });

    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.Candidate = mvCandidate.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    }
    else {
        if (vId) {
            $scope.Candidate = new mvCandidate();
            $scope.Candidate.Package = vId;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
            $scope.Candidate.Deleted = false;
            $scope.Candidate.Deleted = false;
        }
    }

    $scope.update = function () {
        if ($scope.candidateForm.$valid) {
            mvCandidateRepo.updateCurrentCandidate($scope.Candidate).then(function () {
                mvNotifier.notify('Candidate has been updated!');
                $location.path('/candidates/' + vId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.candidateForm.$valid && $scope.addEnabled) {
            mvCandidateRepo.createCandidate($scope.Candidate).then(function () {
                mvNotifier.notify('New Candidate Added!');
                $scope.addEnabled = false;
                $location.path('/candidates/' + vId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});
angular.module('app').controller('mvCandidateDetailCtrl', function ($scope, mvCandidate, $routeParams) {
    $scope.Candidate = mvCandidate.get({_id: $routeParams.pfid});
});
angular.module('app').controller('mvCandidateListCtrl', function ($scope, $routeParams,mvCandidate, mvVacancy, mvJobSeeker, $translate, mvIdentity, mvCandidateRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    var vId = $routeParams.vId;

    $scope.getData = function () {

        var vacancy = mvVacancy.get({ _id: vId }, (function () {
            var whereString = "SalaryPreference >=" + vacancy.SalaryRangeFrom +
                " && SalaryPreference <= " + vacancy.SalaryRangeTo + "";
                //"' && PreferredCountryOfWork == '" + vacancy.Country +
                //"' && PreferredCityOfWork == '" + vacancy.City +
                ////"' && '" + vacancy.Category + "' == PreferredJobCategory" +
                ////" && '" + vacancy.Industry + "' == PreferredIndustry" +
                //"' && PreferredCareerLevel == '" + vacancy.CareerLevel +
                //"' && PreferredSalaryCurancy == '" + vacancy.SalaryCurancy +
                //"' && PreferredSalaryType == '" + vacancy.SalaryType +
                ////"' && " + vacancy.JobRole + " == PreferredJobRole" +
                //"' && PreferredJobType == '" + vacancy.JobType + "'";
            mvJobSeeker.query({
                
                query: queryBulider.qb(whereString + "&&!Deleted"),
                currentPage: $scope.paging.currentPage,
                pageSize: $scope.paging.pageSize
            }, (function (res) {
                $scope.industries = res[0].collection;
                $scope.allDataCount = res[0].allDataCount;
            }));

        }));

    };

    $scope.deleteCandidate = function (Candidate) {
        var ed = mvCandidate.get({ _id: Candidate._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvCandidateRepo.updateCurrentCandidate(ed).then(function () {
                mvNotifier.notify('Candidate has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});

angular.module('app').factory('mvCandidateRepo', function ($http, $q, mvCandidate,mvIdentity) {
    return {

        createCandidate: function (newCandidateData) {

            var newCandidate = new mvCandidate(newCandidateData);
            newCandidate.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Candidate");
            newCandidate.$save().then(function () {
                console.log("Candidate Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCandidate: function (newCandidateData) {
            newCandidateData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCandidateData);
            angular.extend(clone,newCandidateData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').factory('mvCachedCandidate', function (mvCourse) {
    var CandidateList;
    return {
        query: function () {
            if (!CandidateList) {
                CandidateList = mvCandidate.query();
            }
            return CandidateList;
        }
    };
});
angular.module('app').factory('mvCachedSubUserFeature', function (mvCourse) {
    var SubUserFeatureList;
    return {
        query: function () {
            if (!SubUserFeatureList) {
                SubUserFeatureList = mvSubUserFeature.query();
            }
            return SubUserFeatureList;
        }
    };
});
angular.module('app').factory('mvSubUserFeature', function ($resource, mvIdentity) {
    var SubUserFeatureResource = $resource('/api/subUserFeatures/:_id', { _id: '@id' },
        {
            update: { method: 'PUT', isArray: false }
        });
    return SubUserFeatureResource;
});
angular.module('app').controller('mvSubUserFeatureCtrl', function ($scope, mvFeatureCost, queryBulider, $location, mvFeature, mvUser, mvNotifier, mvSubUserFeatureRepo, mvSubUserFeature, $routeParams, $translate, $rootScope) {

    var uId = $scope.uId = $routeParams.uId;

    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();

    if (id) {
        $scope.SubUserFeature = mvSubUserFeature.get({ _id: id }, (function () {            
            mvFeature.query({ currentLang: $rootScope.currentLang, userType: $scope.SubUserFeature.User.UserType[0] }, (function (packs) {
                $scope.features = packs;
                $scope.startDate = new Date($scope.SubUserFeature.StartDate);
                $scope.expiryDate = new Date($scope.SubUserFeature.ExpiryDate);
                $scope.updateMode = true;
                $scope.addMode = false;
            }));            
        }));        
    }
    else {
        if (uId) {
            mvUser.query({
                query: queryBulider.qb("_id=='" + $routeParams.uId + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 10
            }, (function (users) {
                mvFeature.query({ currentLang: $rootScope.currentLang, userType: users[0].collection[0].UserType[0] }, (function (packs) {
                    $scope.features = packs;
                    $scope.SubUserFeature = new mvSubUserFeature();
                    $scope.startDate = new Date();
                    $scope.SubUserFeature.StartDate = new Date($scope.startDate);
                    $scope.updateMode = false;
                    $scope.addMode = true;
                    $scope.addEnabled = true;
                    $scope.SubUserFeature.User = users[0].collection[0];
                    $scope.SubUserFeature.Deleted = false;
                    $scope.SubUserFeature.Deleted = false;
                }));
            }));
        }
    }

    $scope.updateFields = function () {
        $scope.expiryDate = undefined;
        $scope.featureAmount = undefined;
        $scope.totalAmount = undefined;

        if ($scope.SubUserFeature.Feature && $scope.SubUserFeature.NoOfMonths) {
            $scope.expiryDate = new Date(moment($scope.SubUserFeature.StartDate).add($scope.SubUserFeature.NoOfMonths, 'month'));
            $scope.SubUserFeature.ExpiryDate = new Date($scope.expiryDate);

            mvFeatureCost.query({
                query: queryBulider.qb("Feature=='" + $scope.SubUserFeature.Feature + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 500
            }, (function (res) {
                var flagg = false;
                res[0].collection.forEach(function (entry) {
                    if ($scope.SubUserFeature.NoOfMonths >= entry.PeriodFromByMonth && $scope.SubUserFeature.NoOfMonths <= entry.PeriodToByMonth) {
                        $scope.featureAmount = entry.CostPerMonth;
                        $scope.totalAmount = entry.CostPerMonth * $scope.SubUserFeature.NoOfMonths;
                        $scope.SubUserFeature.TotalAmount = $scope.totalAmount;
                        $scope.SubUserFeature.FeatureAmount = $scope.featureAmount;
                        flagg = true;
                    }
                });
                if (!flagg) {
                    $scope.featureAmount = undefined;
                    $scope.totalAmount = undefined;
                    $scope.SubUserFeature.TotalAmount = $scope.totalAmount;
                    $scope.SubUserFeature.FeatureAmount = $scope.featureAmount;
                }
            }));
        }
    };


    $scope.update = function () {
        if ($scope.subUserFeatureForm.$valid) {
            mvSubUserFeatureRepo.updateCurrentSubUserFeature($scope.SubUserFeature).then(function () {
                mvNotifier.notify('SubUserFeature has been updated!');
                $location.path('/subUserFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.subUserFeatureForm.$valid && $scope.addEnabled) {
            mvSubUserFeatureRepo.createSubUserFeature($scope.SubUserFeature).then(function () {
                mvNotifier.notify('New SubUserFeature Added!');
                $scope.addEnabled = false;
                $location.path('/subUserFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});
angular.module('app').controller('mvSubUserFeatureDetailCtrl', function ($scope, mvSubUserFeature, $routeParams) {
    $scope.SubUserFeature = mvSubUserFeature.get({_id: $routeParams.pfid});
});
angular.module('app').factory('mvSubUserFeatureRepo', function ($http, $q, mvSubUserFeature, mvIdentity) {
    return {

        createSubUserFeature: function (newSubUserFeatureData) {

            var newSubUserFeature = new mvSubUserFeature(newSubUserFeatureData);
            newSubUserFeature.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SubUserFeature");
            newSubUserFeature.$save().then(function () {
                console.log("SubUserFeature Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSubUserFeature: function (newSubUserFeatureData) {
            newSubUserFeatureData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSubUserFeatureData);
            angular.extend(clone, newSubUserFeatureData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function (res) {

                dfd.resolve(res);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});
angular.module('app').controller('mvSubUserFeatureListCtrl', function ($scope,$routeParams, mvSubUserFeature, $translate, mvIdentity, mvSubUserFeatureRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.uId = $routeParams.uId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvSubUserFeature.query({
            query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.subUserFeatures = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deleteSubUserFeature = function (SubUserFeature) {
        var ed = mvSubUserFeature.get({ _id: SubUserFeature._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvSubUserFeatureRepo.updateCurrentSubUserFeature(ed).then(function () {
                mvNotifier.notify('SubUserFeature has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});
