angular.module('app').controller('mvInnerPageListCtrl', function ($scope, mvInnerPage,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.innerPages = mvInnerPage.query();
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'PageTitle', text: 'Sort by Page Title'}];

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
