angular.module('app').controller('mvSkillCtrl', function ($scope, $routeParams, mvLanguageSkill,mvIdentity) {
    
    $scope.active = 0;
    $scope.currentUser = mvIdentity.currentUser;
    $scope.languageSkills = mvLanguageSkill.query();
    //$scope.addresses = mvAddress.query();
    //$scope.courses = mvCourse.query();
    console.log($routeParams.tab);
    switch ($routeParams.tab) {
        case 'Language Skills':
            $scope.active = 0;
            break;
        case 'Skills':
            $scope.active = 1;
            break;
       
        //case 'Experiances':
        //    $scope.active = 3;
        //    break;        
    }
});