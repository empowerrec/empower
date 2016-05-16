angular.module('app').controller('mvSkillListCtrl', function ($scope, mvSkill,$translate, mvIdentity, mvJobSeeker, queryBulider, mvSkillRepo, mvNotifier, $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.skills = mvSkill.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'SkillName', text: 'Sort by SkillName'},
    //    {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    var id = $routeParams.id;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                mvSkill.query({
                    query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                    jobSeeker: mvIdentity.currentJobSeeker._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.Skills = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    
       $scope.deleteSkill = function (skill) {
        
        var sk = mvSkill.get({ _id: skill._id }, (function () {
            sk.Deleted = true;
            sk.DeletedBy = mvIdentity.currentUser;
            mvSkillRepo.updateCurrentSkill(sk).then(function () {
                mvNotifier.notify('Skill has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));        
    };
});
