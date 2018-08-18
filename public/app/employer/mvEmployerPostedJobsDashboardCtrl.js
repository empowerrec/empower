angular.module('app').controller('mvEmployerDashboardCtrl', function ($scope,
    mvEmployer, $translate, mvEmployerRepo, mvNotifier,
    queryBulider, mvIdentity, $routeParams, mvApplicant, mvVacancy) {
    $scope.currentUser = mvIdentity.currentUser;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.postedJobspaging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.vacanciesApplicantsCount = {
        Views: 0,
        Applied: 0,
        ShortListed: 0,
        Ok: 0,
        Declined: 0,
        PostedJob:0
    };

    $scope.getData = function () {
        $scope.employer = mvEmployer.get({ _id: $routeParams.id }, function () {
            $scope.getInterviews();
        });
    };

    $scope.getPostedJobsData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.postedJobspaging.currentPage,
            pageSize: $scope.postedJobspaging.pageSize
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allVacanciesDataCount = res[0].allDataCount;
            $scope.vacancies.forEach(function (row) {
                $scope.vacanciesApplicantsCount.PostedJob += 1;
                mvApplicant.getApplicantsCount({ Vacancy: row._id }, (function (res) {
                    if (res[0]) {
                        if (res[0].N) {
                            row.Views = res[0].N;
                            $scope.vacanciesApplicantsCount.Views += res[0].N;
                        }
                        if (res[0].A) {
                            row.Applied = res[0].A;
                            $scope.vacanciesApplicantsCount.Applied += res[0].A;
                        }
                        if (res[0].S) {
                            row.ShortListe = res[0].S;
                            $scope.vacanciesApplicantsCount.ShortListed += res[0].S;
                        }
                        if (res[0].O) {
                            row.Ok = res[0].O;
                            $scope.vacanciesApplicantsCount.Ok += res[0].O;
                        }
                        if (res[0].I) {
                            row.Interviews = res[0].I;
                            $scope.vacanciesApplicantsCount.Interviews += res[0].I;
                        }
                    }
                }));                

            });
        }));
    };

    $scope.getInterviews = function () {
        var qu = "";

        qu = queryBulider.qb("Employer=='" + $scope.employer._id + "'&&ArrangeInterviewDate!=null");

        mvApplicant.query({
            query: qu,
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.applicants = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    }



    $scope.getApplicantsCount = function (vacancy, status) {
        mvApplicant.getApplicantsCount({ Vacancy: vacancy, Status: status }, (function (res) {
            if (res[0]) {
                $scope.vacanciesApplicantsCount.Views = res[0].count;
            }
        }));
    }

    $scope.getData();

    $scope.getPostedJobsData();

});
