angular.module('app').controller('mvFooterCtrl', function ($scope, mvCourse, mvIdentity,$translate) {
        $scope.changeLanguage = function(lang){
        $translate.use(lang);

        $('link[href="site.css"]').attr('href','siteRTL.css');

    };


});