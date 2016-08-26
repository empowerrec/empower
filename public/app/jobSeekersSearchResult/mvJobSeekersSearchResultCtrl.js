angular.module('app').controller('mvJobSeekersSearchResultCtrl', function ($scope, mvJobSeeker, mvJobSeekerRepo, queryBulider, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
   
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvJobSeeker.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.jobSeekers = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
        
    $scope.getData();
    
});
