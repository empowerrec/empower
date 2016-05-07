angular.module('app').controller('mvCourseCtrl', function ($scope,  mvNotifier, mvCourseRepo, mvCourse,$routeParams,$translate, mvIdentity, $location) {
    var id = $routeParams.id;
    $scope.courseNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.course = mvCourse.get({_id:id },(function(){
            //$scope.course.PeriodFrom = new Date($scope.course.PeriodFrom);
            //$scope.course.PeriodTo = new Date($scope.course.PeriodTo);
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.course = new mvCourse();
        //console.log(mvIdentity.currentJobSeeker._id);
        $scope.course.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.course.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;


    }

    $scope.getName = function(list , lang){
        var selectedLang ;
        if(lang)
        selectedLang = lang;
        else
        selectedLang = $scope.currentLang;

        if(list)
        {
        for(var i = 0; i < list.length; i++) {

            if(list[i].Lang == selectedLang) {
                return list[i].Text;
            }
        }
        }
    };


    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'},
        {value: 'fr', text: 'French'}];

    $scope.lang = $scope.languages[0].value;



    //$scope.courseTypes = [{value: 'D', text: 'Direct Course'},
    //    {value: 'S', text: 'Staffing Firm'}];
    //$scope.course.CourseType = $scope.courseTypes[0].value;

    $scope.update = function () {
        $scope.loop();
        mvCourseRepo.updateCurrentCourse($scope.course).then(function () {
            mvNotifier.notify('Course has been updated!');
            $location.path('/updateJobSeeker/Courses/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    //$scope.saveCourseName = function () {

    //    var old = false;
    //    if($scope.course.CourseName) {
    //        for (var i = 0; i < $scope.course.CourseName.length; i++) {
    //            var obj = $scope.course.CourseName[i];

    //            if ($scope.course.CourseName[i].Lang == $scope.lang) {
    //                $scope.course.CourseName[i].Text = $scope.courseNameText;
    //                old = true;
    //            }

    //        }
    //    }

    //    if(!old) {
    //        if(!$scope.course.CourseName)
    //        {
    //            $scope.course.CourseName = [];
    //        }
    //        var courseName = {"Lang": $scope.lang, "Text": $scope.courseNameText};
    //        $scope.course.CourseName.push(courseName);
    //    }
    //    $scope.courseNameText = "";
    //    $scope.lang = "";

    //};

    //$scope.updateCourseName = function (course) {
    //  $scope.lang = course.Lang;
    //  $scope.courseNameText = course.Text;
    //};

    //$scope.deleteCourseName = function (course) {

    //    for(var i = 0; i < $scope.course.CourseName.length; i++) {
    //        var obj = $scope.course.CourseName[i];
    //        console.log("Old" + obj.Lang);
    //        console.log("New " + course.Lang);
    //        if(course.Lang == obj.Lang) {
    //            $scope.course.CourseName.splice(i, 1);
    //            i--;
    //        }
    //    }
    //    /*
    //    var courseNames = $scope.course.CourseName;
    //    console.log(courseNames);
    //    courseNames.delete(course);
    //    $scope.course.CourseName = courseNames;
    //    */


    //};

    $scope.add = function(){
        $scope.loop();
        mvCourseRepo.createCourse($scope.course).then(function () {
            mvNotifier.notify('New Course Added!');
            $scope.addEnabled = false;
            $location.path('/updateJobSeeker/Courses/'+ mvIdentity.currentJobSeeker._id);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#courseNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#CourseNameText2");
            $scope.courseNameText = input.val();
            $scope.saveCourseName();

        });
    };
});