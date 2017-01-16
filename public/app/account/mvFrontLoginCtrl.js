angular.module('app').controller('mvFrontLoginCtrl',
    function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth, mvLookup, $translate, $rootScope, mvStyle) {
    $scope.identity = mvIdentity;
    
    $scope.signin = function (username, password, rememberme) {
        if ($scope.frontLoginForm.$valid) {            
            mvAuth.authenticatedUser(username, password, rememberme).then(function (success) {
                if (success) {
                   
                    $scope.username = '';
                    $scope.password = '';
                    mvNotifier.notify('You have successfully signed in');
                    if ($('#userloginModal').length) {
                        $('#userloginModal').modal('hide');
                    }
                    
                } else {
                    mvNotifier.error('Username/Password combination incorrect');
                }
            });
        }
    };
    
    
    $scope.forget = function () {
        
                    if ($('#userloginModal').length) {
                        $('#userloginModal').modal('hide');
                    }
               
    };
    
    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
            $scope.username = '';
            $scope.password = '';
            mvNotifier.notify('You have successfully signed out');
            $location.path('/');
        });
    };

        $scope.changeLanguage = function (lang) {
            debugger;
            $translate.use(lang);
            $rootScope.currentLang = lang;
            mvLookup.getAllLookUps();
            $rootScope.bootstrapFile = mvStyle.getStyleFile();
            $rootScope.siteFile = mvStyle.getSiteStyleFile();
            $rootScope.sideBarFile = mvStyle.getSideBarStyleFile();
            //$route.reload();
            location.reload();
        };


});