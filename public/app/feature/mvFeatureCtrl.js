angular.module('app').controller('mvFeatureCtrl', function ($scope, $location, mvNotifier, mvPackage, mvPackageFeatureRepo, queryBulider , mvFeatureRepo, mvFeature, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.Feature = mvFeature.get({ _id: id }, (function () {
            if ($scope.Feature.Name) {
                for (var i = 0; i < $scope.Feature.Name.length; i++) {

                    if ($scope.Feature.Name[i].Lang == $scope.currentLang) {
                        $scope.nameText = $scope.Feature.Name[i].Text;
                        $scope.lang = $scope.Feature.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.Feature = new mvFeature();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.Feature.Deleted = false;


    }

    $scope.getName = function (list, lang) {
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
        if ($scope.featureForm.$valid) {
            $scope.loop();
            mvFeatureRepo.updateCurrentFeature($scope.Feature).then(function () {
                mvNotifier.notify('Feature has been updated!');
                $location.path('/features/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }

    };

    $scope.add = function () {
        if ($scope.featureForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvFeatureRepo.createFeature($scope.Feature).then(function () {
                mvNotifier.notify('New Feature Added!');
                $scope.addEnabled = false;
                $location.path('/features/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
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
        if ($scope.Feature.Name) {
            for (var i = 0; i < $scope.Feature.Name.length; i++) {
                var obj = $scope.Feature.Name[i];

                if ($scope.Feature.Name[i].Lang == $scope.lang) {
                    $scope.Feature.Name[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if (!old) {
            if (!$scope.Feature.Name) {
                $scope.Feature.Name = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.Feature.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };

});