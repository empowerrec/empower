angular.module('app').controller('mvVacancyCtrl', function ($scope, mvNotifier, mvVacancyRepo, $rootScope,mvVacancy, $routeParams, $translate, mvCity, mvCityRepo, mvArea, mvAreaRepo) {
    var id = $routeParams.id;
    
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.vacancy = mvVacancy.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            $scope.vacancy.AvailableFrom = new Date($scope.vacancy.AvailableFrom);
            $scope.vacancy.AvailableTo = new Date($scope.vacancy.AvailableTo);
        }));
    } else {
        $scope.vacancy = new mvVacancy();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.vacancy.Deleted = false;
    }
    
    $scope.update = function () {
        if ($scope.vacancyForm.$valid) {
            createCity();
            createArea();
            mvVacancyRepo.updateCurrentVacancy($scope.vacancy).then(function () {
                mvNotifier.notify('Vacancy has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.vacancyForm.$valid && $scope.addEnabled) {
            createCity();
            createArea();
            if (validate()) {
                mvVacancyRepo.createVacancy($scope.vacancy).then(function() {
                    mvNotifier.notify('New Vacancy Added!');
                    $scope.addEnabled = false;
                }, function(reason) {
                    mvNotifier.error(reason);
                });
            }
        }
    };
    
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
                $("#hfAreaId").val(i.item.id);
                $('#hfAreaId').trigger('change');
                var p = $("#selectedArea");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
    
    $('#hfCityId').change(function () {

    });
    
    function createCity() {
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
                return mvCityRepo.createCity(city).then(function (createdCity) {
                    mvNotifier.notify('New City Added!');
                    $scope.vacancy.City = createdCity._id;
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            }
        }
        else {
            $scope.vacancy.City = cityId;
        }
    };
    

    function createArea() {
        var areaId = $("#hfAreaId").val();
        var areaName = $("#areaName").val();
        if (!areaId) {
            if (areaName != '') {
                var area = new mvArea();
                area.Confirmed = false;
                area.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {
                    
                    var areaNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": areaName };
                    area.Name.push(areaNameObj);
                }
                return mvAreaRepo.createArea(area).then(function (createdArea) {
                    mvNotifier.notify('New Area Added!');
                    $scope.vacancy.Area = createdArea._id;
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            }
        }
        else {
            $scope.vacancy.Area = areaId;
        }
    };


    function validate() {
        var cityId = $("#hfCityId").val();
        var areaId = $("#hfAreaId").val();
        if (!cityId) {
            mvNotifier.error("City is required");
            return false;
        }
        else if (!areaId) {
            mvNotifier.error("Area is required");
            return false;
        }
        else {
            return true;
        }
    };
});