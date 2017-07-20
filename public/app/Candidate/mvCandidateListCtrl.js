angular.module('app').controller('mvCandidateListCtrl', function ($scope, $routeParams,mvCandidate, mvVacancy, mvJobSeeker, $translate, mvIdentity, mvCandidateRepo, mvNotifier, queryBulider) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    var vId = $routeParams.vId;

    $scope.getData = function () {

        var vacancy = mvVacancy.get({ _id: vId }, (function () {
            var whereString = "SalaryPreference >=" + vacancy.SalaryRangeFrom +
                " && SalaryPreference <= " + vacancy.SalaryRangeTo + "";
                //"' && PreferredCountryOfWork == '" + vacancy.Country +
                //"' && PreferredCityOfWork == '" + vacancy.City +
                ////"' && '" + vacancy.Category + "' == PreferredJobCategory" +
                ////" && '" + vacancy.Industry + "' == PreferredIndustry" +
                //"' && PreferredCareerLevel == '" + vacancy.CareerLevel +
                //"' && PreferredSalaryCurancy == '" + vacancy.SalaryCurancy +
                //"' && PreferredSalaryType == '" + vacancy.SalaryType +
                ////"' && " + vacancy.JobRole + " == PreferredJobRole" +
                //"' && PreferredJobType == '" + vacancy.JobType + "'";
            mvJobSeeker.query({
                
                query: queryBulider.qb(whereString + "&&!Deleted"),
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
