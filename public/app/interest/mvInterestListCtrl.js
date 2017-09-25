angular.module('app').controller('mvInterestListCtrl', function ($scope, mvInterest, $translate, mvIdentity, mvInterestRepo,
    mvNotifier , queryBulider , mvJobSeeker , $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.id;
    $scope.sortOptions = [{value: 'InterestName', text: 'Sort by InterestName'},
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
                mvInterest.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.interests = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    $scope.deleteInterest = function (interest) {
        
        var ex = mvInterest.get({ _id: interest._id }, (function () {
            ex.Deleted = true;
            ex.DeletedBy = mvIdentity.currentUser;
            mvInterestRepo.updateCurrentInterest(ex).then(function () {
                mvNotifier.notify('Interest has been deleted!');
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
