angular.module('app').controller('mvFooterCtrl', function ($scope, mvCourse, mvIdentity,$translate ,  $rootScope) {
        $scope.changeLanguage = function(lang){
        $translate.use(lang);
            $rootScope.currentLang = lang;
            console.log($scope.currentLang);
        $('link[href="site.css"]').attr('href','siteRTL.css');

    };


});