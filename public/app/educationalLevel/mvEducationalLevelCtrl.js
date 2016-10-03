angular.module('app').controller('mvEducationalLevelCtrl', function ($scope, mvNotifier, mvEducationalLevelRepo, mvEducationalLevel, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    
    if (id) {
        $scope.educationalLevel = mvEducationalLevel.get({ _id: id }, (function () {
            if ($scope.educationalLevel.Name) {
                for (var i = 0; i < $scope.educationalLevel.Name.length; i++) {
                    if ($scope.educationalLevel.Name[i].Lang == $scope.currentLang) {
                        $scope.nameText = $scope.educationalLevel.Name[i].Text;
                        $scope.lang = $scope.educationalLevel.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.educationalLevel = new mvEducationalLevel();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
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
        if ($scope.educationalLevelForm.$valid) {
            $scope.loop();
            mvEducationalLevelRepo.updateCurrentEducationalLevel($scope.educationalLevel).then(function () {
                mvNotifier.notify('EducationalLevel has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.educationalLevelForm.$valid && $scope.addEnabled) {            
            $scope.loop();
            mvEducationalLevelRepo.createEducationalLevel($scope.educationalLevel).then(function () {
                mvNotifier.notify('New EducationalLevel Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText");
            $scope.nameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        var old = false;
        if ($scope.educationalLevel.Name) {
            for (var i = 0; i < $scope.educationalLevel.Name.length; i++) {
                if ($scope.educationalLevel.Name[i].Lang == $scope.lang) {
                    $scope.educationalLevel.Name[i].Text = $scope.nameText;
                    old = true;
                }
            }
        }
        
        if (!old) {
            if (!$scope.educationalLevel.Name) {
                $scope.educationalLevel.Name = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.educationalLevel.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };

});