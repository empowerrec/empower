angular.module('app').controller('mvApplicantListCtrl', function ($scope, mvApplicant,$translate, mvIdentity, mvApplicantRepo, mvNotifier, queryBulider, $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.vacancyId;
    //$scope.applicants = mvApplicant.query();
    //$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'Description', text: 'Sort by Description'}];

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
        mvApplicant.query({
            query: queryBulider.qb("Vacancy=='" + id + "'&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.applicants = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteApplicant = function (applicant) {
        var ed = mvApplicant.get({ _id: applicant._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
