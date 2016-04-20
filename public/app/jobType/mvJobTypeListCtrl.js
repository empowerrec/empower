angular.module('app').controller('mvJobTypeListCtrl', function ($scope, mvJobType,$translate, $rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.jobTypes = mvJobType.query();
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'JobTypeName', text: 'Sort by JobTypeName'}];

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
