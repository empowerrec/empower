angular.module('app').controller('mvJobRoleCtrl', function ($scope,  mvNotifier, mvJobRoleRepo,mvJobRole,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.jobRole = mvJobRole.get({_id:id },(function(){
        if($scope.jobRole.JobRoleName) {
            for (var i = 0; i < $scope.jobRole.JobRoleName.length; i++) {

                if ($scope.jobRole.JobRoleName[i].Lang == $scope.currentLang) {
                    $scope.descriptionText = $scope.jobRole.JobRoleName[i].Text;
                    $scope.lang = $scope.jobRole.JobRoleName[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.jobRole = new mvJobRole();
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


    $scope.update = function () {
        $scope.loop();
        mvJobRoleRepo.updateCurrentJobRole($scope.jobRole).then(function () {
            mvNotifier.notify('JobRole has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function(){
        $scope.loop();
    
        mvJobRoleRepo.createJobRole($scope.jobRole).then(function () {
            mvNotifier.notify('New JobRole Added!');
            console.log("jj");
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#JobRoleNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#JobRoleNameText2");
            $scope.descriptionText = input.val();
            $scope.saveJobRoleName();

        });
    };

   $scope.saveJobRoleName = function () {

        var old = false;
        if($scope.jobRole.JobRoleName) {
            for (var i = 0; i < $scope.jobRole.JobRoleName.length; i++) {
                var obj = $scope.jobRole.JobRoleName[i];

                if ($scope.jobRole.JobRoleName[i].Lang == $scope.lang) {
                    $scope.jobRole.JobRoleName[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.jobRole.JobRoleName)
            {
                $scope.jobRole.JobRoleName = [];
            }
            var description = {"Lang": $scope.lang, "Text": $scope.descriptionText};
            $scope.jobRole.JobRoleName.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateJobRoleName = function (jobRole) {
      $scope.lang = jobRole.Lang;
      $scope.descriptionText = jobRole.Text;
    };

    $scope.deleteJobRoleName = function (jobRole) {

        for(var i = 0; i < $scope.jobRole.JobRoleName.length; i++) {
            var obj = $scope.jobRole.JobRoleName[i];
            console.log("Old" + obj.Lang);
            console.log("New " + jobRole.Lang);
            if(jobRole.Lang == obj.Lang) {
                $scope.jobRole.JobRoleName.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.jobRole.JobRoleName;
        console.log(descriptions);
        descriptions.delete(jobRole);
        $scope.jobRole.JobRoleName = descriptions;



    };*/


});