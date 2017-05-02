angular.module('app').controller('mvIndustryCtrl', function ($scope, $location,  mvNotifier, mvIndustryRepo,mvIndustry,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.industry = mvIndustry.get({_id:id },(function(){
        if($scope.industry.Name) {
            for (var i = 0; i < $scope.industry.Name.length; i++) {

                if ($scope.industry.Name[i].Lang == $scope.currentLang) {
                    $scope.nameText = $scope.industry.Name[i].Text;
                    $scope.lang = $scope.industry.Name[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.industry = new mvIndustry();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.industry.Deleted = false;


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
        if ($scope.industryForm.$valid) {

            $scope.loop();
            mvIndustryRepo.updateCurrentIndustry($scope.industry).then(function () {
                mvNotifier.notify('Industry has been updated!');
                $location.path('/industries/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }

    };

    $scope.add = function () {
        if ($scope.industryForm.$valid && $scope.addEnabled) {

            $scope.loop();
            mvIndustryRepo.createIndustry($scope.industry).then(function () {
                mvNotifier.notify('New Industry Added!');
                $scope.addEnabled = false;
                $location.path('/industries/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.loop = function(){

        var listItems = $("#names li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();

        });
    };

   $scope.saveName = function () {

        var old = false;
        if($scope.industry.Name) {
            for (var i = 0; i < $scope.industry.Name.length; i++) {
                var obj = $scope.industry.Name[i];

                if ($scope.industry.Name[i].Lang == $scope.lang) {
                    $scope.industry.Name[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.industry.Name)
            {
                $scope.industry.Name = [];
            }
            var name = {"Lang": $scope.lang, "Text": $scope.nameText};
            $scope.industry.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (industry) {
      $scope.lang = industry.Lang;
      $scope.nameText = industry.Text;
    };

    $scope.deleteName = function (industry) {

        for(var i = 0; i < $scope.industry.Name.length; i++) {
            var obj = $scope.industry.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + industry.Lang);
            if(industry.Lang == obj.Lang) {
                $scope.industry.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var names = $scope.industry.Name;
        console.log(names);
        names.delete(industry);
        $scope.industry.Name = names;



    };*/


});