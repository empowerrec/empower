angular.module('app').controller('mvLanguageSkillCtrl', function ($scope, mvNotifier, mvLanguageSkillRepo,
    mvLanguageSkill, $routeParams, $translate,
    mvIdentity, $location, $rootScope, mvJobSeekerRepo, mvJobSeeker) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
        $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
    }));

    $scope.LanguageSkill = new mvLanguageSkill();

    if (mvIdentity.currentJobSeeker)
        $scope.LanguageSkill.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.LanguageSkill.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateLanguageSkill = function updateLanguageSkill(LanguageSkill) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        $scope.LanguageSkill = LanguageSkill;
    }

    $scope.addLanguageSkill = function addLanguageSkill() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.LanguageSkill = new mvLanguageSkill();

    }

    $scope.deleteLanguageSkill = function (LanguageSkill) {

        var array = $rootScope.jobSeeker.LanguageSkills;

        $rootScope.jobSeeker.LanguageSkills.forEach(function (element) {
            if (element._id == LanguageSkill._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));

            //$location.path('/updateJobSeeker/LanguageSkills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var LanguageSkill = {
            Language: $scope.LanguageSkill.Language,
            LanguageSkillLevel: $scope.LanguageSkill.LanguageSkillLevel
        };
        if ($rootScope.jobSeeker.LanguageSkills == undefined)
            $rootScope.jobSeeker.LanguageSkills = [];

        $rootScope.jobSeeker.LanguageSkills.push(LanguageSkill);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));

            $scope.showForm = false;
            //$location.path('/updateJobSeeker/LanguageSkills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var LanguageSkill = {
            Language: $scope.LanguageSkill.Language,
            LanguageSkillLevel: $scope.LanguageSkill.LanguageSkillLevel,
            _id: $scope.LanguageSkill._id
        };

        var array = $rootScope.jobSeeker.LanguageSkills;

        $rootScope.jobSeeker.LanguageSkills.forEach(function (element) {
            if (element._id == LanguageSkill._id) {
                var index = array.indexOf(element);
                array[index] = LanguageSkill;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));

            $scope.showForm = false;
            //$location.path('/updateJobSeeker/LanguageSkills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
});