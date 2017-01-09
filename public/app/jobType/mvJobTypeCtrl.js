angular.module('app').controller('mvJobTypeCtrl', function ($scope, mvNotifier, mvJobTypeRepo, mvJobType, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.jobType = mvJobType.get({ _id: id }, (function () {
            if ($scope.jobType.Name) {
                for (var i = 0; i < $scope.jobType.Name.length; i++) {
                    
                    if ($scope.jobType.Name[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.jobType.Name[i].Text;
                        $scope.lang = $scope.jobType.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.jobType = new mvJobType();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.jobType.Deleted = false;
    }
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;
        
        if (list) {
            for (var i = 0; i < list.length; i++) {
                
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];
    
    $scope.lang = $scope.languages[0].value;
    
    
    $scope.update = function () {
        if ($scope.jobTypeForm.$valid) {
            
            $scope.loop();
            mvJobTypeRepo.updateCurrentJobType($scope.jobType).then(function () {
                mvNotifier.notify('JobType has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }

    };
    
    $scope.add = function () {
        if ($scope.jobTypeForm.$valid && $scope.addEnabled) {
            
            $scope.loop();
            
            mvJobTypeRepo.createJobType($scope.jobType).then(function () {
                mvNotifier.notify('New JobType Added!');
                console.log("jj");
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.loop = function () {
        
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.descriptionText = input.val();
            $scope.saveName();

        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.jobType.Name) {
            for (var i = 0; i < $scope.jobType.Name.length; i++) {
                var obj = $scope.jobType.Name[i];
                
                if ($scope.jobType.Name[i].Lang == $scope.lang) {
                    $scope.jobType.Name[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }
        
        if (!old) {
            if (!$scope.jobType.Name) {
                $scope.jobType.Name = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.jobType.Name.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (jobType) {
      $scope.lang = jobType.Lang;
      $scope.descriptionText = jobType.Text;
    };

    $scope.deleteName = function (jobType) {

        for(var i = 0; i < $scope.jobType.Name.length; i++) {
            var obj = $scope.jobType.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + jobType.Lang);
            if(jobType.Lang == obj.Lang) {
                $scope.jobType.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.jobType.Name;
        console.log(descriptions);
        descriptions.delete(jobType);
        $scope.jobType.Name = descriptions;



    };*/


});