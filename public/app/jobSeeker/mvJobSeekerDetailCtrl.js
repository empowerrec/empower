angular.module('app').controller('mvJobSeekerDetailCtrl',
    function ($scope, mvJobSeeker,
        $routeParams, $translate, mvIdentity, mvUserFeature) {
        $scope.isEmployer = false;
        if (mvIdentity.currentEmployer)
            $scope.isEmployer = true;
    $scope.currentLang = $translate.use();
        $scope.jobSeeker = mvJobSeeker.get({ _id: $routeParams.id });
        mvUserFeature.updateByCode({ code: 200 });
    $scope.showContactInformation = false;

        $scope.showContactInformationFunction = function () {
            mvUserFeature.updateByCode({ code: 300 });
            $scope.showContactInformation = true;

        };

        $scope.getUserFeautures = function () {
            mvUserFeature.query({
                query: queryBulider.qb("User=='" + $routeParams.uId + "'&&!Deleted"),
                currentPage: $scope.paging.currentPage,
                pageSize: $scope.paging.pageSize
            }, (function (res) {
                $scope.userFeatures = res[0].collection;
                $scope.allDataCount = res[0].allDataCount;
            }));
        };
});