angular.module('app').factory('mvLookup'
    , function (mvIndustry, mvJobType, mvGender, mvMaritalStatus, mvMilitaryStatus, mvCarLicenceType,
        mvCountry, mvCity, mvArea, mvCurancy, mvCompanyType, mvEducationType, mvUnivirsty, mvFaculty, 
        mvSpecialization, mvGrade, mvCompanySize,mvTrainingCenter, $rootScope) {
    
    return {
        getAllLookUps: function () {
            $rootScope.jobTypes = mvJobType.query({ currentLang: $rootScope.currentLang });
            $rootScope.industries = mvIndustry.query({ currentLang: $rootScope.currentLang });
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
            $rootScope.educationTypes = mvEducationType.query({ currentLang: $rootScope.currentLang });
            $rootScope.univirsties = mvUnivirsty.query({ currentLang: $rootScope.currentLang });
            $rootScope.faculties = mvFaculty.query({ currentLang: $rootScope.currentLang });
            $rootScope.specializations = mvSpecialization.query({ currentLang: $rootScope.currentLang });
            $rootScope.grades = mvGrade.query({ currentLang: $rootScope.currentLang });            
            $rootScope.trainingCenters = mvTrainingCenter.query({ currentLang: $rootScope.currentLang });
     
        }
    };
});