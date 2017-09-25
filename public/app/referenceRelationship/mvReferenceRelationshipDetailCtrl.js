angular.module('app').controller('mvreferenceRelationshipDetailCtrl', function ($scope, mvreferenceRelationship, $routeParams) {
    $scope.referenceRelationship = mvreferenceRelationship.get({_id: $routeParams.id});
});