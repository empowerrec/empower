angular.module('app').controller('mvUserPackageListCtrl', function ($scope,$routeParams, mvUserPackage, $translate, mvIdentity, mvUserPackageRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.uId = $routeParams.uId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvUserPackage.query({
            query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.userPackages = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deleteUserPackage = function (UserPackage) {
        var ed = mvUserPackage.get({ _id: UserPackage._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvUserPackageRepo.updateCurrentUserPackage(ed).then(function () {
                mvNotifier.notify('UserPackage has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});
