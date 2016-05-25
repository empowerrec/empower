angular.module('app').controller('mvEmployerListCtrl', function ($scope, mvEmployer,$translate, mvEmployerRepo, mvNotifier, queryBulider, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.employers = mvEmployer.query();
    ////$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'EmployerName', text: 'Sort by EmployerName'},
    
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
        mvEmployer.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.employers = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteEmployer = function (employer) {
        var ed = mvEmployer.get({ _id: employer._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvEmployerRepo.updateCurrentEmployer(ed).then(function () {
                mvNotifier.notify('Employer has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();
});
