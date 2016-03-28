angular.module('app').controller('mvEmployerCtrl', function ($scope,  mvNotifier, mvEmployerRepo,mvEmployer,$routeParams) {
    var id = $routeParams.id;
    if(id)
    {
        $scope.employer = mvEmployer.get({_id:id });
        $scope.updateMode = true;
        $scope.addMode = false;
    }

    else
    {
        $scope.employer = new mvEmployer();
        $scope.updateMode = false;
        $scope.addMode = true;
    }


    $scope.employerTypes = [{value: 'D', text: 'Direct Employer'},
        {value: 'S', text: 'Staffing Firm'}];
    $scope.employer.EmployerType = $scope.employerTypes[0].value;
    $scope.update = function () {

        mvEmployerRepo.updateCurrentEmployer($scope.employer).then(function () {
            mvNotifier.notify('Employer has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function(){
        mvEmployerRepo.createEmployer($scope.employer).then(function () {
            mvNotifier.notify('New Employer Added!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});