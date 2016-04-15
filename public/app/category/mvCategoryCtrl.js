angular.module('app').controller('mvCategoryCtrl', function ($scope, mvNotifier, mvCategoryRepo, mvCategory, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    
    if (id) {
        $scope.category = mvCategory.get({ _id: id }, (function () {
            if ($scope.category.Description) {
                for (var i = 0; i < $scope.category.Description.length; i++) {                    
                    if ($scope.category.Description[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.category.Description[i].Text;
                        $scope.lang = $scope.category.Description[i].Lang;
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
        var listItems = $("#descriptions li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#DescriptionText");
            $scope.descriptionText = input.val();
            $scope.saveDescription();
        });
    };
    
    $scope.saveDescription = function () {        
        var old = false;
        if ($scope.category.Description) {
            for (var i = 0; i < $scope.category.Description.length; i++) {                
                if ($scope.category.Description[i].Lang == $scope.lang) {
                    $scope.category.Description[i].Text = $scope.descriptionText;
                    old = true;
                }
            }
        }
        
        if (!old) {
            if (!$scope.category.Description) {
                $scope.category.Description = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.category.Description.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };

});