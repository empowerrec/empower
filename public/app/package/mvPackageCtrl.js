angular.module('app').controller('mvPackageCtrl', function ($scope,  $location,mvNotifier, mvPackageRepo,mvPackage,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.Package = mvPackage.get({_id:id },(function(){
        if($scope.Package.Name) {
            for (var i = 0; i < $scope.Package.Name.length; i++) {

                if ($scope.Package.Name[i].Lang == $scope.currentLang) {
                    $scope.nameText = $scope.Package.Name[i].Text;
                    $scope.lang = $scope.Package.Name[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.Package = new mvPackage();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.Package.Deleted = false;


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
        if ($scope.packageForm.$valid) {            
            $scope.loop();
            mvPackageRepo.updateCurrentPackage($scope.Package).then(function () {
                mvNotifier.notify('Package has been updated!');
                $location.path('/packages/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.add = function (){
        if ($scope.packageForm.$valid && $scope.addEnabled) {
            $scope.loop();
            mvPackageRepo.createPackage($scope.Package).then(function () {
                mvNotifier.notify('New Package Added!');
                $scope.addEnabled = false;
                $location.path('/packages/');
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
        if($scope.Package.Name) {
            for (var i = 0; i < $scope.Package.Name.length; i++) {
                var obj = $scope.Package.Name[i];

                if ($scope.Package.Name[i].Lang == $scope.lang) {
                    $scope.Package.Name[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.Package.Name)
            {
                $scope.Package.Name = [];
            }
            var name = {"Lang": $scope.lang, "Text": $scope.nameText};
            $scope.Package.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };
 
});