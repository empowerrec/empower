angular.module('app').controller('mvSkillCtrl', function ($scope, $rootScope, mvNotifier, mvSkillRepo, mvSkill, $routeParams
    , $translate, mvIdentity, $location, mvCountryRepo, mvCountry, $q, mvJobSeekerRepo) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
        $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
    }));

    $scope.skill = new mvSkill();

    if (mvIdentity.currentJobSeeker)
        $scope.skill.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.skill.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateSkill = function updateSkill(skill) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        $scope.skill = skill;
    }

    $scope.addSkill = function addSkill() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.skill = new mvSkill();

    }

    $scope.deleteSkill = function (skill) {

        var array = $rootScope.jobSeeker.Skills;

        $rootScope.jobSeeker.Skills.forEach(function (element) {
            if (element._id == skill._id) {
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

            //$location.path('/updateJobSeeker/Skills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var skill = {
            SkillType: $scope.skill.SkillType,
            SkillLevel: $scope.skill.SkillLevel
        };
        if ($rootScope.jobSeeker.Skills == undefined)
            $rootScope.jobSeeker.Skills = [];

        $rootScope.jobSeeker.Skills.push(skill);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));

            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Skills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var skill = {
            SkillType: $scope.skill.SkillType,
            SkillLevel: $scope.skill.SkillLevel,
            _id: $scope.skill._id
        };

        var array = $rootScope.jobSeeker.Skills;

        $rootScope.jobSeeker.Skills.forEach(function (element) {
            if (element._id == skill._id) {
                var index = array.indexOf(element);
                array[index] = skill;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            }));

            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Skills/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
   
});