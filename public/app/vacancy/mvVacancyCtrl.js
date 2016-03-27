angular.module('app').controller('mvVacancyCtrl', function ($scope,  mvNotifier, mvVacancyRepo,mvVacancy,$routeParams) {

    $scope.vacancy = mvVacancy.get({_id: $routeParams.id});

    $scope.update = function () {
        mvVacancyRepo.updateCurrentVacancy($scope.vacancy).then(function () {
            mvNotifier.notify('Your Vacancy has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});