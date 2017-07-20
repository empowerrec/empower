angular.module('app').controller('mvUserPackageCtrl', function ($scope, mvPackageCost, queryBulider, $location, mvPackage, mvUser, mvNotifier, mvUserPackageRepo, mvUserPackage, $routeParams, $translate, $rootScope) {

    var uId = $scope.uId = $routeParams.uId;

    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();

    if (id) {
        $scope.UserPackage = mvUserPackage.get({ _id: id }, (function () {

            $scope.UserPackage.StartDate = new Date($scope.UserPackage.StartDate);
            $scope.UserPackage.ExpiryDate = new Date($scope.UserPackage.ExpiryDate);

            mvPackage.query({ currentLang: $rootScope.currentLang, userType: $scope.UserPackage.User.UserType[0] }, (function (packs) {
                $scope.packages = packs;
                $scope.startDate = new Date($scope.UserPackage.StartDate);
                $scope.expiryDate = new Date($scope.UserPackage.ExpiryDate);

                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        }));
    }
    else {
        if (uId) {
            $scope.UserPackage = mvUserPackage.query({
                query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 10
            }, (function (res) {

                if (res[0].allDataCount > 0) {
                    $location.path('/userPackages/' + uId);
                }

                mvUser.query({
                    query: queryBulider.qb("_id=='" + $routeParams.uId + "'&&!Deleted"),
                    currentPage: 1,
                    pageSize: 10
                }, (function (users) {
                    mvPackage.query({ currentLang: $rootScope.currentLang, userType: users[0].collection[0].UserType[0] }, (function (packs) {
                        $scope.packages = packs;
                        $scope.UserPackage = new mvUserPackage();
                        $scope.startDate = new Date();
                        $scope.UserPackage.StartDate = new Date($scope.startDate);
                        $scope.updateMode = false;
                        $scope.addMode = true;
                        $scope.addEnabled = true;
                        $scope.UserPackage.User = users[0].collection[0];
                        $scope.UserPackage.Deleted = false;
                        $scope.UserPackage.Deleted = false;
                    }));
                }));

            }));

        }
    }

    $scope.updateFields = function () {
        $scope.expiryDate = undefined;
        $scope.packageAmount = undefined;
        $scope.totalAmount = undefined;

            if ($scope.UserPackage.Package && $scope.UserPackage.NoOfMonths) {
                $scope.expiryDate = new Date(moment($scope.UserPackage.StartDate).add($scope.UserPackage.NoOfMonths, 'month'));
            $scope.UserPackage.ExpiryDate = new Date($scope.expiryDate);

            mvPackageCost.query({
                query: queryBulider.qb("Package=='" + $scope.UserPackage.Package + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 500
            }, (function (res) {
                var flagg = false;
                res[0].collection.forEach(function (entry) {
                    if ($scope.UserPackage.NoOfMonths >= entry.PeriodFromByMonth && $scope.UserPackage.NoOfMonths <= entry.PeriodToByMonth) {
                        $scope.packageAmount = entry.CostPerMonth;
                        $scope.totalAmount = entry.CostPerMonth * $scope.UserPackage.NoOfMonths;
                        $scope.UserPackage.TotalAmount = $scope.totalAmount;
                        $scope.UserPackage.PackageAmount = $scope.packageAmount;
                        flagg = true;
                    }
                });
                if (!flagg) {
                    $scope.packageAmount = undefined;
                    $scope.totalAmount = undefined;
                    $scope.UserPackage.TotalAmount = $scope.totalAmount;
                    $scope.UserPackage.PackageAmount = $scope.packageAmount;
                }
            }));
        }
    };


    $scope.update = function () {
        if ($scope.userPackageForm.$valid) {
            mvUserPackageRepo.createUserPackage($scope.UserPackage).then(function () {
                mvNotifier.notify('UserPackage has been updated!');
                $location.path('/userPackages/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.userPackageForm.$valid && $scope.addEnabled) {
            mvUserPackageRepo.createUserPackage($scope.UserPackage).then(function () {
                mvNotifier.notify('New UserPackage Added!');
                $location.path('/userPackages/' + uId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});