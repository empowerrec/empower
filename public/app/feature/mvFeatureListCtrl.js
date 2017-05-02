angular.module('app').controller('mvFeatureListCtrl', function ($scope, mvFeature,$translate, mvIdentity, mvFeatureRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvFeature.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.features = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteFeature = function (Feature) {
        var ed = mvFeature.get({ _id: Feature._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvFeatureRepo.updateCurrentFeature(ed).then(function () {
                mvNotifier.notify('Feature has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
