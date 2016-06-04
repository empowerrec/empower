angular.module('app').factory('mvAddressRepo', function ($http, $q, mvAddress, mvIdentity, $rootScope) {
    return {
        
        createAddress: function (newAddressData) {
            var newAddress = new mvAddress(newAddressData);
            newAddress.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Address");
            newAddress.$save().then(function (response) {
                console.log(response.data);             
                //$rootScope.AddressId = [100, 200, 300];
                //if (!$rootScope.AddressId) {
                //    $rootScope.AddressId = [];
                    
                //}                                                                      
                //$rootScope.AddressId[$rootScope.AddressId.length] = response._id;                       
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
        ,updateCurrentAddress: function (newAddressData) {
            newAddressData.ModifiedBy = mvIdentity.currentUser;
            
            var dfd = $q.defer();
            
            var clone = angular.copy(newAddressData);
            angular.extend(clone, newAddressData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }, updateAllAddressesCity: function (cityId) {
            
            $.ajax({
                type: "get",
                async: false,
                url: "/api/updateAddressCity/" + cityId,
                data: {  },
                success: function (data) {
                    console.log(data);
                   
                },
                error: function (error) {
                    
                    console.log(error);
                },
                failure: function (response) {
                    alert(response.responseText);
                },
                beforeSend: function () {
                    
                },
                complete: function () {
                    
                  
                }
            });
        }
    };
});