angular.module('app').controller('mvNewVacanciesCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo, mvNotifier,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
   
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    var currentUserId;
    if ($scope.currentUser)
        currentUserId = $scope.currentUser._id;
    else
        currentUserId = null;

    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            jobSeeker: currentUserId,
            Puplished: true,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
 
    
    $scope.getData();
});
