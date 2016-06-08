angular.module('app').controller('mvExperianceCtrl', function ($scope, $rootScope, mvNotifier, mvExperianceRepo, mvExperiance, $routeParams
        , $translate, mvIdentity, $location ) {
    var id = $routeParams.id;
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    if(id)
    {
            $scope.experiance = mvExperiance.get({_id:id },(function(){
            $scope.experiance.PeriodFrom = new Date($scope.experiance.PeriodFrom);
            $scope.experiance.PeriodTo = new Date($scope.experiance.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.experiance = new mvExperiance();
        
        if(mvIdentity.currentJobSeeker)
            $scope.experiance.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.experiance.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    

    $scope.update = function () {
       
            updateExperiance();
       
    };
    
    function updateExperiance() {
        mvExperianceRepo.updateCurrentExperiance($scope.experiance).then(function () {
            mvNotifier.notify('Experiancer has been updated!');
            $location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }

    

    $scope.add = function(){
        mvExperianceRepo.createExperiance($scope.experiance).then(function () {
            mvNotifier.notify('New Experiancer Added!');
            $scope.addEnabled = false;
            $location.path('/updateJobSeeker/Experiances/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    
    
   
});