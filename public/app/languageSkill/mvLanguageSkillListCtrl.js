angular.module('app').controller('mvLanguageSkillListCtrl', function ($scope, mvLanguageSkill, $routeParams,mvJobSeeker,mvLanguageSkillRepo, queryBulider,$translate, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.languageSkills = mvLanguageSkill.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    var id = $routeParams.id;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvLanguageSkill.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.LanguageSkills = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    
    $scope.deleteLanguageSkill = function (languageSkill) {
        console.log('delete');
        var langSkill = mvLanguageSkill.get({ _id: languageSkill._id },(function () {
            langSkill.Deleted = true;
            langSkill.DeletedBy = mvIdentity.currentUser;
        mvLanguageSkillRepo.updateCurrentLanguageSkill(langSkill).then(function () {
                mvNotifier.notify('Language Skill has been deleted!');
            $scope.getData();
        }, function (reason) {
            mvNotifier.error(reason);
            });
        }));


    };
});
