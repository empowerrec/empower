angular.module('app').controller('mvMembershipAndAwardListCtrl', function ($scope, mvMembershipAndAward, $translate, mvIdentity, mvMembershipAndAwardRepo,
    mvNotifier , queryBulider , mvJobSeeker , $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.id;
    $scope.sortOptions = [{value: 'MembershipAndAwardName', text: 'Sort by MembershipAndAwardName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvMembershipAndAward.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.membershipAndAwards = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    $scope.deleteMembershipAndAward = function (membershipAndAward) {
        
        var ex = mvMembershipAndAward.get({ _id: membershipAndAward._id }, (function () {
            ex.Deleted = true;
            ex.DeletedBy = mvIdentity.currentUser;
            mvMembershipAndAwardRepo.updateCurrentMembershipAndAward(ex).then(function () {
                mvNotifier.notify('MembershipAndAward has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getLang = function(){
        return $translate.use();
    };
    
   
});
