angular.module('app').factory('mvLookup', function (mvIndustry, mvJobType, $rootScope) {

    return {
        getAllLookUps:
            function (){
                $rootScope.jobTypes = mvJobType.query({ currentLang: $rootScope.currentLang });
                $rootScope.industries = mvIndustry.query({ currentLang: $rootScope.currentLang });


            }
    };
});