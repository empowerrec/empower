angular.module('app').controller('mvSkillListCtrl', function ($scope, mvSkill,$translate, mvIdentity, mvSkillRepo, mvNotifier) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.skills = mvSkill.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{value: 'SkillName', text: 'Sort by SkillName'},
    //    {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
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
    
    $scope.delete = function (skill) {
        console.log('delete');
        skill.Deleted = true;
        mvSkillRepo.updateCurrentExperiannce().then(function () {
            mvNotifier.notify('Skill has been deleted!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };
});
