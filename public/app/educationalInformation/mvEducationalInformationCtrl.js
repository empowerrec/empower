angular.module('app').controller('mvEducationalInformationCtrl'
    , function ($scope, mvNotifier, mvEducationalInformationRepo,
        mvEducationalInformation, mvIdentity, mvGender, $routeParams,
        $location , mvUnivirsty , mvUnivirstyRepo , mvFaculty , 
        mvFacultyRepo, $rootScope, mvSpecialization , mvSpecializationRepo ) {
    
    var id = $routeParams.id;
    $scope.addEnabled = false;
    
    if (id) {
        $scope.educationalInformation = mvEducationalInformation.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            
            $scope.educationalInformation.BirthDate = new Date($scope.educationalInformation.BirthDate);
        }));
    } else {
        $scope.educationalInformation = new mvEducationalInformation();
        $scope.educationalInformation.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.educationalInformation.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
    
    $scope.update = function () {
        createUnivirsty(function () { createFaculty(function () { createSpecialization(function () { updateEeducationalInformation() }) }) });
    };
    
    $scope.add = function () {
        createUnivirsty(function () { createFaculty(function () { createSpecialization(function () { creatEeducationalInformation() }) }) });
    };
    
    function creatEeducationalInformation() {
        if ($scope.educationalInformationForm.$valid && $scope.addEnabled) {
            mvEducationalInformationRepo.createEducationalInformation($scope.educationalInformation).then(function () {
                mvNotifier.notify('New Educational Information Added!');
                $scope.addEnabled = false;
                $location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    }
    
    function updateEeducationalInformation() {
        if ($scope.educationalInformationForm.$valid) {
            mvEducationalInformationRepo.updateCurrentEducationalInformation($scope.educationalInformation).then(function () {
                mvNotifier.notify('Educational Information has been updated!');
                $location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    }
    function createUnivirsty(callback) {
        var univirstyId = $("#hfUnivirstyId").val();
        var univirstyName = $("#univirstyName").val();
        if (!univirstyId) {
            if (univirstyName != '') {
                var univirsty = new mvUnivirsty();
                univirsty.Confirmed = false;
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
     
});