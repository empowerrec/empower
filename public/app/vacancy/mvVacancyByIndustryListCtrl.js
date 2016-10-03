angular.module('app').controller('mvVacancyByIndustryListCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo, mvNotifier, $translate, mvIdentity, $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    
    var id = $routeParams.industryId;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("Industry=='" + id + "'"),
            Industry: id,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    
    };
    
    $scope.deleteVacancy = function (vacancy) {
        var ed = mvVacancy.get({ _id: vacancy._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvVacancyRepo.updateCurrentVacancy(ed).then(function () {
                mvNotifier.notify('Vacancy has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();
});
