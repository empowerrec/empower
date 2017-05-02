angular.module('app').controller('mvPackageCostListCtrl', function ($scope,$routeParams, mvPackageCost, $translate, mvIdentity, mvPackageCostRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.pId = $routeParams.pId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvPackageCost.query({
            query: queryBulider.qb("Package=='" + $routeParams.pId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.packageCosts = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deletePackageCost = function (PackageCost) {
        var ed = mvPackageCost.get({ _id: PackageCost._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvPackageCostRepo.updateCurrentPackageCost(ed).then(function () {
                mvNotifier.notify('PackageCost has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});
