angular.module('app').factory('mvFacultyRepo', function ($http, $q, mvFaculty,mvIdentity) {
    return {

        createFaculty: function (newFacultyData) {

            var newFaculty = new mvFaculty(newFacultyData);
            newFaculty.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Faculty");
            newFaculty.$save().then(function () {
                console.log("Faculty Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentFaculty: function (newFacultyData) {
            newFacultyData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newFacultyData);
            angular.extend(clone,newFacultyData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});