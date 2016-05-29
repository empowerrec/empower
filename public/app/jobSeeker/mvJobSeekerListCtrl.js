angular.module('app').controller('mvJobSeekerListCtrl', function ($scope, mvJobSeeker, mvJobSeekerRepo, queryBulider, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.jobSeekers = mvJobSeeker.query();
    //console.log($scope.jobSeekers);
    //$scope.sortOptions = [{value: 'BirthDate', text: 'Sort by Birth Date'},
    //    {value: 'Gender', text: 'Sort by Gender'}];
    //$scope.sortOrder = $scope.sortOptions[0].value;
    

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
    
    $scope.deleteJobSeeker = function (jobSeeker) {
        var ed = mvJobSeeker.get({ _id: jobSeeker._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvJobSeekerRepo.updateCurrentJobSeeker(ed).then(function () {
                mvNotifier.notify('JobSeeker has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();
    
});
