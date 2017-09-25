angular.module('app').controller('mvJobSeekerJobPreferencesCtrl'
    , function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, mvGender, $routeParams, $rootScope) {
    
    
    var id = $routeParams.id;
    $scope.addEnabled = false;

    if (id) {
        $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            $("#hfCityId1").val($rootScope.jobSeeker.FirstPreferredCity._id);
            $("#hfCityId2").val($rootScope.jobSeeker.SecondPreferredCity._id);
            $("#hfCityId3").val($rootScope.jobSeeker.ThirdPreferredCity._id);  
            $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            $scope.photoName = $rootScope.jobSeeker.Photo;
            $scope.cvName = $rootScope.jobSeeker.CVLink;
        }));

    } else {
        $rootScope.jobSeeker = new mvJobSeeker();
        $rootScope.jobSeeker.Confirmed = false;
        $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
    
    $scope.update = function () {
        if ($scope.jobSeekerForm.$valid) {
            var firstPreferredCity = $("#hfCityId1").val();
            var secondPreferredCity = $("#hfCityId2").val();
            var thirdPreferredCity = $("#hfCityId3").val();
            $rootScope.jobSeeker.FirstPreferredCity = firstPreferredCity;
            $rootScope.jobSeeker.SecondPreferredCity = secondPreferredCity;
            $rootScope.jobSeeker.ThirdPreferredCity = thirdPreferredCity;

            mvJobSeekerRepo.updateCurrentJobSeeker( $rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.jobSeekerForm.$valid && $scope.addEnabled) {
            mvJobSeekerRepo.createJobSeeker( $rootScope.jobSeeker).then(function () {
                mvNotifier.notify('New JobSeeker Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $(function () {
        $("#cityName1").autocomplete({
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
                        var p = $("#selectedCity1");
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
                $("#hfCityId1").val(i.item.id);
                $('#hfCityId1').trigger('change');
                var p = $("#selectedCity1");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });

    $(function () {
        $("#cityName2").autocomplete({
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
                        var p = $("#selectedCity1");
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
                $("#hfCityId2").val(i.item.id);
                $('#hfCityId2').trigger('change');
                var p = $("#selectedCity2");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });


    $(function () {
        $("#cityName3").autocomplete({
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
                        var p = $("#selectedCity3");
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
                $("#hfCityId3").val(i.item.id);
                $('#hfCityId3').trigger('change');
                var p = $("#selectedCity3");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
     
});