angular.module('app').factory('mvCachedInnerPage', function (mvInnperPage) {
    var innerPageList;
    return {
        query: function () {
            if (!innerPageList) {
                innerPageList = mvInnperPage.query();
            }
            return innerPageList;
        }
    };
});