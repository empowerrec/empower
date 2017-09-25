angular.module('app').controller('mvSubUserFeatureCtrl', function ($scope, mvFeatureCost, queryBulider, $location, mvFeature, mvUser, mvNotifier, mvSubUserFeatureRepo, mvSubUserFeature, $routeParams, $translate, $rootScope) {

    var uId = $scope.uId = $routeParams.uId;

    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();

    if (id) {
        $scope.SubUserFeature = mvSubUserFeature.get({ _id: id }, (function () {            
            mvFeature.query({ currentLang: $rootScope.currentLang, userType: $scope.SubUserFeature.User.UserType[0] }, (function (packs) {
                $scope.features = packs;
                $scope.startDate = new Date($scope.SubUserFeature.StartDate);
                $scope.expiryDate = new Date($scope.SubUserFeature.ExpiryDate);
                $scope.updateMode = true;
                $scope.addMode = false;
            }));            
        }));        
    }
    else {
        if (uId) {
            mvUser.query({
                query: queryBulider.qb("_id=='" + $routeParams.uId + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 10
            }, (function (users) {
                mvFeature.query({ currentLang: $rootScope.currentLang, userType: users[0].collection[0].UserType[0] }, (function (packs) {
                    $scope.features = packs;
                    $scope.SubUserFeature = new mvSubUserFeature();
                    $scope.startDate = new Date();
                    $scope.SubUserFeature.StartDate = new Date($scope.startDate);
                    $scope.updateMode = false;
                    $scope.addMode = true;
                    $scope.addEnabled = true;
                    $scope.SubUserFeature.User = users[0].collection[0];
                    $scope.SubUserFeature.Deleted = false;
                    $scope.SubUserFeature.Deleted = false;
                }));
            }));
        }
    }

    $scope.updateFields = function () {
        $scope.expiryDate = undefined;
        $scope.featureAmount = undefined;
        $scope.totalAmount = undefined;

        if ($scope.SubUserFeature.Feature && $scope.SubUserFeature.NoOfMonths) {
            $scope.expiryDate = new Date(moment($scope.SubUserFeature.StartDate).add($scope.SubUserFeature.NoOfMonths, 'month'));
            $scope.SubUserFeature.ExpiryDate = new Date($scope.expiryDate);

            mvFeatureCost.query({
                query: queryBulider.qb("Feature=='" + $scope.SubUserFeature.Feature + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 500
            }, (function (res) {
                var flagg = false;
                res[0].collection.forEach(function (entry) {
                    if ($scope.SubUserFeature.NoOfMonths >= entry.PeriodFromByMonth && $scope.SubUserFeature.NoOfMonths <= entry.PeriodToByMonth) {
                        $scope.featureAmount = entry.CostPerMonth;
                        $scope.totalAmount = entry.CostPerMonth * $scope.SubUserFeature.NoOfMonths;
                        $scope.SubUserFeature.TotalAmount = $scope.totalAmount;
                        $scope.SubUserFeature.FeatureAmount = $scope.featureAmount;
                        flagg = true;
                    }
                });
                if (!flagg) {
                    $scope.featureAmount = undefined;
                    $scope.totalAmount = undefined;
                    $scope.SubUserFeature.TotalAmount = $scope.totalAmount;
                    $scope.SubUserFeature.FeatureAmount = $scope.featureAmount;
                }
            }));
        }
    };


    $scope.update = function () {
        if ($scope.subUserFeatureForm.$valid) {
            mvSubUserFeatureRepo.updateCurrentSubUserFeature($scope.SubUserFeature).then(function () {
                mvNotifier.notify('SubUserFeature has been updated!');
                $location.path('/subUserFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.subUserFeatureForm.$valid && $scope.addEnabled) {
            mvSubUserFeatureRepo.createSubUserFeature($scope.SubUserFeature).then(function () {
                mvNotifier.notify('New SubUserFeature Added!');
                $scope.addEnabled = false;
                $location.path('/subUserFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});