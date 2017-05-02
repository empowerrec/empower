angular.module('app').controller('mvPackageListCtrl', function ($scope, mvPackage,$translate, mvIdentity, mvPackageRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvPackage.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.industries = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deletePackage = function (Package) {
        var ed = mvPackage.get({ _id: Package._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvPackageRepo.updateCurrentPackage(ed).then(function () {
                mvNotifier.notify('Package has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
