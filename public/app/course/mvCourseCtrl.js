angular.module('app').controller('mvCourseCtrl', function ($scope, mvNotifier,
    mvCourseRepo, mvCourse, $routeParams, $translate, mvIdentity, $location, $rootScope, mvJobSeekerRepo) {
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    $("#currentLang").val($rootScope.currentLang);

    $scope.course = new mvCourse();

    if (mvIdentity.currentJobSeeker)
        $scope.course.JobSeeker = mvIdentity.currentJobSeeker;
    $scope.course.Deleted = false;
    $scope.updateMode = false;
    $scope.addMode = true;
    $scope.addEnabled = true;
    $scope.showForm = false;

    $scope.updateCourse = function updateCourse(course) {
        $scope.updateMode = true;
        $scope.addMode = false;
        $scope.showForm = true;
        course.TrainingCenter = course.TrainingCenter._id;
        course.Specialization = course.Specialization._id;
        course.Grade = course.Grade._id;

        $scope.course = course;
    }

    $scope.addCourse = function addCourse() {
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.showForm = true;
        $scope.course = new mvCourse();

    }

    $scope.deleteCourse = function (course) {

        var array = $rootScope.jobSeeker.Courses;

        $rootScope.jobSeeker.Courses.forEach(function (element) {
            if (element._id == course._id) {
                var index = array.indexOf(element);
                array.splice(index, 1);
                //$rootScope.vacancy.Questions.remove(element);
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            //$location.path('/updateJobSeeker/Courses/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };

    $scope.add = function () {

        var course = {
            Title: $scope.course.Title,
            JobSeeker: $scope.course.JobSeeker,
            TrainingCenter: $scope.course.TrainingCenter,
            Specialization: $scope.course.Specialization,
            Grade: $scope.course.Grade,
            CourseYear: $scope.course.CourseYear
        };
        if ($rootScope.jobSeeker.Courses == undefined)
            $rootScope.jobSeeker.Courses = [];

        $rootScope.jobSeeker.Courses.push(course);

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Courses/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $scope.update = function () {

        var course = {
            Title: $scope.course.Title,
            JobSeeker: $scope.course.JobSeeker,
            TrainingCenter: $scope.course.TrainingCenter,
            Specialization: $scope.course.Specialization,
            Grade: $scope.course.Grade,
            CourseYear: $scope.course.CourseYear,
            _id: $scope.course._id
        };

        var array = $rootScope.jobSeeker.Courses;

        $rootScope.jobSeeker.Courses.forEach(function (element) {
            if (element._id == course._id) {
                var index = array.indexOf(element);
                array[index] = course;
            }

        });

        mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
            mvNotifier.notify('JobSeeker has been updated!');
            $scope.showForm = false;
            //$location.path('/updateJobSeeker/Courses/' + mvIdentity.currentJobSeeker._id);

        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
});