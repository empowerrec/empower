
angular.module('app').controller('mvAddressCtrl', function ($scope, $location, mvNotifier, mvAddressRepo, mvAddress,
    mvIdentity, $routeParams, $translate , mvCityRepo , $q , mvCity , $rootScope , mvAreaRepo , mvArea , $route) {
    var id = $routeParams.id;
    $("#currentLang").val($rootScope.currentLang);
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.address = mvAddress.get({_id:id },(function(){
       
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
    $scope.address = new mvAddress();
        $scope.address.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.address.Deleted =false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
       


    }
   
    $scope.currentUser = mvIdentity.currentUser;
    $scope.addresses = mvAddress.query();
   
    
    $scope.update = function () {
        
       
    createCity(function() { createArea(function(){ updateAddress()}) });
           

    };

    $scope.add = function (){
        
        createCity(function () { createArea(function(){createAddress()}) });
        

    };
    
    function createAddress() {
        mvAddressRepo.createAddress($scope.address).then(function () {
            
            mvNotifier.notify('New Address Added!');
            //$route.reload();
            $location.path('/updateJobSeeker/Adresses/' + mvIdentity.currentJobSeeker._id);
            
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }
    
    function updateAddress() {
        mvAddressRepo.updateCurrentAddress($scope.address).then(function () {
            console.log(mvIdentity.currentJobSeeker);
            mvNotifier.notify('Address has been updated!');
            //$route.reload();
            $location.path('/updateJobSeeker/Adresses/' + mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }

    function createCity(callback) {
        var cityId = $("#hfCityId").val();
        var cityName = $("#cityName").val();
        if (!cityId) {
            if (cityName != '') {
                var city = new mvCity();
                city.Confirmed = false;
                city.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var cityNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": cityName };
                    city.Name.push(cityNameObj);
                }
                

                
                return mvCityRepo.createCity(city).then(function(createdCity) {

                    mvNotifier.notify('New City Added!');
                    $scope.address.City = createdCity._id;
                    callback();
                }, function(reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }

        }
        else {
            $scope.address.City = cityId;
            callback();
        }
    }

    function createArea(callback) {
        var areaId = $("#hfAreaId").val();
        var areaName = $("#areaName").val();
        if (!areaId) {
            if (areaName != '') {
                var area = new mvArea();
                area.Confirmed = false;
                area.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var areaNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": areaName  };
                    area.Name.push(areaNameObj);
                }
                
               

                return mvAreaRepo.createArea(area).then(function(createdArea) {

                    mvNotifier.notify('New Area Added!');
                    $scope.address.Area = createdArea._id;
                    callback();
                }, function(reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }
        } else {
            $scope.address.Area = areaId;
            callback();
        }
        
    }    


});
