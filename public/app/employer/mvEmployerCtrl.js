angular.module('app').controller('mvEmployerCtrl', function ($scope,  mvNotifier, mvEmployerRepo,mvEmployer,$routeParams) {

    $scope.employer = mvEmployer.get({_id: $routeParams.id});

    $scope.update = function () {
        mvEmployerRepo.updateCurrentEmployer($scope.employer).then(function () {
            mvNotifier.notify('Your user account has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});