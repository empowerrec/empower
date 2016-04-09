angular.module('app').controller('mvVacancyListCtrl', function ($scope, mvVacancy,$translate, $rootScope) {

    $scope.vacancies = mvVacancy.query();
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'VacancyName', text: 'Sort by VacancyName'},
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
