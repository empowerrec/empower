angular.module('app').controller('mvProfessionalCertificationCtrl', function ($scope, $rootScope, mvNotifier, mvProfessionalCertificationRepo, mvProfessionalCertification, $routeParams
    , $translate, mvIdentity, $location, mvJobSeekerRepo, mvJobSeeker) {

    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
        $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
    }));
    $scope.professionalCertification = new mvProfessionalCertification();

    if (mvIdentity.currentJobSeeker)
        $scope.professionalCertification.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.professionalCertification.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateProfessionalCertification = function updateProfessionalCertification(experiane) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        experiane.PeriodFrom = new Date(experiane.PeriodFrom)
        experiane.PeriodTo = new Date(experiane.PeriodTo)
        $scope.professionalCertification = experiane;
    }

    $scope.addProfessionalCertification = function addProfessionalCertification() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.professionalCertification = new mvProfessionalCertification();

    }

    $scope.deleteProfessionalCertification = function (experiane) {

        var array = $rootScope.jobSeeker.ProfessionalCertifications;

        $rootScope.jobSeeker.ProfessionalCertifications.forEach(function (element) {
            if (element._id == experiane._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var professionalCertification = {
            CertificationName: $scope.professionalCertification.CertificationName,
            JobSeeker: $scope.professionalCertification.JobSeeker,
            InstitutionName: $scope.professionalCertification.InstitutionName,
            DateIssued: $scope.professionalCertification.DateIssued,
            CountryOfExamination: $scope.professionalCertification.CountryOfExamination,
            OverallGradeGPA: $scope.professionalCertification.OverallGradeGPA,
            Summary: $scope.professionalCertification.Summary
        };
        if ($rootScope.jobSeeker.ProfessionalCertifications == undefined)
            $rootScope.jobSeeker.ProfessionalCertifications = [];

        $rootScope.jobSeeker.ProfessionalCertifications.push(professionalCertification);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));
            $scope.showForm = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var professionalCertification = {
            CertificationName: $scope.professionalCertification.CertificationName,
            JobSeeker: $scope.professionalCertification.JobSeeker,
            InstitutionName: $scope.professionalCertification.InstitutionName,
            DateIssued: $scope.professionalCertification.DateIssued,
            CountryOfExamination: $scope.professionalCertification.CountryOfExamination,
            OverallGradeGPA: $scope.professionalCertification.OverallGradeGPA,
            Summary: $scope.professionalCertification.Summary,
            _id: $scope.professionalCertification._id
        };

        var array = $rootScope.jobSeeker.ProfessionalCertifications;

        $rootScope.jobSeeker.ProfessionalCertifications.forEach(function (element) {
            if (element._id == professionalCertification._id) {
                var index = array.indexOf(element);
                array[index] = professionalCertification;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));
            $scope.showForm = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});