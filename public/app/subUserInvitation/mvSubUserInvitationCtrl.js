angular.module('app').controller('mvSubUserInvitationCtrl', function ($scope, $location, mvNotifier, mvSubUserInvitationRepo, mvSubUserInvitation, $routeParams, $translate, mvIdentity) {
    var id = $routeParams.id;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.currentLang = $translate.use();
    if(id)
    {
        $scope.subUserInvitation = mvSubUserInvitation.get({_id:id },(function(){
            $scope.updateMode = true;
            $scope.addMode = false;
    }));


    }

    else
    {
        $scope.subUserInvitation = new mvSubUserInvitation();
        $scope.subUserInvitation.Status = "O";
        $scope.subUserInvitation.Employer = mvIdentity.currentEmployer;;
        
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.subUserInvitation.Deleted = false;


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


    $scope.update = function () {
        if ($scope.subUserInvitationForm.$valid) {

           
            mvSubUserInvitationRepo.updateCurrentSubUserInvitation($scope.subUserInvitation).then(function () {
                mvNotifier.notify('SubUserInvitation has been updated!');
                $location.path('/subUserInvitations/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }

    };

    $scope.add = function () {
        if ($scope.subUserInvitationForm.$valid && $scope.addEnabled) {

           
            mvSubUserInvitationRepo.createSubUserInvitation($scope.subUserInvitation).then(function () {
                mvNotifier.notify('New SubUserInvitation Added!');
                $scope.addEnabled = false;
                $location.path('/subUserInvitations/');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.loop = function(){

        var listItems = $("#names li");
        listItems.each(function(idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();

        });
    };

   $scope.saveName = function () {

        var old = false;
        if($scope.subUserInvitation.Status) {
            for (var i = 0; i < $scope.subUserInvitation.Status.length; i++) {
                var obj = $scope.subUserInvitation.Status[i];

                if ($scope.subUserInvitation.Status[i].Lang == $scope.lang) {
                    $scope.subUserInvitation.Status[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if(!old) {
            if(!$scope.subUserInvitation.Status)
            {
                $scope.subUserInvitation.Status = [];
            }
            var name = {"Lang": $scope.lang, "Text": $scope.nameText};
            $scope.subUserInvitation.Status.push(name);
        }
        $scope.nameText = "";
        $scope.lang = "";

    };
     /*
    $scope.updateName = function (subUserInvitation) {
      $scope.lang = subUserInvitation.Lang;
      $scope.nameText = subUserInvitation.Text;
    };

    $scope.deleteName = function (subUserInvitation) {

        for(var i = 0; i < $scope.subUserInvitation.Status.length; i++) {
            var obj = $scope.subUserInvitation.Status[i];
            console.log("Old" + obj.Lang);
            console.log("New " + subUserInvitation.Lang);
            if(subUserInvitation.Lang == obj.Lang) {
                $scope.subUserInvitation.Status.splice(i, 1);
                i--;
            }
        }
        /*
        var names = $scope.subUserInvitation.Status;
        console.log(names);
        names.delete(subUserInvitation);
        $scope.subUserInvitation.Status = names;



    };*/


});