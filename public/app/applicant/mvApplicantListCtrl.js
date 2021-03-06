angular.module('app').controller('mvApplicantListCtrl', function ($scope, mvApplicant, $translate, mvIdentity, mvApplicantRepo, mvNotifier, queryBulider, $routeParams) {
    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.vacancyId;
    var status = $routeParams.status;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {
        var qu = '';
        if (status == "ALL") {
            qu = queryBulider.qb("Vacancy=='" + id + "'&&!Deleted");
        }
        else {
            qu = queryBulider.qb("Vacancy=='" + id + "'&&Status=='" + status + "'&&!Deleted");
        }
        mvApplicant.query({
            query: qu,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.applicants = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.deleteApplicant = function (applicant) {
        var ed = mvApplicant.get({ _id: applicant._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };


    $scope.shortListApplicant = function (applicant) {
        var ed = mvApplicant.get({ _id: applicant._id }, (function () {
            ed.Status = 'S';
            ed.ModifiedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.oKApplicant = function (applicant) {
        var ed = mvApplicant.get({ _id: applicant._id }, (function () {
            ed.Status = 'O';
            ed.ModifiedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been OK!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };


    $scope.rejectApplicant = function (applicant) {
        var ed = mvApplicant.get({ _id: applicant._id }, (function () {
            ed.Status = 'R';
            ed.ModifiedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been Rejected!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.approveApplicant = function (applicant) {
        var ed = mvApplicant.get({ _id: applicant._id }, (function () {
            ed.Status = 'A';
            ed.ModifiedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been Approved!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };


    $scope.arrangeInterview = function (applicant) {
        var ed = mvApplicant.get({ _id: applicant._id }, (function () {
            ed.Status = 'A';
            ed.ModifiedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been Approved!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.getData();

});
