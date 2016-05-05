angular.module('app').factory('mvCourseRepo', function ($http, $q, mvCourse,mvIdentity) {
    return {

        createCourse: function (newCourseData) {
            var newCourse = new mvCourse(newCourseData);
            newCourse.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Course");
            newCourse.$save().then(function () {
                console.log("Course Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createCourseAfterCreatingUser: function (newCourseData) {
            var newCourse = new mvCourse(newCourseData);
            var dfd = $q.defer();
            console.log("Saving Course");
            newCourse.$save().then(function (course) {
                console.log("Course Saved");
                mvIdentity.currentCourse = course;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCourse: function (newCourseData) {
            newCourseData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCourseData);
            angular.extend(clone,newCourseData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});