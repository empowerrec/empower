angular.module('app').controller('mvCourseListCtrl', function ($scope, mvCourse,$translate, mvIdentity , queryBulider , mvJobSeeker , $routeParams , mvCourseRepo , mvNotifier) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.courses = mvCourse.query({ jobSeeker: mvIdentity.currentJobSeeker });
    //$scope.currentLang = $translate.use();
    $scope.sortOptions = [{value: '_id', text: 'Sort by _id'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getName = function(list){
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == $scope.currentLang) {
                return list[i].Text;
            }
        }
    };
    
    var id = $routeParams.id;
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 3
    };
    
    $scope.getData = function () {
        if (id) {
            mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
                mvCourse.query({
                    query: queryBulider.qb("JobSeeker=='" + mvIdentity.currentJobSeeker._id + "'&&!Deleted"),
                    jobSeeker: mvIdentity.currentJobSeeker._id,
                    currentPage: $scope.paging.currentPage,
                    pageSize: $scope.paging.pageSize
                }, (function (res) {
                    $scope.courses = res[0].collection;
                    $scope.allDataCount = res[0].allDataCount;
                }));
            }));
        }
    };
    
    $scope.deleteCourse = function (course) {
        var cr = mvCourse.get({ _id: course._id }, (function () {
            cr.Deleted = true;
            cr.DeletedBy = mvIdentity.currentUser;
            mvCourseRepo.updateCurrentCourse(cr).then(function () {
                mvNotifier.notify('Course has been deleted!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
    $scope.getData();
    $scope.getLang = function(){
        return $translate.use();
    };
});
