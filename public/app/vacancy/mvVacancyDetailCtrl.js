angular.module('app').controller('mvVacancyDetailCtrl', function ($scope, mvVacancy, $routeParams ,
    mvApplicantRepo , mvNotifier , mvApplicant, mvIdentity) {
    $scope.vacancy = mvVacancy.getForDetail({ _id: $routeParams.id });
    
    $scope.apply = function () {
        $scope.applicant = new mvApplicant();
        $scope.applicant.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.applicant.Vacancy = $scope.vacancy._id;
        mvApplicantRepo.createApplicant($scope.applicant).then(function () {
            mvNotifier.notify('New Applicant Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});