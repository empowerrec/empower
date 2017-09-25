angular.module('app').controller('mvNationalityCtrl', function ($scope, mvNotifier, mvNationalityRepo, mvNationality, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    
    if (id) {
        $scope.nationality = mvNationality.get({ _id: id }, (function () {
            if ($scope.nationality.Name) {
                for (var i = 0; i < $scope.nationality.Name.length; i++) {
                    if ($scope.nationality.Name[i].Lang == $scope.currentLang) {
                        $scope.nameText = $scope.nationality.Name[i].Text;
                        $scope.lang = $scope.nationality.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.nationality = new mvNationality();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.nationality.Deleted = false;
    }
    
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'ÚÑÈì' },
        { value: 'fr', text: 'French' }];
    
    $scope.lang = $scope.languages[0].value;
    
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
    
    $scope.update = function () {
        //if ($scope.nationalityForm.$valid) {
            $scope.loop();
            mvNationalityRepo.updateCurrentNationality($scope.nationality).then(function () {
                mvNotifier.notify('Nationality has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.add = function () {
        //if ($scope.nationalityForm.$valid && $scope.addEnabled) {            
            $scope.loop();
            mvNationalityRepo.createNationality($scope.nationality).then(function () {
                mvNotifier.notify('New Nationality Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.loop = function () {
        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        var old = false;
        if ($scope.nationality.Name) {
            for (var i = 0; i < $scope.nationality.Name.length; i++) {
                if ($scope.nationality.Name[i].Lang == $scope.lang) {
                    $scope.nationality.Name[i].Text = $scope.nameText;
                    old = true;
                }
            }
        }
        
        if (!old) {
            if (!$scope.nationality.Name) {
                $scope.nationality.Name = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.nationality.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };

});