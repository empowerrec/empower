angular.module('app').factory('mvLookup'
    , function (mvIndustry, mvJobType, mvGender,mvHearAboutUs, mvMaritalStatus, mvMilitaryStatus, mvCarLicenceType,
        mvCountry, mvCity, mvLanguage,  mvArea, mvCurancy, mvCompanyType, mvUnivirsty, mvFaculty, 
        mvSpecialization, mvGrade, mvReligion, mvVisaStatus, mvContactVia, mvCompanySize,
        mvTrainingCenter, mvEducationalLevel, mvNationality, mvJobRole, mvCareerLevel, $rootScope,
        mvSkillType, mvSkillLevel, mvLanguageLevel, mvReferenceRelationship, mvTravelPreference) {
    
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
            $rootScope.hearAboutUss = mvHearAboutUs.query({ currentLang: $rootScope.currentLang });
            $rootScope.contactVias = mvContactVia.query({ currentLang: $rootScope.currentLang });
            $rootScope.maritalStatuses = mvMaritalStatus.query({ currentLang: $rootScope.currentLang });
            $rootScope.religions = mvReligion.query({ currentLang: $rootScope.currentLang });
            $rootScope.visaStatuses = mvVisaStatus.query({ currentLang: $rootScope.currentLang });
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
            $rootScope.nationalities = mvNationality.query({ currentLang: $rootScope.currentLang });
            $rootScope.referenceRelationships = mvReferenceRelationship.query({ currentLang: $rootScope.currentLang });
            $rootScope.travelPreference = mvTravelPreference.query({ currentLang: $rootScope.currentLang });


        }
    };
});