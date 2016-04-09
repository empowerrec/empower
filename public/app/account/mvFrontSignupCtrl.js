angular.module('app').controller('mvFrontSignupCtrl', function ($scope, $location, mvUser, mvNotifier, mvAuth, mvIdentity, mvEmployer, mvEmployerRepo) {

    $scope.usertype = "J";

    $scope.signup = function () {
        if ($scope.frontSignupForm.$valid) {
            //form is valid

            var name = "";
            if($scope.usertype == 'J'){
                name = $scope.firstname;
            }
            else{
                name = $scope.employername;
            }

            var newUserData = {
                UserName: $scope.email,
                Password: $scope.password,
                FirstName: name ,
                LastName: $scope.lastname,
                UserType: $scope.usertype
            };

            mvAuth.createUser(newUserData)
                .then(function () {
                    if ($scope.usertype == 'E') {
                        var newEmployerData = {
                            //EmployerName: [{'en',$scope.firstname}],
                            User: mvIdentity.currentUser,
                            CreatedBy: mvIdentity.currentUser
                        };
                        mvEmployerRepo.createEmployerAfterCreatingUser(newEmployerData);
                    } else if ($scope.usertype == 'J') {

                    }
                })
                .then(function () {
                    mvNotifier.notify('User account created!');
                    var type = $scope.usertype;

                    //clear form fields
                    $scope.email = '';
                    $scope.password = '';
                    $scope.firstname = '';
                    $scope.lastname = '';
                    $scope.usertype = '';

                    if (type == 'E') {
                        $location.path('/employers');
                    } else if (type == 'J') {
                        $location.path('/jobseekers');
                    }
                }, function (reason) {
                    mvNotifier.error(reason);
            });
        }
    };
});