angular.module('app').controller('mvProfessionalCertificationDetailCtrl', function ($scope, mvProfessionalCertification, $routeParams) {
    $scope.professionalCertification = mvProfessionalCertification.get({_id: $routeParams.id});
});