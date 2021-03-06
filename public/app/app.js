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
        }).when('/employerdashboard/:id', {
            templateUrl: '/partials/employer/employer-dashboard.html',
            controller: 'mvEmployerDashboardCtrl'
        }).when('/employerdashboard/postedJobs/:id', {
            templateUrl: '/partials/employer/employer-postedJobs-dashboard.html',
            controller: 'mvEmployerPostedJobsDashboardCtrl'
        }).when('/employers/:id', {
            templateUrl: '/partials/employer/employer-detail.html',
            controller: 'mvEmployerDetailCtrl'
        })
        .when('/updateemployer/:id', {
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
        }).when('/updateJobSeeker/PersonalInformation/:id', {
            templateUrl: '/partials/jobSeeker/jobSeekerPersonalInformation.html'
        }).when('/updateJobSeeker/Photo/:id', {
            templateUrl: '/partials/jobSeeker/jobSeekerPhoto.html'
        }).when('/updateJobSeeker/CV/:id', {
            templateUrl: '/partials/jobSeeker/jobSeekerCV.html'
        }).when('/updateJobSeeker/ContactInformation/:id', {
            templateUrl: '/partials/jobSeeker/jobSeekerContactInformation.html'
        }).when('/updateJobSeeker/ProfessionalOverview/:id', {
            templateUrl: '/partials/jobSeeker/jobSeekerProfessionalOverview.html'
        }).when('/updateJobSeeker/Refrances/:id', {
            templateUrl: '/partials/jobSeeker/jobSeekerRefrances.html'
        }).when('/updateJobSeeker/JobSeekerJobPreferences/:id', {
            templateUrl: '/partials/jobSeeker/jobSeekerJobPreferences.html'
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
        }).when('/membershipAndAwards/:id', {
            templateUrl: '/partials/membershipAndAward/membershipAndAward-detail',
            controller: 'mvMembershipAndAwardDetailCtrl'
        }).when('/updateMembershipAndAward/:id', {
            templateUrl: '/partials/membershipAndAward/membershipAndAward',
            controller: 'mvMembershipAndAwardCtrl'
        }).when('/addMembershipAndAward', {
            templateUrl: '/partials/membershipAndAward/membershipAndAward',
            controller: 'mvMembershipAndAwardCtrl'
        }).when('/membershipAndAwards', {
            templateUrl: '/partials/membershipAndAward/membershipAndAward-list.html',
            controller: 'mvMembershipAndAwardListCtrl'
        }).when('/interests/:id', {
            templateUrl: '/partials/interest/interest-detail',
            controller: 'mvInterestDetailCtrl'
        }).when('/updateInterest/:id', {
            templateUrl: '/partials/interest/interest',
            controller: 'mvInterestCtrl'
        }).when('/addInterest', {
            templateUrl: '/partials/interest/interest',
            controller: 'mvInterestCtrl'
        }).when('/interests', {
            templateUrl: '/partials/interest/interest-list.html',
            controller: 'mvInterestListCtrl'
        }).when('/professionalCertifications/:id', {
            templateUrl: '/partials/professionalCertification/professionalCertification-detail',
            controller: 'mvProfessionalCertificationDetailCtrl'
        }).when('/updateProfessionalCertification/:id', {
            templateUrl: '/partials/professionalCertification/professionalCertification',
            controller: 'mvProfessionalCertificationCtrl'
        }).when('/addProfessionalCertification', {
            templateUrl: '/partials/professionalCertification/professionalCertification',
            controller: 'mvProfessionalCertificationCtrl'
        }).when('/professionalCertifications', {
            templateUrl: '/partials/professionalCertification/professionalCertification-list.html',
            controller: 'mvProfessionalCertificationListCtrl'
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
        }).when('/nationalities/:id', {
            templateUrl: '/partials/nationalities/educationalInformatio-detail',
            controller: 'mvNationalityDetailCtrl'
        }).when('/updateNationality/:id', {
            templateUrl: '/partials/nationality/nationality',
            controller: 'mvNationalityCtrl'
        }).when('/addNationality', {
            templateUrl: '/partials/nationality/nationality',
            controller: 'mvNationalityCtrl'
        }).when('/nationalities', {
            templateUrl: '/partials/nationality/nationality-list.html',
            controller: 'mvNationalityListCtrl'
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
        }).when('/vacancyApplicants/:vacancyId/:status', {
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
        }).when('/packageCosts/:pId/:id', {
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
        }).when('/userFeatures/:uId/:id', {
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
        }).when('/subUserFeatures/:uId/:id', {
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