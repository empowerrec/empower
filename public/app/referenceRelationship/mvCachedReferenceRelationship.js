angular.module('app').factory('mvCachedreferenceRelationship', function (mvCourse) {
    var referenceRelationshipList;
    return {
        query: function () {
            if (!referenceRelationshipList) {
                referenceRelationshipList = mvreferenceRelationship.query();
            }
            return referenceRelationshipList;
        }
    };
});