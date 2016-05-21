angular.module('app').controller('mvSpecializationListCtrl', function ($scope, mvSpecialization, $translate, mvIdentity, mvSpecializationRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvSpecialization.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.specializations = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteSpecialization = function (specialization) {
        var ed = mvSpecialization.get({ _id: specialization._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvSpecializationRepo.updateCurrentSpecialization(ed).then(function () {
                mvNotifier.notify('Specialization has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
