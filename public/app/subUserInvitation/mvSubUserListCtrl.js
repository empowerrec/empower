angular.module('app').controller('mvSubUserListCtrl', function ($scope, queryBulider, mvIdentity, mvSubUser, mvNotifier) {
    //$scope.users = mvUser.query();
    //console.log(mvUser.query());
    //console.log(mvUserPackage.query());
    //console.log($scope.users);
    var curUser = mvIdentity.currentUser._id;
    //var curUser = '5975060ec66dc80400dd19e9';
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        mvSubUser.query({
            query: queryBulider.qb("!Deleted&&" + "Employer=='" + curUser + "'"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.users = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    //$scope.deleteCity = function (city) {
    //    var ed = mvUser.get({ _id: city._id }, (function () {
    //        ed.Deleted = true;
    //        ed.DeletedBy = mvIdentity.currentUser;
    //        mvUserRepo.updateCurrentCity(ed).then(function () {
    //            mvNotifier.notify('City has been deleted!');
    //            $scope.getData();
    //        }, function (reason) {
    //            mvNotifier.error(reason);
    //        });
    //    }));
    //};

    $scope.getData();
});
