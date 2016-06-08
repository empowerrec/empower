angular.module('app').controller('mvAddressListCtrl', function ($scope, mvAddress, $translate, mvIdentity ,
    queryBulider , mvJobSeeker, $routeParams , mvAddressRepo , mvNotifier) {
    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.id;
    //$scope.addresses = mvAddress.query({ jobSeeker: mvIdentity.currentJobSeeker });
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function (js) {
                mvAddress.query({
                    query: queryBulider.qb("JobSeeker=='" + js._id + "'&&!Deleted"),
                    jobSeeker: js._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.addresses = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.getData();     
    
    $scope.deleteAdress = function (adress) {
        var ad = mvAddress.get({ _id: adress._id }, (function () {
            ad.Deleted = true;
            ad.DeletedBy = mvIdentity.currentUser;
            mvAddressRepo.updateCurrentAddress(ad).then(function () {
                mvNotifier.notify('Address has been deleted!');
                $scope.getData();   
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    $scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: '_id', text: 'Sort by _id'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getName = function(list){
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == $scope.currentLang) {
                return list[i].Text;
            }
        }
    };

    $scope.getLang = function(){
        return $translate.use();
    };
});
