angular.module('app').controller('mvCategoryListCtrl', function ($scope, mvCategory,$translate, $rootScope) {

    $scope.categories = mvCategory.query();
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
