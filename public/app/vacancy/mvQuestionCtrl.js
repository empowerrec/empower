angular.module('app').controller('mvQuestionCtrl', function ($scope, mvNotifier, mvLanguageSkillRepo, mvLanguageSkill, $routeParams, $translate, mvIdentity, $location, $rootScope) {
    var id = $routeParams.id;
    $scope.languageSkillNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.languageSkill = mvLanguageSkill.get({_id:id },(function(){
            //$scope.languageSkill.PeriodFrom = new Date($scope.languageSkill.PeriodFrom);
            //$scope.languageSkill.PeriodTo = new Date($scope.languageSkill.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.languageSkill = new mvLanguageSkill();
        //console.log(mvIdentity.currentJobSeeker._id);
        $scope.languageSkill.Deleted = false;
        $scope.languageSkill.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


   

    $scope.lang = $scope.languages[0].value;




    $scope.update = function () {
        $scope.loop();
        mvLanguageSkillRepo.updateCurrentLanguageSkill($scope.languageSkill).then(function () {
            mvNotifier.notify('LanguageSkill has been updated!');
            $location.path('/updateJobSeeker/LanguageSkills/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

   

    $scope.add = function(){
       
        var question = {};
        question.LanguageLevel = {};
        question.Language = {};
        langSkill.LanguageLevel = $scope.languageSkill.LanguageSkillLevel;
        langSkill.Language = $scope.languageSkill.Language;
        //langSkill._id = $scope.languageSkill._id;
        if ($rootScope.vacancy.LanguageSkills == undefined)
            $rootScope.vacancy.LanguageSkills = [];
        var flag = true;
        $rootScope.vacancy.LanguageSkills.forEach(function (element) {
            if (element.Language.Abbreviation == langSkill.Language.Abbreviation)
                flag = false;
               
        });
        if(flag)
        $rootScope.vacancy.LanguageSkills.push(langSkill);
    };

    $scope.loop = function(){

        var listItems = $("#languageSkillNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#LanguageSkillNameText2");
            $scope.languageSkillNameText = input.val();
            $scope.saveLanguageSkillName();

        });
    };

    $scope.delete = function (langSkill) {

        var array = $rootScope.vacancy.LanguageSkills;
       
        $rootScope.vacancy.LanguageSkills.forEach(function (element) {
            if (element.Language.Abbreviation == langSkill.Language.Abbreviation)
            {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.LanguageSkills.remove(element);
            }

        });
        
    };


    
});