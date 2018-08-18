angular.module('app').controller('mvHotVacanciesCtrl', function ($scope, mvVacancy,
    queryBulider, mvVacancyRepo, mvNotifier, $translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
  
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            jobSeeker: mvIdentity.currentJobSeeker._id,
            Puplished: true,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacanciess = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
 
    
    $scope.getData();
});
