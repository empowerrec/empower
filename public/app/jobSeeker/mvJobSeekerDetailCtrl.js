angular.module('app').controller('mvJobSeekerDetailCtrl', function ($scope, mvJobSeeker,
    $routeParams, $translate) {
    $scope.currentLang = $translate.use();
    $scope.jobSeeker = mvJobSeeker.get({ _id: $routeParams.id });

    $scope.showContactInformation = false;

    $scope.showContactInformationFunction = function () {
        $scope.showContactInformation = true;
    };
});