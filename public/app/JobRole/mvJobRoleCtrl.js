angular.module('app').controller('mvJobRoleCtrl', function ($scope,  mvNotifier, mvJobRoleRepo,mvJobRole,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.jobRole = mvJobRole.get({_id:id },(function(){
        if($scope.jobRole.Name) {
            for (var i = 0; i < $scope.jobRole.Name.length; i++) {

                if ($scope.jobRole.Name[i].Lang == $scope.currentLang) {
                    $scope.descriptionText = $scope.jobRole.Name[i].Text;
                    $scope.lang = $scope.jobRole.Name[i].Lang;
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
        $scope.jobRole.Deleted = false;


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

        var listItems = $("#Names li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.descriptionText = input.val();
            $scope.saveName();

        });
    };

   $scope.saveName = function () {

        var old = false;
        if($scope.jobRole.Name) {
            for (var i = 0; i < $scope.jobRole.Name.length; i++) {
                var obj = $scope.jobRole.Name[i];

                if ($scope.jobRole.Name[i].Lang == $scope.lang) {
                    $scope.jobRole.Name[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.jobRole.Name)
            {
                $scope.jobRole.Name = [];
            }
            var description = {"Lang": $scope.lang, "Text": $scope.descriptionText};
            $scope.jobRole.Name.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (jobRole) {
      $scope.lang = jobRole.Lang;
      $scope.descriptionText = jobRole.Text;
    };

    $scope.deleteName = function (jobRole) {

        for(var i = 0; i < $scope.jobRole.Name.length; i++) {
            var obj = $scope.jobRole.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + jobRole.Lang);
            if(jobRole.Lang == obj.Lang) {
                $scope.jobRole.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.jobRole.Name;
        console.log(descriptions);
        descriptions.delete(jobRole);
        $scope.jobRole.Name = descriptions;



    };*/


});