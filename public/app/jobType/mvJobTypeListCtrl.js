angular.module('app').controller('mvJobTypeListCtrl', function ($scope, mvJobType,$translate, mvJobTypeRepo, queryBulider, mvNotifier,$rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvJobType.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.jobTypes = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteJobType = function (jobType) {
        var ed = mvJobType.get({ _id: jobType._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvJobTypeRepo.updateCurrentJobType(ed).then(function () {
                mvNotifier.notify('JobType has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
