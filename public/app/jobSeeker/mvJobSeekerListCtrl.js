angular.module('app').controller('mvJobSeekerListCtrl', function ($scope, mvEmployer,$translate, $rootScope) {

    $scope.employers = mvEmployer.query();
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'EmployerName', text: 'Sort by EmployerName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
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
