angular.module('app').controller('mvFooterCtrl', function ($scope, mvCourse, mvIdentity,$translate) {
    $scope.identity = mvIdentity;
    $scope.courses = mvCourse.query();
    $scope.changeLanguage = function(lang){
        $translate.use(lang);

        $('link[href="site.css"]').attr('href','siteRTL.css');

    };


});