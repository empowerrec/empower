angular.module('app').controller('mvLanguageSkillCtrl', function ($scope,  mvNotifier, mvLanguageSkillRepo, mvLanguageSkill,$routeParams,$translate, mvIdentity, $location) {
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


    //$scope.languages = [{value: 'en', text: 'English'},
    //    {value: 'ar', text: 'عربى'},
    //    {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;



    //$scope.languageSkillTypes = [{value: 'D', text: 'Direct LanguageSkill'},
    //    {value: 'S', text: 'Staffing Firm'}];
    //$scope.languageSkill.LanguageSkillType = $scope.languageSkillTypes[0].value;

    $scope.update = function () {
        $scope.loop();
        mvLanguageSkillRepo.updateCurrentLanguageSkill($scope.languageSkill).then(function () {
            mvNotifier.notify('LanguageSkill has been updated!');
            $location.path('/updateJobSeeker/LanguageSkills/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    //$scope.saveLanguageSkillName = function () {

    //    var old = false;
    //    if($scope.languageSkill.LanguageSkillName) {
    //        for (var i = 0; i < $scope.languageSkill.LanguageSkillName.length; i++) {
    //            var obj = $scope.languageSkill.LanguageSkillName[i];

    //            if ($scope.languageSkill.LanguageSkillName[i].Lang == $scope.lang) {
    //                $scope.languageSkill.LanguageSkillName[i].Text = $scope.languageSkillNameText;
    //                old = true;
    //            }

    //        }
    //    }

    //    if(!old) {
    //        if(!$scope.languageSkill.LanguageSkillName)
    //        {
    //            $scope.languageSkill.LanguageSkillName = [];
    //        }
    //        var languageSkillName = {"Lang": $scope.lang, "Text": $scope.languageSkillNameText};
    //        $scope.languageSkill.LanguageSkillName.push(languageSkillName);
    //    }
    //    $scope.languageSkillNameText = "";
    //    $scope.lang = "";

    //};

    //$scope.updateLanguageSkillName = function (languageSkill) {
    //  $scope.lang = languageSkill.Lang;
    //  $scope.languageSkillNameText = languageSkill.Text;
    //};

    //$scope.deleteLanguageSkillName = function (languageSkill) {

    //    for(var i = 0; i < $scope.languageSkill.LanguageSkillName.length; i++) {
    //        var obj = $scope.languageSkill.LanguageSkillName[i];
    //        console.log("Old" + obj.Lang);
    //        console.log("New " + languageSkill.Lang);
    //        if(languageSkill.Lang == obj.Lang) {
    //            $scope.languageSkill.LanguageSkillName.splice(i, 1);
    //            i--;
    //        }
    //    }
    //    /*
    //    var languageSkillNames = $scope.languageSkill.LanguageSkillName;
    //    console.log(languageSkillNames);
    //    languageSkillNames.delete(languageSkill);
    //    $scope.languageSkill.LanguageSkillName = languageSkillNames;
    //    */


    //};

    $scope.add = function(){
        $scope.loop();
        mvLanguageSkillRepo.createLanguageSkill($scope.languageSkill).then(function () {
            mvNotifier.notify('New LanguageSkill Added!');
            $scope.addEnabled = false;
            $location.path('/updateJobSeeker/LanguageSkills/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
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
});