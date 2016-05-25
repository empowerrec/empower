angular.module('app').controller('mvUnivirstyListCtrl', function ($scope, mvUnivirsty, $translate, mvIdentity, mvUnivirstyRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvUnivirsty.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.univirsties = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteUnivirsty = function (univirsty) {
        var ed = mvUnivirsty.get({ _id: univirsty._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvUnivirstyRepo.updateCurrentUnivirsty(ed).then(function () {
                mvNotifier.notify('Univirsty has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
