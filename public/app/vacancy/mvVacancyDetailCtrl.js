angular.module('app').controller('mvVacancyDetailCtrl', function ($scope, mvVacancy,
    $routeParams , queryBulider,
    mvApplicantRepo , mvNotifier , mvApplicant, mvIdentity) {
    $scope.vacancy = mvVacancy.getForDetail({ _id: $routeParams.id });
    $scope.isApplied = false;
    $scope.isJobSeeker = false;
    $scope.appliedMessage = "";
    console.log(mvIdentity.currentJobSeeker);
    if (mvIdentity.currentJobSeeker)
        $scope.isJobSeeker = true;
    if ($scope.isJobSeeker) {
        $scope.applicant = mvApplicant.getVacancyForApplicant({ jobSeeker: mvIdentity.currentJobSeeker._id, vacancy: $routeParams.id },
            function(data, getResponseHeaders) {
                if (data.Vacancy) {
                    if (data.Status != 'N') {
                        $scope.isApplied = true;
                        $scope.appliedMessage = "You Already Applied For this Job";

                    }
                }
                else {
                    $scope.view();
                }


            });
    }           
    $scope.apply = function () {
        var ed = mvApplicant.get({ _id: $scope.applicant.JobSeeker._id }, (function () {
            ed.Status = 'A';
            ed.ModifiedBy = mvIdentity.currentUser;
            mvApplicantRepo.updateCurrentApplicant(ed).then(function () {
                mvNotifier.notify('Applicant has been Applied!');
                //$scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };

    $scope.view = function () {
        $scope.applicant = new mvApplicant();
        $scope.applicant.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.applicant.Vacancy = $scope.vacancy._id;
        $scope.applicant.Employer = $scope.vacancy.Employer;
        $scope.applicant.Status = "N";
        mvApplicantRepo.createApplicant($scope.applicant).then(function () {
            mvNotifier.notify('Vacancy Viewed Sucssefully!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});