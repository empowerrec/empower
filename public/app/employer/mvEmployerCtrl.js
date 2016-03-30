angular.module('app').controller('mvEmployerCtrl', function ($scope,  mvNotifier, mvEmployerRepo,mvEmployer,$routeParams) {
    var id = $routeParams.id;
    if(id)
    {
        $scope.employer = mvEmployer.get({_id:id });
        $scope.updateMode = true;
        $scope.addMode = false;
    }

    else
    {
        $scope.employer = new mvEmployer();
        $scope.updateMode = false;
        $scope.addMode = true;
    }
    $scope.languages = [{value: 'en', text: 'English'},
        {value: 'ar', text: 'عربى'}];
    $scope.lang = $scope.languages[0].value;
    $scope.employerNameText = "";

    $scope.employerTypes = [{value: 'D', text: 'Direct Employer'},
        {value: 'S', text: 'Staffing Firm'}];
    $scope.employer.EmployerType = $scope.employerTypes[0].value;

    $scope.update = function () {

        mvEmployerRepo.updateCurrentEmployer($scope.employer).then(function () {
            mvNotifier.notify('Employer has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });


    };

    $scope.saveEmployerName = function () {
        var old = false;
        for(var i = 0; i < $scope.employer.EmployerName.length; i++) {
            var obj = $scope.employer.EmployerName[i];

            if($scope.employer.EmployerName[i].Lang == $scope.lang) {
                $scope.employer.EmployerName[i].Text= $scope.employerNameText;
                old = true;
            }

        }
        if(!old) {
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
        mvEmployerRepo.createEmployer($scope.employer).then(function () {
            mvNotifier.notify('New Employer Added!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});