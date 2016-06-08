angular.module('app').controller('mvApplicantCtrl', function ($scope,  mvNotifier, mvApplicantRepo,mvApplicant,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.applicant = mvApplicant.get({_id:id },(function(){
        if($scope.applicant.Description) {
            for (var i = 0; i < $scope.applicant.Description.length; i++) {

                if ($scope.applicant.Description[i].Lang == $scope.currentLang) {
                    $scope.descriptionText = $scope.applicant.Description[i].Text;
                    $scope.lang = $scope.applicant.Description[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.applicant = new mvApplicant();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.applicant.Deleted = false;


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


    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'},
        {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {
        $scope.loop();
        mvApplicantRepo.updateCurrentApplicant($scope.applicant).then(function () {
            mvNotifier.notify('Applicant has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function(){
        $scope.loop();
        mvApplicantRepo.createApplicant($scope.applicant).then(function () {
            mvNotifier.notify('New Applicant Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#descriptions li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#DescriptionText2");
            $scope.descriptionText = input.val();
            $scope.saveDescription();

        });
    };

   $scope.saveDescription = function () {

        var old = false;
        if($scope.applicant.Description) {
            for (var i = 0; i < $scope.applicant.Description.length; i++) {
                var obj = $scope.applicant.Description[i];

                if ($scope.applicant.Description[i].Lang == $scope.lang) {
                    $scope.applicant.Description[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.applicant.Description)
            {
                $scope.applicant.Description = [];
            }
            var description = {"Lang": $scope.lang, "Text": $scope.descriptionText};
            $scope.applicant.Description.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateDescription = function (applicant) {
      $scope.lang = applicant.Lang;
      $scope.descriptionText = applicant.Text;
    };

    $scope.deleteDescription = function (applicant) {

        for(var i = 0; i < $scope.applicant.Description.length; i++) {
            var obj = $scope.applicant.Description[i];
            console.log("Old" + obj.Lang);
            console.log("New " + applicant.Lang);
            if(applicant.Lang == obj.Lang) {
                $scope.applicant.Description.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.applicant.Description;
        console.log(descriptions);
        descriptions.delete(applicant);
        $scope.applicant.Description = descriptions;



    };*/


});