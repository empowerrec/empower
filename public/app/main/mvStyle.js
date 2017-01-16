angular.module('app').factory('mvStyle', function (mvIndustry, mvJobType, $rootScope) {

    return {
        getStyleFile:
            function() {
                if ($rootScope.currentLang == 'ar')
                    return "vendor/bootstrap/dist/css/bootstrap-rtl.css";
                else if ($rootScope.currentLang == 'en')
                    return "vendor/bootstrap/dist/css/bootstrap.min.css";
            },getSiteStyleFile : function () {
    console.log($rootScope.currentLang);
    if ($rootScope.currentLang == 'ar')
        return "css/siteRTL.css";
    else if ($rootScope.currentLang == 'en')
        return "css/siteLTR.css";
        },
        getSideBarStyleFile  : function () {
    console.log($rootScope.currentLang);
    if ($rootScope.currentLang == 'ar')
        return "css/simple-sidebarRTL.css";
    else if ($rootScope.currentLang == 'en')
        return "css/simple-sidebar.css";
}
        
   
};
    

});