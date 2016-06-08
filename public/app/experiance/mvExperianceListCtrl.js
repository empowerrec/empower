angular.module('app').controller('mvExperianceListCtrl', function ($scope, mvExperiance, $translate, mvIdentity, mvExperianceRepo,
    mvNotifier , queryBulider , mvJobSeeker , $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.experiances = mvExperiance.query({ jobSeeker: mvIdentity.currentJobSeeker });
    var id = $routeParams.id;
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'ExperianceName', text: 'Sort by ExperianceName'},
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
                mvExperiance.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.experiances = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    $scope.deleteExperiance = function (experiance) {
        
        var ex = mvExperiance.get({ _id: experiance._id }, (function () {
            ex.Deleted = true;
            ex.DeletedBy = mvIdentity.currentUser;
            mvExperianceRepo.updateCurrentExperiance(ex).then(function () {
                mvNotifier.notify('Experiance has been deleted!');
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
