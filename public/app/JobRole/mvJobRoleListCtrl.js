angular.module('app').controller('mvJobRoleListCtrl', function ($scope, mvJobRole,$translate, mvJobRoleRepo, queryBulider, mvNotifier,$rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.jobRoles = mvJobRole.query();
    //$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'JobRoleName', text: 'Sort by JobRoleName'}];

    //$scope.sortOrder = $scope.sortOptions[0].value;
    //$scope.getName = function(list){
    //    for(var i = 0; i < list.length; i++) {

    //        if(list[i].Lang == $scope.currentLang) {
    //            return list[i].Text;
    //        }
    //    }
    //};

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvJobRole.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.jobRoles = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteJobRole = function (industry) {
        var ed = mvJobRole.get({ _id: industry._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvJobRoleRepo.updateCurrentJobRole(ed).then(function () {
                mvNotifier.notify('JobRole has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
