angular.module('app').controller('mvEmployerCtrl', function ($scope, $http, $q, $window, mvNotifier, mvEmployerRepo, mvEmployer, $routeParams, $translate, $location, Upload, $timeout) {
    var id = $routeParams.id;
    $scope.employerNameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.employer = mvEmployer.get({ _id: id }, (function () {
            if ($scope.employer.EmployerName) {
                for (var i = 0; i < $scope.employer.EmployerName.length; i++) {

                    if ($scope.employer.EmployerName[i].Lang == $scope.currentLang) {
                        $scope.employerNameText = $scope.employer.EmployerName[i].Text;
                        $scope.lang = $scope.employer.EmployerName[i].Lang;
                    }
                }
            }

            $scope.photoFile = $scope.employer.Photo;



            $.ajax({
                type: "GET",
                url: '/upload/' + $scope.employer.Photo,
                dataType: "image/gif",
                async: false,
                success: function (img) {
                    $scope.photoFile = img;
                },
                error: function (error, txtStatus) {
                    console.log(txtStatus);
                    console.log('error');
                }
            });


            $scope.photoName = $scope.employer.Photo; 
            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.employer = new mvEmployer();
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.employer.Deleted = false;
    }

    $scope.getName = function (list, lang) {
        var selectedLang;
        if (lang)
            selectedLang = lang;
        else
            selectedLang = $scope.currentLang;

        if (list) {
            for (var i = 0; i < list.length; i++) {

                if (list[i].Lang == selectedLang) {
                    return list[i].Text;
                }
            }
        }
    };

    $scope.upload = function (file) {

        var dfd = $q.defer();

        Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                $scope.photoName = resp.data.file_name;;
                dfd.resolve();
            } else {
                mvNotifier.error('an error occured at upload photo');
                dfd.reject('an error occured at upload photo');

            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });

        return dfd.promise;

    };

    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' }];

    $scope.lang = $scope.languages[0].value;

    $scope.employerTypes = [{ value: 'D', text: 'Direct Employer' }, { value: 'S', text: 'Staffing Firm' }];

    $scope.employer.EmployerType = $scope.employerTypes[0].value;

    $scope.add = function () {

        if ($scope.employerForm.$valid && $scope.addEnabled) {

            $scope.loop();
            $scope.upload($scope.photoFile).then(function () {
                $scope.employer.Photo = $scope.photoName;
                mvEmployerRepo.createEmployer($scope.employer).then(function () {
                    mvNotifier.notify('New Employer Added!');
                    $scope.addEnabled = false;
                    $location.path('/employers');
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            });

        }

    };

    $scope.update = function () {

        if ($scope.employerForm.$valid) {

            $scope.loop();
            $scope.upload($scope.photoFile).then(function () {
                if ($scope.employer.Photo != $scope.photoName)
                {
                    $scope.employer.Photo = $scope.photoName;
                }

                mvEmployerRepo.updateCurrentEmployer($scope.employer).then(function () {
                    mvNotifier.notify('Employer has been updated!');
                    //$location.path('/employers');
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            });

        }
    };

    $scope.saveEmployerName = function () {

        var old = false;
        if ($scope.employer.EmployerName) {
            for (var i = 0; i < $scope.employer.EmployerName.length; i++) {
                var obj = $scope.employer.EmployerName[i];

                if ($scope.employer.EmployerName[i].Lang == $scope.lang) {
                    $scope.employer.EmployerName[i].Text = $scope.employerNameText;
                    old = true;
                }

            }
        }

        if (!old) {
            if (!$scope.employer.EmployerName) {
                $scope.employer.EmployerName = [];
            }
            var employerName = { "Lang": $scope.lang, "Text": $scope.employerNameText };
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

        for (var i = 0; i < $scope.employer.EmployerName.length; i++) {
            var obj = $scope.employer.EmployerName[i];
            console.log("Old" + obj.Lang);
            console.log("New " + employer.Lang);
            if (employer.Lang == obj.Lang) {
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

    $scope.loop = function () {

        var listItems = $("#employerNames li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#EmployerNameText2");
            $scope.employerNameText = input.val();
            $scope.saveEmployerName();

        });
    };
});