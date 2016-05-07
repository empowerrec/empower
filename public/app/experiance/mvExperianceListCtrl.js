angular.module('app').controller('mvExperianceListCtrl', function ($scope, mvExperiance,$translate, mvIdentity, mvExperianceRepo, mvNotifier) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.experiances = mvExperiance.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: 'ExperianceName', text: 'Sort by ExperianceName'},
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
    
    $scope.delete = function (experiance) {
        console.log('delete');
        experiance.Deleted = true;
        mvExperianceRepo.updateCurrentExperiannce().then(function () {
            mvNotifier.notify('Experiance has been deleted!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };
});
