angular.module('app').controller('mvEducationalInformationCtrl'
    , function ($scope, mvNotifier, mvEducationalInformationRepo,
        mvEducationalInformation, mvIdentity, mvGender, $routeParams, mvCity ,
        $location, mvUnivirsty, mvUnivirstyRepo, mvFaculty,
        mvFacultyRepo, $rootScope, mvSpecialization, mvSpecializationRepo, $translate, mvJobSeekerRepo, mvJobSeeker, mvCityRepo) {

        $scope.addEnabled = false;
        $scope.currentLang = $translate.use();
        $("#currentLang").val($rootScope.currentLang);
        $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
            $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
        }));
        $scope.educationalInformation = new mvEducationalInformation();

        if (mvIdentity.currentJobSeeker)
            $scope.educationalInformation.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.educationalInformation.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.showForm = false;

        $scope.updateEducationalInformation = function updateEducationalInformation(educationalInformation) {
            $scope.updateMode = true;
            $scope.addMode = false;
            $scope.showForm = true;
            //educationalInformation.EducationalLevel = educationalInformation.EducationalLevel._id;
            //educationalInformation.Grade = educationalInformation.Grade._id;
            //if (educationalInformation.Country != undefined)
            //    educationalInformation.Country = educationalInformation.Country._id;
            $scope.educationalInformation = educationalInformation;
        }

        $scope.addEducationalInformation = function addEducationalInformation() {
            $scope.updateMode = false;
            $scope.addMode = true;
            $scope.showForm = true;
            $scope.educationalInformation = new mvEducationalInformation();

        }

        $scope.deleteEducationalInformation = function (educationalInformation) {

            var array = $rootScope.jobSeeker.EducationalInformation;

            $rootScope.jobSeeker.EducationalInformation.forEach(function (element) {
                if (element._id == educationalInformation._id) {
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
                createUnivirsty(function () {
                    createFaculty(function () {
                        createSpecialization(function () {
                            var educationalInformation = {
                                EducationalLevel: $scope.educationalInformation.EducationalLevel,
                                JobSeeker: $scope.educationalInformation.JobSeeker,
                                Univirsty: $scope.educationalInformation.Univirsty,
                                Faculty: $scope.educationalInformation.Faculty,
                                Grade: $scope.educationalInformation.Grade,
                                Specialization: $scope.educationalInformation.Specialization,
                                GraduationYear: $scope.educationalInformation.GraduationYear,
                                StartYear: $scope.educationalInformation.StartYear,
                                Country: $scope.educationalInformation.Country,
                                City: $scope.educationalInformation.City,
                                Description: $scope.educationalInformation.Description,
                                Skills: $scope.educationalInformation.Skills
                            };
                            if ($rootScope.jobSeeker.EducationalInformation == undefined)
                                $rootScope.jobSeeker.EducationalInformation = [];
                            $rootScope.jobSeeker.EducationalInformation.push(educationalInformation);
                            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                                mvNotifier.notify('JobSeeker has been updated!');
                                $scope.showForm = false;
                                $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {
                                    $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
                                }));
                            }, function (reason) {
                                mvNotifier.error(reason);
                            });
                        });
                    });
                });
            });
        };


        $scope.update = function () {
            createCity(function () {
                createUnivirsty(function () {
                    createFaculty(function () {
                        createSpecialization(function () {
                            var educationalInformation = {
                                EducationalLevel: $scope.educationalInformation.EducationalLevel,
                                JobSeeker: $scope.educationalInformation.JobSeeker,
                                Univirsty: $scope.educationalInformation.Univirsty,
                                Faculty: $scope.educationalInformation.Faculty,
                                Grade: $scope.educationalInformation.Grade,
                                Specialization: $scope.educationalInformation.Specialization,
                                GraduationYear: $scope.educationalInformation.GraduationYear,
                                StartYear: $scope.educationalInformation.StartYear,
                                Country: $scope.educationalInformation.Country,
                                City: $scope.educationalInformation.City,
                                Description: $scope.educationalInformation.Description,
                                Skills: $scope.educationalInformation.Skills,
                                _id: $scope.educationalInformation._id
                            };

                            var array = $rootScope.jobSeeker.EducationalInformation;
                            $rootScope.jobSeeker.EducationalInformation.forEach(function (element) {
                                if (element._id == educationalInformation._id) {
                                    var index = array.indexOf(element);
                                    array[index] = educationalInformation;
                                }
                            });

                            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                                $rootScope.jobSeeker = mvJobSeeker.get({ _id: 'profile' }, (function () {


                                    $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);

                                }));
                                mvNotifier.notify('JobSeeker has been updated!');
                                $scope.showForm = false;

                            }, function (reason) {
                                mvNotifier.error(reason);
                            });
                        });
                    });
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
                    city.Country = $scope.educationalInformation.Country;
                    city.Name = [];
                    for (var i = 0; i < $rootScope.languages.length; i++) {

                        var cityNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": cityName };
                        city.Name.push(cityNameObj);
                    }



                    return mvCityRepo.createCity(city).then(function (createdCity) {

                        mvNotifier.notify('New City Added!');
                        $scope.educationalInformation.City = createdCity._id;
                        callback();
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });
                } else {
                    callback();
                }

            }
            else {
                $scope.educationalInformation.City = cityId;
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

        function createUnivirsty(callback) {
            var univirstyId = $("#hfUnivirstyId").val();
            var univirstyName = $("#univirstyName").val();
            if (!univirstyId) {
                if (univirstyName != '') {
                    var univirsty = new mvUnivirsty();
                    univirsty.Confirmed = false;
                    univirsty.Deleted = false;
                    univirsty.Name = [];
                    for (var i = 0; i < $rootScope.languages.length; i++) {

                        var univirstyNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": univirstyName };
                        univirsty.Name.push(univirstyNameObj);
                    }



                    return mvUnivirstyRepo.createUnivirsty(univirsty).then(function (createdUnivirsty) {

                        mvNotifier.notify('New Univirsty Added!');
                        $scope.educationalInformation.Univirsty = createdUnivirsty._id;
                        callback();
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });
                } else {
                    callback();
                }

            }
            else {
                $scope.educationalInformation.Univirsty = univirstyId;
                callback();
            }
        }

        function createFaculty(callback) {
            var facultyId = $("#hfFacultyId").val();
            var facultyName = $("#facultyName").val();
            if (!facultyId) {
                if (facultyName != '') {
                    var faculty = new mvFaculty();
                    faculty.Confirmed = false;
                    faculty.Deleted = false;
                    faculty.Name = [];
                    for (var i = 0; i < $rootScope.languages.length; i++) {

                        var facultyNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": facultyName };
                        faculty.Name.push(facultyNameObj);
                    }



                    return mvFacultyRepo.createFaculty(faculty).then(function (createdFaculty) {

                        mvNotifier.notify('New Faculty Added!');
                        $scope.educationalInformation.Faculty = createdFaculty._id;
                        callback();
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });
                } else {
                    callback();
                }
            } else {
                $scope.educationalInformation.Faculty = facultyId;
                callback();
            }

        }

        function createSpecialization(callback) {
            var specializationId = $("#hfSpecializationId").val();
            var specializationName = $("#specializationName").val();
            if (!specializationId) {
                if (specializationName != '') {
                    var specialization = new mvSpecialization();
                    specialization.Confirmed = false;
                    specialization.Deleted = false;
                    specialization.Name = [];
                    for (var i = 0; i < $rootScope.languages.length; i++) {

                        var specializationNameObj = { "Lang": $rootScope.languages[i].Abbreviation, "Text": specializationName };
                        specialization.Name.push(specializationNameObj);
                    }



                    return mvSpecializationRepo.createSpecialization(specialization).then(function (createdSpecialization) {

                        mvNotifier.notify('New Specialization Added!');
                        $scope.educationalInformation.Specialization = createdSpecialization._id;
                        callback();
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });
                } else {
                    callback();
                }
            } else {
                $scope.educationalInformation.Specialization = specializationId;
                callback();
            }

        }

        $(function () {
            $("#univirstyName").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "get",
                        async: false,
                        url: "/api/universtiesByName/" + request.term,
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
                            var p = $("#selectedUnivirsty");
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
                    $("#hfUnivirstyId").val(i.item.id);
                    $('#hfUnivirstyId').trigger('change');
                    var p = $("#selectedUnivirsty");
                    p.text(i.item.label);

                },
                minLength: 2
            });


        });
        $('#hfUnivirstyId').change(function () {
            var customerID = $(this).val();


        });

        $(function () {
            $("#facultyName").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "get",
                        async: false,
                        url: "/api/facultiesByName/" + request.term,
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
                            var p = $("#selectedFaculty");
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
                    $("#hfFacultyId").val(i.item.id);
                    $('#hfFacultyId').trigger('change');
                    var p = $("#selectedFaculty");
                    p.text(i.item.label);

                },
                minLength: 2
            });


        });
        $('#hfFacultyId').change(function () {
            var customerID = $(this).val();


        });

        $(function () {
            $("#specializationName").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "get",
                        async: false,
                        url: "/api/specializationsByName/" + request.term,
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
                            var p = $("#selectedFaculty");
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
                    $("#hfSpecializationId").val(i.item.id);
                    $('#hfSpecializationId').trigger('change');
                    var p = $("#selectedSpecialization");
                    p.text(i.item.label);

                },
                minLength: 2
            });


        });
        $('#hfSpecializationId').change(function () {
            var customerID = $(this).val();


        });

    });