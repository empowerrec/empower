angular.module('app').controller('mvJobSeekerCtrl', function ($scope, $routeParams, mvIdentity, mvJobSeeker) {
    
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
             
});