angular.module('app').controller('mvJobSeekerListCtrl', function ($scope, mvJobSeeker, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.jobSeekers = mvJobSeeker.query();
    console.log($scope.jobSeekers);
    $scope.sortOptions = [{value: 'BirthDate', text: 'Sort by Birth Date'},
        {value: 'Gender', text: 'Sort by Gender'}];
    $scope.sortOrder = $scope.sortOptions[0].value;


    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10,
        totalItems: 200
};
    
    Object.defineProperty($scope.paging, 'pageCount', {
        get: function () {
            return Math.floor(100 / $scope.paging.pageSize) + 1;
        }
    });
    
    $scope.pageChanged = function () {
        //getTRTransactionHeaders();
    };
    

});
