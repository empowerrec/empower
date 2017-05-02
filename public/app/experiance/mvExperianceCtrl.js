angular.module('app').controller('mvExperianceCtrl', function ($scope, $rootScope, mvNotifier, mvExperianceRepo, mvExperiance, $routeParams
    , $translate, mvIdentity, $location, mvJobSeekerRepo) {
    
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    
    $scope.experiance = new mvExperiance();
        
    if(mvIdentity.currentJobSeeker)
            $scope.experiance.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.experiance.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateExperiance = function updateExperiance(experiane) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        experiane.PeriodFrom = new Date(experiane.PeriodFrom)
        experiane.PeriodTo = new Date(experiane.PeriodTo)
        $scope.experiance = experiane;
    }

    $scope.addExperiance = function addExperiance() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.experiance = new mvExperiance();
        
    }

    $scope.deleteExperiance = function (experiane) {

        var array = $rootScope.jobSeeker.Experiances;

        $rootScope.jobSeeker.Experiances.forEach(function (element) {
            if (element._id == experiane._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var experiance = {
            Company: $scope.experiance.Company,
            JobSeeker: $scope.experiance.JobSeeker,
            CompanySize: $scope.experiance.CompanySize,
            CompanyType: $scope.experiance.CompanyType,
            Country: $scope.experiance.Country,
            Position: $scope.experiance.Position,
            Salary: $scope.experiance.Salary,
            Achievements: $scope.experiance.Achievements,
            FunctionalTasks: $scope.experiance.FunctionalTasks,
            PeriodFrom: $scope.experiance.PeriodFrom,
            PeriodTo: $scope.experiance.PeriodTo,
            Current: $scope.experiance.Current
        };
        if ($rootScope.jobSeeker.Experiances == undefined)
            $rootScope.jobSeeker.Experiances = [];

        $rootScope.jobSeeker.Experiances.push(experiance);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);
                    
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var experiance = {
            Company: $scope.experiance.Company,
            JobSeeker: $scope.experiance.JobSeeker,
            CompanySize: $scope.experiance.CompanySize,
            CompanyType: $scope.experiance.CompanyType,
            Country: $scope.experiance.Country,
            Position: $scope.experiance.Position,
            Salary: $scope.experiance.Salary,
            Achievements: $scope.experiance.Achievements,
            FunctionalTasks: $scope.experiance.FunctionalTasks,
            PeriodFrom: new Date($scope.experiance.PeriodFrom),
            PeriodTo: new Date($scope.experiance.PeriodTo),
            Current: $scope.experiance.Current,
            _id :  $scope.experiance._id
        };

        var array = $rootScope.jobSeeker.Experiances;

        $rootScope.jobSeeker.Experiances.forEach(function (element) {
            if (element._id == experiance._id) {
                var index = array.indexOf(element);
                array[index] = experiance;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };



    
   
});