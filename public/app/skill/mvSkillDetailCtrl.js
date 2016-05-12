angular.module('app').controller('mvSkillDetailCtrl', function ($scope, mvSkill, $routeParams) {
    $scope.skill = mvSkill.get({_id: $routeParams.id});
});