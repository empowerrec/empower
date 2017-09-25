angular.module('app').controller('mvProfessionalCertificationListCtrl', function ($scope, mvProfessionalCertification, $translate, mvIdentity, mvProfessionalCertificationRepo,
    mvNotifier , queryBulider , mvJobSeeker , $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.professionalCertifications = mvProfessionalCertification.query({ jobSeeker: mvIdentity.currentJobSeeker });
    var id = $routeParams.id;
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'ProfessionalCertificationName', text: 'Sort by ProfessionalCertificationName'},
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
                mvProfessionalCertification.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.professionalCertifications = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    $scope.deleteProfessionalCertification = function (professionalCertification) {
        
        var ex = mvProfessionalCertification.get({ _id: professionalCertification._id }, (function () {
            ex.Deleted = true;
            ex.DeletedBy = mvIdentity.currentUser;
            mvProfessionalCertificationRepo.updateCurrentProfessionalCertification(ex).then(function () {
                mvNotifier.notify('ProfessionalCertification has been deleted!');
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
