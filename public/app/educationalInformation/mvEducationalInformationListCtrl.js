angular.module('app').controller('mvEducationalInformationListCtrl', function ($scope, mvEducationalInformation, $translate, mvIdentity, mvEducationalInformationRepo,
    mvNotifier , queryBulider , mvJobSeeker , $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.educationalInformations = mvEducationalInformation.query({ jobSeeker: mvIdentity.currentJobSeeker });
    var id = $routeParams.id;
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'EducationalInformationName', text: 'Sort by EducationalInformationName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                mvEducationalInformation.query({
                    query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                    jobSeeker: mvIdentity.currentJobSeeker._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.educationalInformations = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    $scope.deleteEducationalInformation = function (educationalInformation) {
        var ed = mvEducationalInformation.get({ _id: educationalInformation._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvEducationalInformationRepo.updateCurrentEducationalInformation(ed).then(function () {
                mvNotifier.notify('Educational Information has been deleted!');
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
