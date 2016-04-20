angular.module('app').controller('mvJobTypeCtrl', function ($scope,  mvNotifier, mvJobTypeRepo,mvJobType,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.jobType = mvJobType.get({_id:id },(function(){
        if($scope.jobType.JobTypeName) {
            for (var i = 0; i < $scope.jobType.JobTypeName.length; i++) {

                if ($scope.jobType.JobTypeName[i].Lang == $scope.currentLang) {
                    $scope.descriptionText = $scope.jobType.JobTypeName[i].Text;
                    $scope.lang = $scope.jobType.JobTypeName[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.jobType = new mvJobType();
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
        mvJobTypeRepo.updateCurrentJobType($scope.jobType).then(function () {
            mvNotifier.notify('JobType has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function(){
        $scope.loop();
    
        mvJobTypeRepo.createJobType($scope.jobType).then(function () {
            mvNotifier.notify('New JobType Added!');
            console.log("jj");
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#JobTypeNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#JobTypeNameText2");
            $scope.descriptionText = input.val();
            $scope.saveJobTypeName();

        });
    };

   $scope.saveJobTypeName = function () {

        var old = false;
        if($scope.jobType.JobTypeName) {
            for (var i = 0; i < $scope.jobType.JobTypeName.length; i++) {
                var obj = $scope.jobType.JobTypeName[i];

                if ($scope.jobType.JobTypeName[i].Lang == $scope.lang) {
                    $scope.jobType.JobTypeName[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.jobType.JobTypeName)
            {
                $scope.jobType.JobTypeName = [];
            }
            var description = {"Lang": $scope.lang, "Text": $scope.descriptionText};
            $scope.jobType.JobTypeName.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateJobTypeName = function (jobType) {
      $scope.lang = jobType.Lang;
      $scope.descriptionText = jobType.Text;
    };

    $scope.deleteJobTypeName = function (jobType) {

        for(var i = 0; i < $scope.jobType.JobTypeName.length; i++) {
            var obj = $scope.jobType.JobTypeName[i];
            console.log("Old" + obj.Lang);
            console.log("New " + jobType.Lang);
            if(jobType.Lang == obj.Lang) {
                $scope.jobType.JobTypeName.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.jobType.JobTypeName;
        console.log(descriptions);
        descriptions.delete(jobType);
        $scope.jobType.JobTypeName = descriptions;



    };*/


});