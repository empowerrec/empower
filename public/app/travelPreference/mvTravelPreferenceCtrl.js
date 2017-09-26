angular.module('app').controller('mvTravelPreferenceCtrl', function ($scope, mvNotifier, mvTravelPreferenceRepo, mvTravelPreference, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.TravelPreference = mvTravelPreference.get({ _id: id }, (function () {
            if ($scope.TravelPreference.Name) {
                for (var i = 0; i < $scope.TravelPreference.Name.length; i++) {
                    
                    if ($scope.TravelPreference.Name[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.TravelPreference.Name[i].Text;
                        $scope.lang = $scope.TravelPreference.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.TravelPreference = new mvTravelPreference();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.TravelPreference.Deleted = false;
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
        { value: 'ar', text: 'عربى' }
        ];
    
    $scope.lang = $scope.languages[0].value;
    
    
    $scope.update = function () {
        //if ($scope.TravelPreferenceForm.$valid) {
            
            $scope.loop();
            mvTravelPreferenceRepo.updateCurrentTravelPreference($scope.TravelPreference).then(function () {
                mvNotifier.notify('TravelPreference has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}

    };
    
    $scope.add = function () {
        //if ($scope.TravelPreferenceForm.$valid && $scope.addEnabled) {
            
            $scope.loop();
            
            mvTravelPreferenceRepo.createTravelPreference($scope.TravelPreference).then(function () {
                mvNotifier.notify('New TravelPreference Added!');
                console.log("jj");
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
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
        if ($scope.TravelPreference.Name) {
            for (var i = 0; i < $scope.TravelPreference.Name.length; i++) {
                var obj = $scope.TravelPreference.Name[i];
                
                if ($scope.TravelPreference.Name[i].Lang == $scope.lang) {
                    $scope.TravelPreference.Name[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }
        
        if (!old) {
            if (!$scope.TravelPreference.Name) {
                $scope.TravelPreference.Name = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.TravelPreference.Name.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (TravelPreference) {
      $scope.lang = TravelPreference.Lang;
      $scope.descriptionText = TravelPreference.Text;
    };

    $scope.deleteName = function (TravelPreference) {

        for(var i = 0; i < $scope.TravelPreference.Name.length; i++) {
            var obj = $scope.TravelPreference.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + TravelPreference.Lang);
            if(TravelPreference.Lang == obj.Lang) {
                $scope.TravelPreference.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.TravelPreference.Name;
        console.log(descriptions);
        descriptions.delete(TravelPreference);
        $scope.TravelPreference.Name = descriptions;



    };*/


});