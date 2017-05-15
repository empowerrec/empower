angular.module('app').controller('mvEducationalInformationCtrl'
    , function ($scope, mvNotifier, mvEducationalInformationRepo,
        mvEducationalInformation, mvIdentity, mvGender, $routeParams,
        $location , mvUnivirsty , mvUnivirstyRepo , mvFaculty , 
        mvFacultyRepo, $rootScope, mvSpecialization, mvSpecializationRepo, $translate, mvJobSeekerRepo, mvJobSeeker ) {
    
        $scope.addEnabled = false;
        $scope.currentLang = $translate.use();
        $("#currentLang").val($rootScope.currentLang);

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
            educationalInformation.EducationalLevel = educationalInformation.EducationalLevel._id;
            educationalInformation.Grade = educationalInformation.Grade._id;
            //educationalInformation.Grade = educationalInformation.Grade._id;

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
                    //$rootScope.vacancy.Questions.remove(element);
                }

            });

            mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
                //$location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);

            }, function (reason) {
                mvNotifier.error(reason);
            });

        };

        $scope.add = function () {
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
                            GraduationYear: $scope.educationalInformation.GraduationYear
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
                            //$location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);

                        }, function (reason) {
                            mvNotifier.error(reason);
                        });
                    });
                });
            });
        };


        $scope.update = function () {
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
                //$location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);

            }, function (reason) {
                mvNotifier.error(reason);
            });
                    });
                });
            });
        };
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