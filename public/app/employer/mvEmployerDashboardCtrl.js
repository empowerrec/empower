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
                $scope.vacanciesApplicantsCount.Views = 0;
                $scope.vacanciesApplicantsCount.Applied = 0;
                $scope.vacanciesApplicantsCount.ShortListed = 0;
                $scope.vacanciesApplicantsCount.Ok = 0;
                $scope.vacanciesApplicantsCount.Interviews = 0;
                $scope.vacanciesApplicantsCount.PostedJobs = 0;

            $scope.vacancies.forEach(function (row) {
                $scope.vacanciesApplicantsCount.PostedJobs += 1;
                mvApplicant.getApplicantsCount({ Vacancy: row._id }, (function (res) {
                    row.Views = 0;
                    row.Applied = 0;
                    row.ShortListed = 0;
                    row.Interviews = 0;
                    row.Ok = 0;
                    if (res[0]) {
                        if (res[0].N) {
                            row.Views = res[0].N;
                            $scope.vacanciesApplicantsCount.Views += row.Views;
                        }
                        if (res[0].A) {
                            row.Applied = res[0].A;
                            row.Views += row.Applied;
                            $scope.vacanciesApplicantsCount.Applied += row.Applied;
                            $scope.vacanciesApplicantsCount.Views += row.Applied;
                        }
                        if (res[0].S) {
                            row.ShortListed = res[0].S;
                            row.Views += row.ShortListed;
                            row.Applied += row.ShortListed;
                            $scope.vacanciesApplicantsCount.ShortListed += row.ShortListed;
                            $scope.vacanciesApplicantsCount.Applied += row.ShortListed;
                            $scope.vacanciesApplicantsCount.Views += row.ShortListed;
                        }
                        if (res[0].O) {
                            row.Ok = res[0].O;
                            row.Views += row.Ok;
                            row.Applied += row.Ok;
                            $scope.vacanciesApplicantsCount.Ok += row.Ok;
                            $scope.vacanciesApplicantsCount.Applied += row.Ok;
                            $scope.vacanciesApplicantsCount.Views += row.Ok;
                        }
                        if (res[0].I) {
                            row.Interviews = res[0].I;
                            row.Views += row.Interviews;
                            row.Applied += row.Interviews;
                            $scope.vacanciesApplicantsCount.Interviews += row.Interviews;
                            $scope.vacanciesApplicantsCount.Applied += row.Interviews;
                            $scope.vacanciesApplicantsCount.Views += row.Interviews;
                        }
                    }
                }));                

            });
        }));
    };

    $scope.getInterviews = function () {
        var qu = "";

        qu = queryBulider.qb("Employer=='" + $scope.employer._id +
             "'&&ArrangeInterviewDate!=null");

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
