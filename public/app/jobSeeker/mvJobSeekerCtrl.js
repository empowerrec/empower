angular.module('app').controller('mvJobSeekerCtrl', function ($scope, $routeParams, mvIdentity, mvJobSeeker, $rootScope) {
    debugger;
    $scope.identity = mvIdentity;
    var id = $routeParams.id;
    var tabName = $routeParams.tab;
    $scope.activeTab = 1;
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.init0 = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id });
        }
    };

    switch (tabName) {
        case 'PersonalInformation':
            $scope.activeTab = 0;
            $scope.init0();
            break;
        case 'EducationalInformation':
            $scope.activeTab = 1;
            break;
        case 'ContactInformation':
            $scope.activeTab = 2;
            $scope.init0();
            break;
        case 'Experiances':
            $scope.activeTab = 3;
            break;
        case 'Adresses':
            $scope.activeTab = 4;
            break;
        case 'Courses':
            $scope.activeTab = 5;
            break;
        case 'LanguageSkills':
            $scope.activeTab = 6;
            break;
        case 'Skills':
            $scope.activeTab = 7;           
            break;
        case 'JobPreferences':
            $scope.activeTab = 8;
            $scope.init0();
            break;
    }
    var added = false;

    $scope.completed = function () {
        if (added)
            return true;
        return false;
    };
    $scope.getStep1Class = function () {
        debugger;
        if (mvIdentity.currentUser.isEmployer() || mvIdentity.currentUser.isAdmin())
            return "completed";
        else
            return "active";
    };
    
    $scope.getStep2Class = function () {
        if (mvIdentity.currentUser.isEmployer() || mvIdentity.currentUser.isAdmin())
            return "completed";
        else
            return "active";
    };
    
    
    $scope.getStep3Class = function () {
        if (mvIdentity.currentUser.isEmployer() && !$scope.completed() || mvIdentity.currentUser.isAdmin() && !$scope.completed())
            return "active";
        else
            return "completed";
    };
    
    
    $scope.getStep4Class = function () {
        if ($scope.completed())
            return "active";
        else
            return "";
    };
    
             
});