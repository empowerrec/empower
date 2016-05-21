angular.module('app').controller('mvFacultyListCtrl', function ($scope, mvFaculty, $translate, mvIdentity, mvFacultyRepo, mvNotifier, queryBulider) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvFaculty.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.faculties = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteFaculty = function (faculty) {
        var ed = mvFaculty.get({ _id: faculty._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvFacultyRepo.updateCurrentFaculty(ed).then(function () {
                mvNotifier.notify('Faculty has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
