angular.module('app').factory('mvCachedCategory', function (mvCategory) {
    var categoryList;
    return {
        query: function () {
            if (!categoryList) {
                categoryList = mvCategory.query();
            }
            return categoryList;
        }
    };
});