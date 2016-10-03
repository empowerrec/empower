angular.module('app').controller('mvIndustryListCtrl', function ($scope, mvIndustry,$translate, mvIdentity, mvIndustryRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvIndustry.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.industries = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteIndustry = function (industry) {
        var ed = mvIndustry.get({ _id: industry._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvIndustryRepo.updateCurrentIndustry(ed).then(function () {
                mvNotifier.notify('Industry has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
