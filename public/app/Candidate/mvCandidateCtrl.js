angular.module('app').controller('mvCandidateCtrl', function ($scope, $location, mvNotifier, mvCandidateRepo, mvCandidate, $routeParams, $translate, mvFeature, $rootScope) {

    var vId = $routeParams.vId;
    var id = $routeParams.id;
    $scope.features = mvFeature.query({ currentLang: $rootScope.currentLang });

    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.Candidate = mvCandidate.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    }
    else {
        if (vId) {
            $scope.Candidate = new mvCandidate();
            $scope.Candidate.Package = vId;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
            $scope.Candidate.Deleted = false;
            $scope.Candidate.Deleted = false;
        }
    }

    $scope.update = function () {
        if ($scope.candidateForm.$valid) {
            mvCandidateRepo.updateCurrentCandidate($scope.Candidate).then(function () {
                mvNotifier.notify('Candidate has been updated!');
                $location.path('/candidates/' + vId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function () {
        if ($scope.candidateForm.$valid && $scope.addEnabled) {
            mvCandidateRepo.createCandidate($scope.Candidate).then(function () {
                mvNotifier.notify('New Candidate Added!');
                $scope.addEnabled = false;
                $location.path('/candidates/' + vId);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

});