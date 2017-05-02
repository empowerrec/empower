angular.module('app').controller('mvjobQuestionCtrl', function ($scope, mvNotifier, mvQuestionRepo, mvQuestion, $routeParams, $translate, mvIdentity, $location, $rootScope) {
    var id = $routeParams.id;
    $scope.QuestionNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.AnswerText = "";
    $scope.selectedJobRole = {};
    $scope.QTypes = [{ "Value": "T", "Name": "Text" }, { "Value": "M", "Name": "Multi Answers" }, { "Value": "O", "Name": "One Answer" }];
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


   

    $scope.lang = $scope.languages[0].value;




    $scope.update = function () {
        $scope.loop();
        mvQuestionRepo.updateCurrentQuestion($scope.Question).then(function () {
            mvNotifier.notify('Question has been updated!');
            $location.path('/updateJobSeeker/Questions/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

   

    $scope.add = function(){
       
        var question = { Title: $scope.Question.Title, Type: $scope.Question.Type.Value };
        if ($rootScope.vacancy.Questions == undefined)
            $rootScope.vacancy.Questions = [];

        $rootScope.vacancy.Questions.push(question);
    };

    $scope.addAnswer = function (question , button) {

        var btn = button.currentTarget;
        var parent = btn.parentElement;
        var tr = parent.parentElement;
        var childs = tr.children;
        var child = childs[2];
        var input = child.children;

        var answer = { "Answer": input.answer.value };
        if (question.Answers == undefined)
            question.Answers = [];

        question.Answers.push(answer);
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

    $scope.delete = function (question) {

        var array = $rootScope.vacancy.Questions;
       
        $rootScope.vacancy.Questions.forEach(function (element) {
            if (element.Title == question.Title)
            {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });
        
    };

    $scope.deleteAnswer = function (question,answer) {

        var array = question.Answers;

        question.Answers.forEach(function (element) {
            if (element.Answer == answer.Answer) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

    };


    
});