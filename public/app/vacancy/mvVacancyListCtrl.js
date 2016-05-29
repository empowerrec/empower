angular.module('app').controller('mvVacancyListCtrl', function ($scope, mvVacancy, queryBulider, mvVacancyRepo, mvNotifier,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.vacancies = mvVacancy.query();
    ////$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'VacancyName', text: 'Sort by VacancyName'},
    //    {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    //$scope.sortOrder = $scope.sortOptions[0].value;
    //$scope.getName = function(list){
    //    for(var i = 0; i < list.length; i++) {

    //        if(list[i].Lang == $scope.currentLang) {
    //            return list[i].Text;
    //        }
    //    }
    //};

    //$scope.getLang = function(){
    //    return $translate.use();
    //};
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
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
