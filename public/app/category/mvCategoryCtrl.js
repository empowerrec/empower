angular.module('app').controller('mvCategoryCtrl', function ($scope, mvNotifier, mvCategoryRepo, mvCategory, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    
    if (id) {
        $scope.category = mvCategory.get({ _id: id }, (function () {
            if ($scope.category.Name) {
                for (var i = 0; i < $scope.category.Name.length; i++) {                    
                    if ($scope.category.Name[i].Lang == $scope.currentLang) {
                        $scope.nameText = $scope.category.Name[i].Text;
                        $scope.lang = $scope.category.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.category = new mvCategory();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
   
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];
    
    $scope.lang = $scope.languages[0].value;
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;
        
        if (list) {
            for (var i = 0; i < list.length; i++) {
                
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };       
    
    $scope.update = function () {
        $scope.loop();
        mvCategoryRepo.updateCurrentCategory($scope.category).then(function () {
            mvNotifier.notify('Category has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.add = function () {
        $scope.loop();
        mvCategoryRepo.createCategory($scope.category).then(function () {
            mvNotifier.notify('New Category Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
    
    $scope.loop = function () {        
        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText");
            $scope.nameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {        
        var old = false;
        if ($scope.category.Name) {
            for (var i = 0; i < $scope.category.Name.length; i++) {                
                if ($scope.category.Name[i].Lang == $scope.lang) {
                    $scope.category.Name[i].Text = $scope.nameText;
                    old = true;
                }
            }
        }
        
        if (!old) {
            if (!$scope.category.Name) {
                $scope.category.Name = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
            $scope.category.Name.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };

});