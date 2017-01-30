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

        //$route.reload();
        location.reload();
    };

});