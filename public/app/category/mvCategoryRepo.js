angular.module('app').factory('mvCategoryRepo', function ($http, $q, mvCategory,mvIdentity) {
    return {

        createCategory: function (newCategoryData) {

            var newCategory = new mvCategory(newCategoryData);
            newCategory.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Category");
            newCategory.$save().then(function () {
                console.log("Category Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentCategory: function (newCategoryData) {
            newCategoryData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newCategoryData);
            angular.extend(clone,newCategoryData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});