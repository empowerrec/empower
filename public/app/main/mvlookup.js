angular.module('app').factory('mvLookup', function (mvIndustry, mvJobType, mvCountry, mvCurancy,$rootScope) {

    return {
        getAllLookUps:
            function (){
            $rootScope.jobTypes = mvJobType.query({ currentLang: $rootScope.currentLang });
            $rootScope.industries = mvIndustry.query({ currentLang: $rootScope.currentLang });
            $rootScope.countries = mvCountry.query({ currentLang: $rootScope.currentLang });
            $rootScope.curancies = mvCurancy.query({ currentLang: $rootScope.currentLang });


            }
    };
});