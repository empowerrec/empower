angular.module('app').controller('mvPackageCostCtrl', function ($scope, $location, mvNotifier, mvPackageCostRepo, mvPackageCost, $routeParams, $translate, $rootScope) {

    var pId = $routeParams.pId;
    var id = $routeParams.id;

    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.PackageCost = mvPackageCost.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    }
    else {
        if (pId) {
            $scope.PackageCost = new mvPackageCost();
            $scope.PackageCost.Package = pId;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
            $scope.PackageCost.Deleted = false;
            $scope.PackageCost.Deleted = false;
        }
    }

    $scope.update = function () {
        if ($scope.packageCostForm.$valid) {
            mvPackageCostRepo.updateCurrentPackageCost($scope.PackageCost).then(function () {
                mvNotifier.notify('PackageCost has been updated!');
                $location.path('/packageCosts/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.packageCostForm.$valid && $scope.addEnabled) {
            mvPackageCostRepo.createPackageCost($scope.PackageCost).then(function () {
                mvNotifier.notify('New PackageCost Added!');
                $scope.addEnabled = false;
                $location.path('/packageCosts/' + pId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});