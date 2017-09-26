angular.module('app').controller('mvTravelPreferenceListCtrl', function ($scope, mvTravelPreference,$translate, mvTravelPreferenceRepo, queryBulider, mvNotifier,$rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvTravelPreference.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.TravelPreferences = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deleteTravelPreference = function (TravelPreference) {
        var ed = mvTravelPreference.get({ _id: TravelPreference._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvTravelPreferenceRepo.updateCurrentTravelPreference(ed).then(function () {
                mvNotifier.notify('TravelPreference has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
