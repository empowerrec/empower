angular.module('app').controller('mvCityCtrl', function ($scope, mvNotifier, mvCityRepo, mvCity, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.cityNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: 'ÚÑÈì' }];
        
    $scope.init = function () {
        if (id) {
            $scope.city = mvCity.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.city = new mvCity();
            $scope.city.Confirmed = true;
            $scope.city.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.cityForm.$valid) {
            $scope.loop();
            mvCityRepo.updateCurrentCity($scope.city).then(function () {
                mvNotifier.notify('City has been updated!');
                $location.path('/cities');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.cityForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvCityRepo.createCity($scope.city).then(function () {
                mvNotifier.notify('New City Added!');
                $location.path('/cities');
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
            $scope.cityNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.city.Name) {
            for (var i = 0; i < $scope.city.Name.length; i++) {
                if ($scope.city.Name[i].Lang == $scope.lang) {
                    $scope.city.Name[i].Text = $scope.cityNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.city.Name) {
                $scope.city.Name = [];
            }
            var cityName = { "Lang": $scope.lang, "Text": $scope.cityNameText };
            $scope.city.Name.push(cityName);
        }
        $scope.cityNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});