
angular.module('app').controller('mvAddressCtrl', function ($scope, mvNotifier, mvAddressRepo, mvAddress, mvIdentity, $routeParams, $translate) {
    var id = $routeParams.id;
    $scope.descriptionText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.address = mvAddress.get({_id:id },(function(){
        //if($scope.address.AddressName) {
        //    for (var i = 0; i < $scope.address.AddressName.length; i++) {

        //        if ($scope.address.AddressName[i].Lang == $scope.currentLang) {
        //            $scope.descriptionText = $scope.address.AddressName[i].Text;
        //            $scope.lang = $scope.address.AddressName[i].Lang;
        //        }
        //    }
        //}
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
    $scope.address = new mvAddress();
    $scope.address.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];


    }
    //for list ctrl
    //st
    $scope.currentUser = mvIdentity.currentUser;
    $scope.addresses = mvAddress.query();
    //$scope.currentLang = $translate.use();
    //$scope.sortOptions = [{ value: 'JobRoleName', text: 'Sort by JobRoleName' }];
    
    //$scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getName = function (list) {
        for (var i = 0; i < list.length; i++) {
            
            if (list[i].Lang == $scope.currentLang) {
                return list[i].Text;
            }
        }
    };
    
    $scope.getLang = function () {
        return $translate.use();
    };
    //end
    
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

    //$scope.countries = [{ value: 'EG', text: 'Egypt' },
    //    { value: 'OM', text: 'Oman' }];
    //$scope.address.Country = $scope.countries[0].value;
    
    $scope.update = function () {
        $scope.loop();
        mvAddressRepo.updateCurrentAddress($scope.address).then(function () {
            mvNotifier.notify('Address has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.add = function(){
        $scope.loop();
    
        mvAddressRepo.createAddress($scope.address).then(function () {
            mvNotifier.notify('New Address Added!');
            console.log("jj");
            //$scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#AddressNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#AddressNameText2");
            $scope.descriptionText = input.val();
            $scope.saveAddressName();

        });
    };

   $scope.saveAddressName = function () {

        var old = false;
        if($scope.address.AddressName) {
            for (var i = 0; i < $scope.address.AddressName.length; i++) {
                var obj = $scope.address.AddressName[i];

                if ($scope.address.AddressName[i].Lang == $scope.lang) {
                    $scope.address.AddressName[i].Text = $scope.descriptionText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.address.AddressName)
            {
                $scope.address.AddressName = [];
            }
            var description = {"Lang": $scope.lang, "Text": $scope.descriptionText};
            $scope.address.AddressName.push(description);
        }
        $scope.descriptionText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateAddressName = function (address) {
      $scope.lang = address.Lang;
      $scope.descriptionText = address.Text;
    };

    $scope.deleteAddressName = function (address) {

        for(var i = 0; i < $scope.address.AddressName.length; i++) {
            var obj = $scope.address.AddressName[i];
            console.log("Old" + obj.Lang);
            console.log("New " + address.Lang);
            if(address.Lang == obj.Lang) {
                $scope.address.AddressName.splice(i, 1);
                i--;
            }
        }
        /*
        var descriptions = $scope.address.AddressName;
        console.log(descriptions);
        descriptions.delete(address);
        $scope.address.AddressName = descriptions;



    };*/


});
