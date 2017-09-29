angular.module('app').controller('mvSubUserInvitationListCtrl', function ($scope, mvSubUserInvitation,$translate, mvIdentity, mvSubUserInvitationRepo, mvNotifier, queryBulider) {
    var curUser = mvIdentity.currentUser._id;
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvSubUserInvitation.query({
            query: queryBulider.qb("!Deleted&&" + "Employer=='" + curUser +"'"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.subUserInvitations = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    //$scope.deleteSubUserInvitation = function (subUserInvitation) {
    //    var ed = mvSubUserInvitation.get({ _id: subUserInvitation._id }, (function () {
    //        ed.Deleted = true;
    //        ed.DeletedBy = mvIdentity.currentUser;
    //        mvSubUserInvitationRepo.updateCurrentSubUserInvitation(ed).then(function () {
    //            mvNotifier.notify('SubUserInvitation has been deleted!');
    //            $scope.getData();
    //        }, function (reason) {
    //            mvNotifier.error(reason);
    //        });
    //    }));
    //};
      $scope.UpdateStatus = function (subUserInvitation,type) {
          var ed = mvSubUserInvitation.get({ _id: subUserInvitation._id }, (function () {
              if (type == 'Cancel')  
                  ed.Status = "C";    
              else if (type == 'Accept')
                  ed.Status = "A";  
              else if (type == 'Reject')
                  ed.Status = "R";
           
              else  
                  ed.Status = "O";       
            mvSubUserInvitationRepo.updateCurrentSubUserInvitation(ed).then(function () {
                mvNotifier.notify('Status has been updated!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    $scope.getData();

});
