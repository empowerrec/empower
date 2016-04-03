angular.module('app').controller('mvEmployerCtrl', function ($scope,  mvNotifier, mvEmployerRepo,mvEmployer,$routeParams,$translate) {
    var id = $routeParams.id;
    $scope.employerNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.employer = mvEmployer.get({_id:id },(function(){
        if($scope.employer.EmployerName) {
            for (var i = 0; i < $scope.employer.EmployerName.length; i++) {

                if ($scope.employer.EmployerName[i].Lang == $scope.currentLang) {
                    $scope.employerNameText = $scope.employer.EmployerName[i].Text;
                    $scope.lang = $scope.employer.EmployerName[i].Lang;
                }
            }
        }
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.employer = new mvEmployer();
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
        {value: 'ar', text: 'عربى'}];
    $scope.lang = $scope.languages[0].value;



    $scope.employerTypes = [{value: 'D', text: 'Direct Employer'},
        {value: 'S', text: 'Staffing Firm'}];
    $scope.employer.EmployerType = $scope.employerTypes[0].value;

    $scope.update = function () {
        $scope.loop();
        mvEmployerRepo.updateCurrentEmployer($scope.employer).then(function () {
            mvNotifier.notify('Employer has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.saveEmployerName = function () {

        var old = false;
        if($scope.employer.EmployerName) {
            for (var i = 0; i < $scope.employer.EmployerName.length; i++) {
                var obj = $scope.employer.EmployerName[i];

                if ($scope.employer.EmployerName[i].Lang == $scope.lang) {
                    $scope.employer.EmployerName[i].Text = $scope.employerNameText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.employer.EmployerName)
            {
                $scope.employer.EmployerName = [];
            }
            var employerName = {"Lang": $scope.lang, "Text": $scope.employerNameText};
            $scope.employer.EmployerName.push(employerName);
        }
        $scope.employerNameText = "";
        $scope.lang = "";

    };

    $scope.updateEmployerName = function (employer) {
      $scope.lang = employer.Lang;
      $scope.employerNameText = employer.Text;
    };

    $scope.deleteEmployerName = function (employer) {

        for(var i = 0; i < $scope.employer.EmployerName.length; i++) {
            var obj = $scope.employer.EmployerName[i];
            console.log("Old" + obj.Lang);
            console.log("New " + employer.Lang);
            if(employer.Lang == obj.Lang) {
                $scope.employer.EmployerName.splice(i, 1);
                i--;
            }
        }
        /*
        var employerNames = $scope.employer.EmployerName;
        console.log(employerNames);
        employerNames.delete(employer);
        $scope.employer.EmployerName = employerNames;
        */


    };

    $scope.add = function(){
        $scope.loop();
        mvEmployerRepo.createEmployer($scope.employer).then(function () {
            mvNotifier.notify('New Employer Added!');
            $scope.addEnabled = false;
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.loop = function(){

        var listItems = $("#employerNames li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#EmployerNameText2");
            $scope.employerNameText = input.val();
            $scope.saveEmployerName();

        });
    };
});