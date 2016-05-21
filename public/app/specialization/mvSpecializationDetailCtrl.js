angular.module('app').controller('mvSpecializationDetailCtrl', function ($scope, mvSpecialization, $routeParams) {
    $scope.specialization = mvSpecialization.get({_id: $routeParams.id});
});