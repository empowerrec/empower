angular.module('app').controller('mvreferenceRelationshipCtrl', function ($scope, mvNotifier, mvreferenceRelationshipRepo, mvreferenceRelationship, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.referenceRelationship = mvreferenceRelationship.get({ _id: id }, (function () {
            if ($scope.referenceRelationship.Name) {
                for (var i = 0; i < $scope.referenceRelationship.Name.length; i++) {
                    
                    if ($scope.referenceRelationship.Name[i].Lang == $scope.currentLang) {
                        $scope.descriptionText = $scope.referenceRelationship.Name[i].Text;
                        $scope.lang = $scope.referenceRelationship.Name[i].Lang;
                    }
                }
            }
            $scope.updateMode = true;
            $scope.addMode = false;
        }));
    } else {
        $scope.referenceRelationship = new mvreferenceRelationship();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.referenceRelationship.Deleted = false;
    }
    
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
    
    
    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];
    
    $scope.lang = $scope.languages[0].value;
    
    
    $scope.update = function () {
        //if ($scope.referenceRelationshipForm.$valid) {
            
            $scope.loop();
            mvreferenceRelationshipRepo.updateCurrentreferenceRelationship($scope.referenceRelationship).then(function () {
                mvNotifier.notify('referenceRelationship has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}

    };
    
    $scope.add = function () {
        //if ($scope.referenceRelationshipForm.$valid && $scope.addEnabled) {
            
            $scope.loop();
            
            mvreferenceRelationshipRepo.createreferenceRelationship($scope.referenceRelationship).then(function () {
                mvNotifier.notify('New referenceRelationship Added!');
                console.log("jj");
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        //}
    };
    
    $scope.loop = function () {
        
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.descriptionText = input.val();
            $scope.saveName();

        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.referenceRelationship.Name) {
            for (var i = 0; i < $scope.referenceRelationship.Name.length; i++) {
                var obj = $scope.referenceRelationship.Name[i];
                
                if ($scope.referenceRelationship.Name[i].Lang == $scope.lang) {
                    $scope.referenceRelationship.Name[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }
        
        if (!old) {
            if (!$scope.referenceRelationship.Name) {
                $scope.referenceRelationship.Name = [];
            }
            var description = { "Lang": $scope.lang, "Text": $scope.descriptionText };
            $scope.referenceRelationship.Name.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (referenceRelationship) {
      $scope.lang = referenceRelationship.Lang;
      $scope.descriptionText = referenceRelationship.Text;
    };

    $scope.deleteName = function (referenceRelationship) {

        for(var i = 0; i < $scope.referenceRelationship.Name.length; i++) {
            var obj = $scope.referenceRelationship.Name[i];
            console.log("Old" + obj.Lang);
            console.log("New " + referenceRelationship.Lang);
            if(referenceRelationship.Lang == obj.Lang) {
                $scope.referenceRelationship.Name.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.referenceRelationship.Name;
        console.log(descriptions);
        descriptions.delete(referenceRelationship);
        $scope.referenceRelationship.Name = descriptions;



    };*/


});