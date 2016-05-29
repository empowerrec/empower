angular.module('app').controller('mvVacancyCtrl', function ($scope,  mvNotifier, mvVacancyRepo,mvVacancy,$routeParams,$translate, mvJobType , mvIndustry , $rootScope) {
    var id = $routeParams.id;

    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.vacancy = mvVacancy.get({_id:id },(function(){
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.vacancy.AvailableFrom = new Date($scope.vacancy.AvailableFrom);
        $scope.vacancy.AvailableTo = new Date($scope.vacancy.AvailableTo);       
    }));


    }

    else
    {
        $scope.vacancy = new mvVacancy();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.vacancy.Deleted = false;

    }
   
    $scope.update = function () {

        mvVacancyRepo.updateCurrentVacancy($scope.vacancy).then(function () {
            mvNotifier.notify('Vacancy has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };





    $scope.deleteEmployerName = function (vacancy) {


    };

    $scope.add = function(){

        mvVacancyRepo.createVacancy($scope.vacancy).then(function () {
            mvNotifier.notify('New Vacancy Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };


});