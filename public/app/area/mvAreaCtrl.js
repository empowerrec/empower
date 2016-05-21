angular.module('app').controller('mvAreaCtrl', function ($scope, mvNotifier, mvAreaRepo, mvArea, $routeParams, $translate, $location, mvCity, mvCityRepo) {
    var id = $routeParams.id;
    $scope.areaNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $scope.languages = [{ value: 'en', text: 'English' }, { value: 'ar', text: 'ÚÑÈì' }];
        
    $scope.init = function () {
        if (id) {
            $scope.area = mvArea.get({ _id: id }, (function () {
                $scope.updateMode = true;
                $scope.addMode = false;
            }));
        } else {
            $scope.area = new mvArea();
            $scope.area.Confirmed = true;
            $scope.area.Deleted = false;
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.addEnabled = true;
        }
    };
    
    $scope.update = function () {
        if ($scope.areaForm.$valid) {
            $scope.loop();
            createCity();
            mvAreaRepo.updateCurrentArea($scope.area).then(function () {
                mvNotifier.notify('Area has been updated!');
                $location.path('/areas');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.areaForm.$valid && $scope.addEnabled) {
            $scope.loop();
            createCity();
            mvAreaRepo.createArea($scope.area).then(function () {
                mvNotifier.notify('New Area Added!');
                $location.path('/areas');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.getName = function (list , lang) {
        var selectedLang;
        if (lang) {
            selectedLang = lang;
        } else {
            selectedLang = $scope.currentLang;
        }
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };
    
    $scope.loop = function () {
        var listItems = $("#Names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.areaNameText = input.val();
            $scope.saveName();
        });
    };
    
    $scope.saveName = function () {
        
        var old = false;
        if ($scope.area.Name) {
            for (var i = 0; i < $scope.area.Name.length; i++) {
                if ($scope.area.Name[i].Lang == $scope.lang) {
                    $scope.area.Name[i].Text = $scope.areaNameText;
                    old = true;
                }
            }
        }
        if (!old) {
            if (!$scope.area.Name) {
                $scope.area.Name = [];
            }
            var areaName = { "Lang": $scope.lang, "Text": $scope.areaNameText };
            $scope.area.Name.push(areaName);
        }
        $scope.areaNameText = "";
        $scope.lang = "";
    };
        
    $scope.init();
        
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
                    $scope.area.City = createdCity._id;
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } 
        }
        else {
            $scope.area.City = cityId;
        }
    };

});