angular.module('app').controller('mvSkillCtrl', function ($scope, $rootScope, mvNotifier, mvSkillRepo, mvSkill, $routeParams
        , $translate, mvIdentity, $location , mvCountryRepo , mvCountry , $q) {
    var id = $routeParams.id;
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    if(id)
    {
            $scope.skill = mvSkill.get({_id:id },(function(){
            $scope.skill.PeriodFrom = new Date($scope.skill.PeriodFrom);
            $scope.skill.PeriodTo = new Date($scope.skill.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.skill = new mvSkill();
        
        if(mvIdentity.currentJobSeeker)
        $scope.skill.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.skill.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    

    $scope.update = function () {
        var countryId = $("#hfValue").val();
        var countryName = $("#search").val();
        if (!countryId) {
            var country = new mvCountry();
           
            country.Name = [];
            
            var countryNameObj = { "Lang": $rootScope.currentLang, "Text": countryName };
            country.Name.push(countryNameObj);
            $q.all([updateSkill()]);

        } else {
            $scope.skill.Country = $("#hfValue").val();
            updateSkill();
        }
        
        


    };
    
    function updateSkill() {
        mvSkillRepo.updateCurrentSkill($scope.skill).then(function () {
            mvNotifier.notify('Skill has been updated!');
            $location.path('/updateJobSeeker/Skills/' + mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }

    function createCountry(country) {
        mvCountryRepo.createCountry(country).then(function (con) {
            console.log(con);
            mvNotifier.notify('New Country Added!');
            $scope.skill.Country = con;
          
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }

    $scope.add = function(){
        mvSkillRepo.createSkill($scope.skill).then(function () {
            mvNotifier.notify('New Skillr Added!');
            $scope.addEnabled = false;
            $location.path('/updateJobSeeker/Skills/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    
    
   
});