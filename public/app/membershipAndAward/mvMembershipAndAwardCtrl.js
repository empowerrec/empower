angular.module('app').controller('mvMembershipAndAwardCtrl', function ($scope, $rootScope, mvNotifier, mvMembershipAndAwardRepo, mvMembershipAndAward, $routeParams
    , $translate, mvIdentity, $location, mvJobSeekerRepo, mvJobSeeker) {

    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
        $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
    }));
    $scope.membershipAndAward = new mvMembershipAndAward();

    if (mvIdentity.currentJobSeeker)
        $scope.membershipAndAward.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.membershipAndAward.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateMembershipAndAward = function updateMembershipAndAward(experiane) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        $scope.membershipAndAward = experiane;
    }

    $scope.addMembershipAndAward = function addMembershipAndAward() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.membershipAndAward = new mvMembershipAndAward();

    }

    $scope.deleteMembershipAndAward = function (experiane) {

        var array = $rootScope.jobSeeker.MembershipAndAwards;

        $rootScope.jobSeeker.MembershipAndAwards.forEach(function (element) {
            if (element._id == experiane._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var membershipAndAward = {
            Membership: $scope.membershipAndAward.Membership,
            HonorAndAward: $scope.membershipAndAward.HonorAndAward,
            JobSeeker: $scope.membershipAndAward.JobSeeker
        };
        if ($rootScope.jobSeeker.MembershipAndAwards == undefined)
            $rootScope.jobSeeker.MembershipAndAwards = [];

        $rootScope.jobSeeker.MembershipAndAwards.push(membershipAndAward);

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
        var membershipAndAward = {
            Membership: $scope.membershipAndAward.Membership,
            HonorAndAward: $scope.membershipAndAward.HonorAndAward,
            JobSeeker: $scope.membershipAndAward.JobSeeker,
            _id: $scope.membershipAndAward._id
        };

        var array = $rootScope.jobSeeker.MembershipAndAwards;

        $rootScope.jobSeeker.MembershipAndAwards.forEach(function (element) {
            if (element._id == membershipAndAward._id) {
                var index = array.indexOf(element);
                array[index] = membershipAndAward;
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