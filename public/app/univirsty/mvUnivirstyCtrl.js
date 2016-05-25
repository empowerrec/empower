angular.module('app').controller('mvUnivirstyCtrl', function ($scope, mvNotifier, mvUnivirstyRepo, mvUnivirsty, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.univirstyNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: 'ÚÑÈì' }];
        
    $scope.init = function () {
        if (id) {
            $scope.univirsty = mvUnivirsty.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.univirsty = new mvUnivirsty();
            $scope.univirsty.Confirmed = true;
            $scope.univirsty.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.univirstyForm.$valid) {
            $scope.loop();
            mvUnivirstyRepo.updateCurrentUnivirsty($scope.univirsty).then(function () {
                mvNotifier.notify('Univirsty has been updated!');
                $location.path('/univirsties');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.univirstyForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvUnivirstyRepo.createUnivirsty($scope.univirsty).then(function () {
                mvNotifier.notify('New Univirsty Added!');
                $location.path('/univirsties');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang) {
            selectedLang = lang;
        } else {
            selectedLang = $scope.currentLang;
        }
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.univirstyNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.univirsty.Name) {
            for (var i = 0; i < $scope.univirsty.Name.length; i++) {
                if ($scope.univirsty.Name[i].Lang == $scope.lang) {
                    $scope.univirsty.Name[i].Text = $scope.univirstyNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.univirsty.Name) {
                $scope.univirsty.Name = [];
            }
            var univirstyName = { "Lang": $scope.lang, "Text": $scope.univirstyNameText };
            $scope.univirsty.Name.push(univirstyName);
        }
        $scope.univirstyNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});