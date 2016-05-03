angular.module('app').controller('mvExperiancerCtrl', function ($scope,  mvNotifier, mvExperianceRepo, mvExperiance,$routeParams,$translate, mvIdentity, $location) {
    var id = $routeParams.id;
    $scope.experianceNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
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
        console.log(mvIdentity.currentJobSeeker._id);
        $scope.experiance.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'},
        {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;



    $scope.experianceTypes = [{value: 'D', text: 'Direct Experiancer'},
        {value: 'S', text: 'Staffing Firm'}];
    $scope.experiance.ExperiancerType = $scope.experianceTypes[0].value;

    $scope.update = function () {
        $scope.loop();
        mvExperianceRepo.updateCurrentExperiance($scope.experiance).then(function () {
            mvNotifier.notify('Experiancer has been updated!');
            $location.path('/updateJobSeeker/Experiances/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.saveExperiancerName = function () {

        var old = false;
        if($scope.experiance.ExperiancerName) {
            for (var i = 0; i < $scope.experiance.ExperiancerName.length; i++) {
                var obj = $scope.experiance.ExperiancerName[i];

                if ($scope.experiance.ExperiancerName[i].Lang == $scope.lang) {
                    $scope.experiance.ExperiancerName[i].Text = $scope.experianceNameText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.experiance.ExperiancerName)
            {
                $scope.experiance.ExperiancerName = [];
            }
            var experianceName = {"Lang": $scope.lang, "Text": $scope.experianceNameText};
            $scope.experiance.ExperiancerName.push(experianceName);
        }
        $scope.experianceNameText = "";
        $scope.lang = "";

    };

    $scope.updateExperiancerName = function (experiance) {
      $scope.lang = experiance.Lang;
      $scope.experianceNameText = experiance.Text;
    };

    $scope.deleteExperiancerName = function (experiance) {

        for(var i = 0; i < $scope.experiance.ExperiancerName.length; i++) {
            var obj = $scope.experiance.ExperiancerName[i];
            console.log("Old" + obj.Lang);
            console.log("New " + experiance.Lang);
            if(experiance.Lang == obj.Lang) {
                $scope.experiance.ExperiancerName.splice(i, 1);
                i--;
            }
        }
        /*
        var experianceNames = $scope.experiance.ExperiancerName;
        console.log(experianceNames);
        experianceNames.delete(experiance);
        $scope.experiance.ExperiancerName = experianceNames;
        */


    };

    $scope.add = function(){
        $scope.loop();
        mvExperianceRepo.createExperiance($scope.experiance).then(function () {
            mvNotifier.notify('New Experiancer Added!');
            $scope.addEnabled = false;
            $location.path('/updateJobSeeker/Experiances/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#experianceNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#ExperiancerNameText2");
            $scope.experianceNameText = input.val();
            $scope.saveExperiancerName();

        });
    };
});