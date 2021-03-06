angular.module('app').controller('mvJobsByIndustriesCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo,
    $routeParams, mvNotifier, $translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;

    var jobSeekerId = mvIdentity.currentJobSeeker._id;
    debugger;
    if (!jobSeekerId)
        jobSeekerId = 0;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            jobSeeker: jobSeekerId,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacanciesByIndustries = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
 
    
    $scope.getData();
});
