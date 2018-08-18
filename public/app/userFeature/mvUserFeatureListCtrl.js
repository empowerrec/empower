angular.module('app').controller('mvUserFeatureListCtrl', function ($scope, $routeParams,
    mvUserFeature, $translate, mvIdentity, mvUserFeatureRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.uId = $routeParams.uId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvUserFeature.query({
            query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.userFeatures = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deleteUserFeature = function (UserFeature) {
        var ed = mvUserFeature.get({ _id: UserFeature._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvUserFeatureRepo.updateCurrentUserFeature(ed).then(function () {
                mvNotifier.notify('UserFeature has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});
