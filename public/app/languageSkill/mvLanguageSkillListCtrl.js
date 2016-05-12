angular.module('app').controller('mvLanguageSkillListCtrl', function ($scope, mvLanguageSkill,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.languageSkills = mvLanguageSkill.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
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
