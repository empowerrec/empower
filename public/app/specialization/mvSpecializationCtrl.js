angular.module('app').controller('mvSpecializationCtrl', function ($scope, mvNotifier, mvSpecializationRepo, mvSpecialization, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.specializationNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: 'ÚÑÈì' }];
        
    $scope.init = function () {
        if (id) {
            $scope.specialization = mvSpecialization.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.specialization = new mvSpecialization();
            $scope.specialization.Confirmed = true;
            $scope.specialization.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.specializationForm.$valid) {
            $scope.loop();
            mvSpecializationRepo.updateCurrentSpecialization($scope.specialization).then(function () {
                mvNotifier.notify('Specialization has been updated!');
                $location.path('/specializations');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.specializationForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvSpecializationRepo.createSpecialization($scope.specialization).then(function () {
                mvNotifier.notify('New Specialization Added!');
                $location.path('/specializations');
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
            $scope.specializationNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.specialization.Name) {
            for (var i = 0; i < $scope.specialization.Name.length; i++) {
                if ($scope.specialization.Name[i].Lang == $scope.lang) {
                    $scope.specialization.Name[i].Text = $scope.specializationNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.specialization.Name) {
                $scope.specialization.Name = [];
            }
            var specializationName = { "Lang": $scope.lang, "Text": $scope.specializationNameText };
            $scope.specialization.Name.push(specializationName);
        }
        $scope.specializationNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});