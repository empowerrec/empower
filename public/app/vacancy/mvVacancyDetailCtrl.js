angular.module('app').controller('mvVacancyDetailCtrl', function ($scope, mvVacancy,
    $routeParams , queryBulider,
    mvApplicantRepo , mvNotifier , mvApplicant, mvIdentity) {
    $scope.vacancy = mvVacancy.getForDetail({ _id: $routeParams.id });
    $scope.isApplied = false;
    $scope.isJobSeeker = false;
    $scope.appliedMessage = "";
    if (mvIdentity.currentJobSeeker)
        $scope.isJobSeeker = true;

    $scope.oldApplicant = mvApplicant.getVacancyForApplicant({ jobSeeker: mvIdentity.currentJobSeeker._id, vacancy: $routeParams.id },
                      function (data, getResponseHeaders) {
        if (data.Vacancy) {
            $scope.isApplied = true;
            $scope.appliedMessage = "You Already Applied For this Job";
        }
                          
                      });
    $scope.apply = function () {
        $scope.applicant = new mvApplicant();
        $scope.applicant.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.applicant.Vacancy = $scope.vacancy._id;
        mvApplicantRepo.createApplicant($scope.applicant).then(function () {
            $scope.isApplied = true;
            $scope.appliedMessage = "You Already Applied For this Job";
            mvNotifier.notify('You Applied For This Job Sucssefully!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});