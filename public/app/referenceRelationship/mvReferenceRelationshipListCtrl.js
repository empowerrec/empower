angular.module('app').controller('mvreferenceRelationshipListCtrl', function ($scope, mvreferenceRelationship,$translate, mvreferenceRelationshipRepo, queryBulider, mvNotifier,$rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvreferenceRelationship.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.referenceRelationships = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.deletereferenceRelationship = function (referenceRelationship) {
        var ed = mvreferenceRelationship.get({ _id: referenceRelationship._id }, (function () {
            ed.Deleted = true;
            ed.DeletedBy = mvIdentity.currentUser;
            mvreferenceRelationshipRepo.updateCurrentreferenceRelationship(ed).then(function () {
                mvNotifier.notify('referenceRelationship has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    
    $scope.getData();

});
