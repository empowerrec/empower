angular.module('app').controller('mvUserFeatureCtrl', function ($scope, mvFeatureCost, queryBulider, $location, mvFeature, mvUser, mvNotifier, mvUserFeatureRepo, mvUserFeature, $routeParams, $translate, $rootScope) {

    var uId = $scope.uId = $routeParams.uId;

    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();

    if (id) {
        $scope.UserFeature = mvUserFeature.get({ _id: id }, (function () {            
            mvFeature.query({ currentLang: $rootScope.currentLang, userType: $scope.UserFeature.User.UserType[0] }, (function (packs) {
                $scope.features = packs;
                $scope.startDate = new Date($scope.UserFeature.StartDate);
                $scope.expiryDate = new Date($scope.UserFeature.ExpiryDate);
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
                    $scope.UserFeature = new mvUserFeature();
                    $scope.startDate = new Date();
                    $scope.UserFeature.StartDate = new Date($scope.startDate);
                    $scope.updateMode = false;
                    $scope.addMode = true;
                    $scope.addEnabled = true;
                    $scope.UserFeature.User = users[0].collection[0];
                    $scope.UserFeature.Deleted = false;
                    $scope.UserFeature.Deleted = false;
                }));
            }));
        }
    }

    $scope.updateFields = function () {
        $scope.expiryDate = undefined;
        $scope.featureAmount = undefined;
        $scope.totalAmount = undefined;

        if ($scope.UserFeature.Feature && $scope.UserFeature.NoOfMonths) {
            $scope.expiryDate = new Date(moment($scope.UserFeature.StartDate).add($scope.UserFeature.NoOfMonths, 'month'));
            $scope.UserFeature.ExpiryDate = new Date($scope.expiryDate);

            mvFeatureCost.query({
                query: queryBulider.qb("Feature=='" + $scope.UserFeature.Feature + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 500
            }, (function (res) {
                var flagg = false;
                res[0].collection.forEach(function (entry) {
                    if ($scope.UserFeature.NoOfMonths >= entry.PeriodFromByMonth && $scope.UserFeature.NoOfMonths <= entry.PeriodToByMonth) {
                        $scope.featureAmount = entry.CostPerMonth;
                        $scope.totalAmount = entry.CostPerMonth * $scope.UserFeature.NoOfMonths;
                        $scope.UserFeature.TotalAmount = $scope.totalAmount;
                        $scope.UserFeature.FeatureAmount = $scope.featureAmount;
                        flagg = true;
                    }
                });
                if (!flagg) {
                    $scope.featureAmount = undefined;
                    $scope.totalAmount = undefined;
                    $scope.UserFeature.TotalAmount = $scope.totalAmount;
                    $scope.UserFeature.FeatureAmount = $scope.featureAmount;
                }
            }));
        }
    };


    $scope.update = function () {
        if ($scope.userFeatureForm.$valid) {
            mvUserFeatureRepo.updateCurrentUserFeature($scope.UserFeature).then(function () {
                mvNotifier.notify('UserFeature has been updated!');
                $location.path('/userFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.userFeatureForm.$valid && $scope.addEnabled) {
            mvUserFeatureRepo.createUserFeature($scope.UserFeature).then(function () {
                mvNotifier.notify('New UserFeature Added!');
                $scope.addEnabled = false;
                $location.path('/userFeatures/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});