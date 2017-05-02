angular.module('app').controller('mvQuestionCtrl', function ($scope,  mvNotifier, mvQuestionRepo, mvQuestion,$routeParams,$translate, mvIdentity, $location) {
    var id = $routeParams.id;
    $scope.QuestionNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.Question = mvQuestion.get({_id:id },(function(){
            //$scope.Question.PeriodFrom = new Date($scope.Question.PeriodFrom);
            //$scope.Question.PeriodTo = new Date($scope.Question.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.Question = new mvQuestion();
        //console.log(mvIdentity.currentJobSeeker._id);
        $scope.Question.Deleted = false;
        $scope.Question.JobSeeker = mvIdentity.currentJobSeeker;
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



    //$scope.QuestionTypes = [{value: 'D', text: 'Direct Question'},
    //    {value: 'S', text: 'Staffing Firm'}];
    //$scope.Question.QuestionType = $scope.QuestionTypes[0].value;

    $scope.update = function () {
        $scope.loop();
        mvQuestionRepo.updateCurrentQuestion($scope.Question).then(function () {
            mvNotifier.notify('Question has been updated!');
            $location.path('/updateJobSeeker/Questions/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    //$scope.saveQuestionName = function () {

    //    var old = false;
    //    if($scope.Question.QuestionName) {
    //        for (var i = 0; i < $scope.Question.QuestionName.length; i++) {
    //            var obj = $scope.Question.QuestionName[i];

    //            if ($scope.Question.QuestionName[i].Lang == $scope.lang) {
    //                $scope.Question.QuestionName[i].Text = $scope.QuestionNameText;
    //                old = true;
    //            }

    //        }
    //    }

    //    if(!old) {
    //        if(!$scope.Question.QuestionName)
    //        {
    //            $scope.Question.QuestionName = [];
    //        }
    //        var QuestionName = {"Lang": $scope.lang, "Text": $scope.QuestionNameText};
    //        $scope.Question.QuestionName.push(QuestionName);
    //    }
    //    $scope.QuestionNameText = "";
    //    $scope.lang = "";

    //};

    //$scope.updateQuestionName = function (Question) {
    //  $scope.lang = Question.Lang;
    //  $scope.QuestionNameText = Question.Text;
    //};

    //$scope.deleteQuestionName = function (Question) {

    //    for(var i = 0; i < $scope.Question.QuestionName.length; i++) {
    //        var obj = $scope.Question.QuestionName[i];
    //        console.log("Old" + obj.Lang);
    //        console.log("New " + Question.Lang);
    //        if(Question.Lang == obj.Lang) {
    //            $scope.Question.QuestionName.splice(i, 1);
    //            i--;
    //        }
    //    }
    //    /*
    //    var QuestionNames = $scope.Question.QuestionName;
    //    console.log(QuestionNames);
    //    QuestionNames.delete(Question);
    //    $scope.Question.QuestionName = QuestionNames;
    //    */


    //};

    $scope.add = function(){
        $scope.loop();
        mvQuestionRepo.createQuestion($scope.Question).then(function () {
            mvNotifier.notify('New Question Added!');
            $scope.addEnabled = false;
            $location.path('/updateJobSeeker/Questions/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#QuestionNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#QuestionNameText2");
            $scope.QuestionNameText = input.val();
            $scope.saveQuestionName();

        });
    };
});