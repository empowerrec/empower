angular.module('app').controller('mvMainHeadCtrl', function ($scope , $rootScope) {
    $scope.styleFile = "vendor/bootstrap/dist/css/bootstrap.min.css";
    $scope.rtlstyleFile = "vendor/bootstrap/dist/css/bootstrap-rtl.css";
    
    $scope.getStyleFile = function () {
        console.log($rootScope.currentLang);
        if($rootScope.currentLang == 'ar')
            return "vendor/bootstrap/dist/css/bootstrap-rtl.css";
        else if ($rootScope.currentLang == 'en')
            return "vendor/bootstrap/dist/css/bootstrap.min.css";
    };

    $scope.getSiteStyleFile = function () {
        console.log($rootScope.currentLang);
        if ($rootScope.currentLang == 'ar')
            return "css/siteRTL.css";
        else if ($rootScope.currentLang == 'en')
            return "css/site.css";
    };
    
    $scope.getSideBarStyleFile = function () {
        console.log($rootScope.currentLang);
        if ($rootScope.currentLang == 'ar')
            return "css/simple-sidebarRTL.css";
        else if ($rootScope.currentLang == 'en')
            return "css/simple-sidebar.css";
    };
});

