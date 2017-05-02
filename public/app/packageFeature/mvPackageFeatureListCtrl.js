angular.module('app').controller('mvPackageFeatureListCtrl', function ($scope, $routeParams, mvFeature, mvPackage, mvPackageFeature, $translate, mvIdentity, mvPackageFeatureRepo, mvNotifier, queryBulider) {

    $scope.currentUser = mvIdentity.currentUser;
    $scope.pId = $routeParams.pId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 10,
        pageSize: 10
    };

    $scope.getData = function () {
        var packageFeatures = mvPackageFeature.query({
            query: queryBulider.qb("Package=='" + $routeParams.pId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function () {
            var package = mvPackage.get({ _id: $scope.pId }, (function () {

                mvFeature.query({
                    query: queryBulider.qb("Type=='" + package.Type + "'&&!Deleted"),
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (features) {
                        features[0].collection.forEach(function (feature) {
                            if (typeof $scope.searchAtJson(packageFeatures[0].collection, "Feature", feature._id, "_id") == "undefined") {
                            var pf = new mvPackageFeature();
                            pf.Package = $scope.pId;
                            pf.Feature = feature;
                            pf.Points = 0;
                            pf.Deleted = false;
                            packageFeatures[0].collection.push(pf);
                        }
                    });
                    $scope.packageFeatures = packageFeatures[0].collection;
                    $scope.allDataCount = packageFeatures[0].allDataCount;
                }))


            }));
        }));
    };

    $scope.savePackageFeatures = function () {
        $scope.packageFeatures.forEach(function (pf) {
            if (typeof pf._id == "undefined") {

                mvPackageFeatureRepo.createPackageFeature(pf).then(function () {
                    mvNotifier.notify('PackageFeature has been added!');
                    $scope.getData();
                }, function (reason) {
                    mvNotifier.error(reason);
                });

            } else {

                var updatedPF = mvPackageFeature.get({ _id: pf._id }, (function () {
                    updatedPF.Points = pf.Points;
                    mvPackageFeatureRepo.updateCurrentPackageFeature(updatedPF).then(function () {
                        mvNotifier.notify('Package has been updated!');
                        $scope.getData();
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });
                }));

            }

        });

    };

    $scope.getData();

    $scope.searchAtJson = function (obj, searchField, searchVal, returnField) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][searchField]._id == searchVal) {
                return obj[i][returnField];
            }
        }
    };

});

