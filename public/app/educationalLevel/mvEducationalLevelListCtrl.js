angular.module('app').controller('mvEducationalLevelListCtrl', 
    function ($scope, mvEducationalLevel, mvEducationalLevelRepo, queryBulider,$translate, mvIdentity, mvIndustryRepo, mvNotifier) {
        
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvEducationalLevel.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res2) {
            $scope.educationalLevels = res2[0].collection;
            $scope.allDataCount = res2[0].allDataCount;
        }));
    };
    
    $scope.deleteEducationalLevel = function (educationalLevel) {
        var ed = mvEducationalLevel.get({ _id: educationalLevel._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvEducationalLevelRepo.updateCurrentEducationalLevel(ed).then(function () {
                mvNotifier.notify('EducationalLevel has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
