angular.module('app').controller('mvIndustryListCtrl', function ($scope, mvIndustry,$translate, $rootScope) {

    $scope.industries = mvIndustry.query();
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'Description', text: 'Sort by Description'}];

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
