angular.module('app').controller('mvAddressListCtrl', function ($scope, mvAddress,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.addresses = mvAddress.query({ jobSeeker: mvIdentity.currentJobSeeker });
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
