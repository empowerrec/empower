angular.module('app').controller('mvFacultyCtrl', function ($scope, mvNotifier, mvFacultyRepo, mvFaculty, $routeParams, $translate, $location) {
    var id = $routeParams.id;
    $scope.facultyNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: 'ÚÑÈì' }];
        
    $scope.init = function () {
        if (id) {
            $scope.faculty = mvFaculty.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.faculty = new mvFaculty();
            $scope.faculty.Confirmed = true;
            $scope.faculty.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.facultyForm.$valid) {
            $scope.loop();
            mvFacultyRepo.updateCurrentFaculty($scope.faculty).then(function () {
                mvNotifier.notify('Faculty has been updated!');
                $location.path('/faculties');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.facultyForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvFacultyRepo.createFaculty($scope.faculty).then(function () {
                mvNotifier.notify('New Faculty Added!');
                $location.path('/faculties');
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
            $scope.facultyNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.faculty.Name) {
            for (var i = 0; i < $scope.faculty.Name.length; i++) {
                if ($scope.faculty.Name[i].Lang == $scope.lang) {
                    $scope.faculty.Name[i].Text = $scope.facultyNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.faculty.Name) {
                $scope.faculty.Name = [];
            }
            var facultyName = { "Lang": $scope.lang, "Text": $scope.facultyNameText };
            $scope.faculty.Name.push(facultyName);
        }
        $scope.facultyNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
});