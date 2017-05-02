
angular.module('app').controller('mvAddressCtrl', function ($scope, $location, mvNotifier, mvAddressRepo, mvAddress,
    mvIdentity, $routeParams, $translate, mvCityRepo, $q, mvCity, $rootScope, mvAreaRepo, mvArea, $route, mvJobSeekerRepo) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $scope.address = new mvAddress();

    if (mvIdentity.currentJobSeeker)
        $scope.address.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.address.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateaddress = function updateaddress(address) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        if (address.Country != undefined)
        address.Country = address.Country._id;
        $scope.address = address;
    }

    $scope.addaddress = function addaddress() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.address = new mvAddress();

    }

    $scope.deleteaddress = function (address) {

        var array = $rootScope.jobSeeker.Address;

        $rootScope.jobSeeker.Address.forEach(function (element) {
            if (element._id == address._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/addresss/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {
        createCity(function () {
            createArea(function () { 
        var address = {
            Country: $scope.address.Country,
            City: $scope.address.City,
            Area: $scope.address.Area,
            AddressLine1: $scope.address.AddressLine1,
            AddressLine2: $scope.address.AddressLine2
        };
        if ($rootScope.jobSeeker.address == undefined)
            $rootScope.jobSeeker.address = [];

        $rootScope.jobSeeker.Address.push(address);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/addresss/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });
            });
        })
    };


    $scope.update = function () {
        createCity(function () { createArea(function () { 
        var address = {
            Country: $scope.address.Country,
            City: $scope.address.City,
            Area: $scope.address.Area,
            AddressLine1: $scope.address.AddressLine1,
            AddressLine2: $scope.address.AddressLine2,
            _id: $scope.address._id
        };

        var array = $rootScope.jobSeeker.Address;

        $rootScope.jobSeeker.Address.forEach(function (element) {
            if (element._id == address._id) {
                var index = array.indexOf(element);
                array[index] = address;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/addresss/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });
        })
        });
    };

    function createCity(callback) {
        var cityId = $("#hfCityId").val();
        var cityName = $("#cityName").val();
        if (!cityId) {
            if (cityName != '') {
                var city = new mvCity();
                city.Confirmed = false;
                city.Deleted = false;
                city.Country = $scope.address.Country;
                city.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {

                    var cityNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": cityName };
                    city.Name.push(cityNameObj);
                }



                return mvCityRepo.createCity(city).then(function (createdCity) {

                    mvNotifier.notify('New City Added!');
                    $scope.address.City = createdCity._id;
                    callback();
                }, function (reason) {
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
                area.Deleted = false;
                area.City = $scope.address.City;
                area.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {

                    var areaNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": areaName };
                    area.Name.push(areaNameObj);
                }



                return mvAreaRepo.createArea(area).then(function (createdArea) {

                    mvNotifier.notify('New Area Added!');
                    $scope.address.Area = createdArea._id;
                    callback();
                }, function (reason) {
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

    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/citiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {

                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedCity");
                        var offset = p.offset();

                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {

                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfCityId").val(i.item.id);
                $('#hfCityId').trigger('change');
                var p = $("#selectedCity");
                p.text(i.item.label);

            },
            minLength: 2
        });


    });
    $('#hfCityId').change(function () {
        var customerID = $(this).val();


    });

    $(function () {
        $("#areaName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/areasByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {

                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedArea");
                        var offset = p.offset();

                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {

                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfAreaId").val(i.item.id);
                $('#hfAreaId').trigger('change');
                var p = $("#selectedArea");
                p.text(i.item.label);

            },
            minLength: 2
        });


    });
    $('#hfAreaId').change(function () {
        var customerID = $(this).val();


    });

});
