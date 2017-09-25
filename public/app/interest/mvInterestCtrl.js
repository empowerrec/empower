angular.module('app').controller('mvInterestCtrl', function ($scope, $rootScope, mvNotifier, mvInterestRepo, mvInterest, $routeParams
    , $translate, mvIdentity, $location, mvJobSeekerRepo) {

    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $scope.interest = new mvInterest();

    if (mvIdentity.currentJobSeeker)
        $scope.interest.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.interest.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateInterest = function updateInterest(experiane) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        $scope.interest = experiane;
    }

    $scope.addInterest = function addInterest() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.interest = new mvInterest();

    }

    $scope.deleteInterest = function (experiane) {

        var array = $rootScope.jobSeeker.Interests;

        $rootScope.jobSeeker.Interests.forEach(function (element) {
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

            var interest = {
                Interest: $scope.interest.Interest,
                JobSeeker: $scope.interest.JobSeeker
            };
            if ($rootScope.jobSeeker.Interests == undefined)
                $rootScope.jobSeeker.Interests = [];

            $rootScope.jobSeeker.Interests.push(interest);

            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
                $scope.showForm = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });

    };


    $scope.update = function () {

            var interest = {
                Interest: $scope.interest.Interest,
                JobSeeker: $scope.interest.JobSeeker,
                _id: $scope.interest._id
            };

            var array = $rootScope.jobSeeker.Interests;

            $rootScope.jobSeeker.Interests.forEach(function (element) {
                if (element._id == interest._id) {
                    var index = array.indexOf(element);
                    array[index] = interest;
                }

            });

            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
                $scope.showForm = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });

    };
    
});