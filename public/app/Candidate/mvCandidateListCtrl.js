angular.module('app').controller('mvCandidateListCtrl', function ($scope, mvCandidate, mvVacancy, mvJobSeeker, $translate, mvIdentity, mvCandidateRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {

        var vacancy = mvVacancy.get({ _id: vId }, (function () {
            var whereString = "";
            mvJobSeeker.query({
                
                query: queryBulider.qb("!Deleted"),
                currentPage: $scope.paging.currentPage,
                pageSize: $scope.paging.pageSize
            }, (function (res) {
                $scope.industries = res[0].collection;
                $scope.allDataCount = res[0].allDataCount;
            }));

        }));

    };

    $scope.deleteCandidate = function (Candidate) {
        var ed = mvCandidate.get({ _id: Candidate._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvCandidateRepo.updateCurrentCandidate(ed).then(function () {
                mvNotifier.notify('Candidate has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});
