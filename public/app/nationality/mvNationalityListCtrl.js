angular.module('app').controller('mvNationalityListCtrl', 
    function ($scope, mvNationality, mvNationalityRepo, queryBulider,$translate, mvIdentity, mvIndustryRepo, mvNotifier) {
        
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvNationality.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res2) {
            $scope.nationalities = res2[0].collection;
            $scope.allDataCount = res2[0].allDataCount;
        }));
    };
    
    $scope.deleteNationality = function (nationality) {
        var ed = mvNationality.get({ _id: nationality._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvNationalityRepo.updateCurrentNationality(ed).then(function () {
                mvNotifier.notify('Nationality has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
