angular.module('app').controller('mvSubUserFeatureListCtrl', function ($scope,$routeParams, mvSubUserFeature, $translate, mvIdentity, mvSubUserFeatureRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.uId = $routeParams.uId;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvSubUserFeature.query({
            query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.subUserFeatures = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deleteSubUserFeature = function (SubUserFeature) {
        var ed = mvSubUserFeature.get({ _id: SubUserFeature._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvSubUserFeatureRepo.updateCurrentSubUserFeature(ed).then(function () {
                mvNotifier.notify('SubUserFeature has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});
