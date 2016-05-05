angular.module('app').controller('mvEducationalInformationDetailCtrl', function ($scope, mvEducationalInformation, $routeParams) {
    $scope.educationalInformation = mvEducationalInformation.get({_id: $routeParams.id});
});