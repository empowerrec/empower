angular.module('app').controller('mvQuestionListCtrl', function ($scope, mvQuestion, $routeParams,mvJobSeeker,mvQuestionRepo, queryBulider,$translate, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    //$scope.Questions = mvQuestion.query({ jobSeeker: mvIdentity.currentJobSeeker });
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
                mvQuestion.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.Questions = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();
    
    $scope.deleteQuestion = function (Question) {
        console.log('delete');
        var langSkill = mvQuestion.get({ _id: Question._id },(function () {
            langSkill.Deleted = true;
            langSkill.DeletedBy = mvIdentity.currentUser;
        mvQuestionRepo.updateCurrentQuestion(langSkill).then(function () {
                mvNotifier.notify('Language Skill has been deleted!');
            $scope.getData();
        }, function (reason) {
            mvNotifier.error(reason);
            });
        }));


    };
});
