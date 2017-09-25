angular.module('app').factory('mvreferenceRelationshipRepo', function ($http, $q, mvreferenceRelationship,mvIdentity) {
    return {

        createreferenceRelationship: function (newreferenceRelationshipData) {

            var newreferenceRelationship = new mvreferenceRelationship(newreferenceRelationshipData);
            newreferenceRelationship.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving referenceRelationship");
            newreferenceRelationship.$save().then(function () {
                console.log("referenceRelationship Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentreferenceRelationship: function (newreferenceRelationshipData) {
            newreferenceRelationshipData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newreferenceRelationshipData);
            angular.extend(clone,newreferenceRelationshipData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});