angular.module('app').controller('mvLanguageSkillDetailCtrl', function ($scope, mvLanguageSkill, $routeParams) {
    $scope.languageSkill = mvLanguageSkill.get({_id: $routeParams.id});
});