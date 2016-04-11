angular.module('app').controller('mvInnerPageCtrl', function ($scope,  mvNotifier, mvInnerPageRepo,mvInnerPage,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.innerPage = mvInnerPage.get({_id:id },(function(){
        if($scope.innerPage.PageTitle) {
            for (var i = 0; i < $scope.innerPage.PageTitle.length; i++) {

                if ($scope.innerPage.PageTitle[i].Lang == $scope.currentLang) {
                    $scope.descriptionText = $scope.innerPage.PageTitle[i].Text;
                    $scope.lang = $scope.innerPage.PageTitle[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.innerPage = new mvInnerPage();
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


    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'}];

    $scope.lang = $scope.languages[0].value;


    $scope.update = function () {
        $scope.loop();
        mvInnerPageRepo.updateCurrentInnerPage($scope.innerPage).then(function () {
            mvNotifier.notify('Industry has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function(){
        $scope.loop();
        mvInnerPageRepo.createInnerPage($scope.innerPage).then(function () {
            mvNotifier.notify('New Industry Added!');
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
        if($scope.innerPage.PageTitle) {
            for (var i = 0; i < $scope.innerPage.PageTitle.length; i++) {
                var obj = $scope.innerPage.PageTitle[i];

                if ($scope.innerPage.PageTitle[i].Lang == $scope.lang) {
                    $scope.innerPage.PageTitle[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.innerPage.PageTile)
            {
                $scope.innerPage.PageTile = [];
            }
            var description = {"Lang": $scope.lang, "Text": $scope.descriptionText};
            $scope.innerPage.PageTile.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateDescription = function (industry) {
      $scope.lang = industry.Lang;
      $scope.descriptionText = industry.Text;
    };

    $scope.deleteDescription = function (industry) {

        for(var i = 0; i < $scope.industry.Description.length; i++) {
            var obj = $scope.industry.Description[i];
            console.log("Old" + obj.Lang);
            console.log("New " + industry.Lang);
            if(industry.Lang == obj.Lang) {
                $scope.industry.Description.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.industry.Description;
        console.log(descriptions);
        descriptions.delete(industry);
        $scope.industry.Description = descriptions;



    };*/


});