angular.module('app').controller('mvJobRoleListCtrl', function ($scope, mvJobRole,$translate, $rootScope, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.jobRoles = mvJobRole.query();
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'JobRoleName', text: 'Sort by JobRoleName'}];

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
