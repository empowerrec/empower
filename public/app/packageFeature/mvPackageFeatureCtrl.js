angular.module('app').controller('mvPackageFeatureCtrl', function ($scope, $location, mvNotifier, mvPackageFeatureRepo, mvPackageFeature, $routeParams, $translate, mvFeature, $rootScope) {

    var pId = $routeParams.pId;
    var id = $routeParams.id;
    $scope.features = mvFeature.query({ currentLang: $rootScope.currentLang });

    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.PackageFeature = mvPackageFeature.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    }
    else {
        if (pId) {
            $scope.PackageFeature = new mvPackageFeature();
            $scope.PackageFeature.Package = pId;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
            $scope.PackageFeature.Deleted = false;
            $scope.PackageFeature.Deleted = false;
        }
    }

    $scope.update = function () {
        if ($scope.packageFeatureForm.$valid) {
            mvPackageFeatureRepo.updateCurrentPackageFeature($scope.PackageFeature).then(function () {
                mvNotifier.notify('PackageFeature has been updated!');
                $location.path('/packageFeatures/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.packageFeatureForm.$valid && $scope.addEnabled) {
            mvPackageFeatureRepo.createPackageFeature($scope.PackageFeature).then(function () {
                mvNotifier.notify('New PackageFeature Added!');
                $scope.addEnabled = false;
                $location.path('/packageFeatures/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});