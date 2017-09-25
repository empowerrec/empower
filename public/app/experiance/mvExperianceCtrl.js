angular.module('app').controller('mvExperianceCtrl', function ($scope, $rootScope, mvNotifier, mvExperianceRepo, mvExperiance, $routeParams
    , $translate, mvIdentity, $location, mvJobSeekerRepo, mvJobSeeker) {

    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);
    $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
        $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
    }));
    $scope.experiance = new mvExperiance();

    if (mvIdentity.currentJobSeeker)
        $scope.experiance.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.experiance.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateExperiance = function updateExperiance(experiane) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        experiane.PeriodFrom = new Date(experiane.PeriodFrom)
        experiane.PeriodTo = new Date(experiane.PeriodTo)
        $scope.experiance = experiane;
    }

    $scope.addExperiance = function addExperiance() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.experiance = new mvExperiance();

    }

    $scope.deleteExperiance = function (experiane) {

        var array = $rootScope.jobSeeker.Experiances;

        $rootScope.jobSeeker.Experiances.forEach(function (element) {
            if (element._id == experiane._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {
        createCity(function () {

            var experiance = {
                Company: $scope.experiance.Company,
                JobSeeker: $scope.experiance.JobSeeker,
                CompanySize: $scope.experiance.CompanySize,
                CompanyType: $scope.experiance.CompanyType,
                Country: $scope.experiance.Country,
                City: $scope.experiance.City,
                Position: $scope.experiance.Position,
                CompanyWebsite: $scope.experiance.CompanyWebsite,
                Salary: $scope.experiance.Salary,
                JobRole: $scope.experiance.JobRole,
                ReportTo: $scope.experiance.ReportTo,
                Achievements: $scope.experiance.Achievements,
                FunctionalTasks: $scope.experiance.FunctionalTasks,
                PeriodFrom: $scope.experiance.PeriodFrom,
                PeriodTo: $scope.experiance.PeriodTo,
                Current: $scope.experiance.Current
            };
            if ($rootScope.jobSeeker.Experiances == undefined)
                $rootScope.jobSeeker.Experiances = [];

            $rootScope.jobSeeker.Experiances.push(experiance);

            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
                $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                    $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
                }));
                $scope.showForm = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });



        });


    };


    $scope.update = function () {
        createCity(function () {

            var experiance = {
                Company: $scope.experiance.Company,
                JobSeeker: $scope.experiance.JobSeeker,
                CompanySize: $scope.experiance.CompanySize,
                CompanyType: $scope.experiance.CompanyType,
                Country: $scope.experiance.Country,
                City: $scope.experiance.City,
                Position: $scope.experiance.Position,
                CompanyWebsite: $scope.experiance.CompanyWebsite,
                JobRole: $scope.experiance.JobRole,
                ReportTo: $scope.experiance.ReportTo,
                Salary: $scope.experiance.Salary,
                Achievements: $scope.experiance.Achievements,
                FunctionalTasks: $scope.experiance.FunctionalTasks,
                PeriodFrom: new Date($scope.experiance.PeriodFrom),
                PeriodTo: new Date($scope.experiance.PeriodTo),
                Current: $scope.experiance.Current,
                _id: $scope.experiance._id
            };

            var array = $rootScope.jobSeeker.Experiances;

            $rootScope.jobSeeker.Experiances.forEach(function (element) {
                if (element._id == experiance._id) {
                    var index = array.indexOf(element);
                    array[index] = experiance;
                }

            });

            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
                $scope.showForm = false;
                $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                    $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
                }));
                //$location.path('/updateJobSeeker/Experiances/' + mvIdentity.currentJobSeeker._id);

            }, function (reason) {
                mvNotifier.error(reason);
            });



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
                city.Country = $scope.experiance.Country;
                city.Name = [];
                for (var i = 0; i < $rootScope.languages.length; i++) {

                    var cityNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": cityName };
                    city.Name.push(cityNameObj);
                }



                return mvCityRepo.createCity(city).then(function (createdCity) {

                    mvNotifier.notify('New City Added!');
                    $scope.experiance.City = createdCity._id;
                    callback();
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            } else {
                callback();
            }

        }
        else {
            $scope.experiance.City = cityId;
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


});