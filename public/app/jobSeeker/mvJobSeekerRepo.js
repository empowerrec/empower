angular.module('app').factory('mvJobSeekerRepo', function ($http, $q, mvJobSeeker, mvIdentity, $rootScope) {
    return {
        
        createJobSeeker: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            newJobSeeker.CreatedBy = mvIdentity.currentUser;
            //if ($rootScope.AddressId) {
            //    newJobSeeker.Address = $rootScope.AddressId;
            //    $rootScope.AddressId = undefined;
            //}          
            var dfd = $q.defer();
            newJobSeeker.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        createJobSeekerAfterCreatingUser: function (newJobSeekerData) {
            var newJobSeeker = new mvJobSeeker(newJobSeekerData);
            var dfd = $q.defer();
            newJobSeeker.$save().then(function (jobSeeker) {
                mvIdentity.currentJobSeeker = jobSeeker;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        updateCurrentJobSeeker: function (newJobSeekerData) {
            newJobSeekerData.ModifiedBy = mvIdentity.currentUser;
            //if ($rootScope.AddressId) {
            //    newJobSeekerData.Address += $rootScope.AddressId;
            //    $rootScope.AddressId = undefined;
            //}       
            var dfd = $q.defer();
            var clone = angular.copy(newJobSeekerData);
            angular.extend(clone, newJobSeekerData);
            clone.$update({ currentUser: mvIdentity.currentUser }).then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }, updateAllJobSeekersUnivirsty: function (areaId) {
            
            $.ajax({
                type: "get",
                async: false,
                url: "/api/updateJobSeekersUnivirsty/" + areaId,
                data: {},
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