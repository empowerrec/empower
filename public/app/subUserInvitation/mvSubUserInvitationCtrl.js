angular.module('app').controller('mvSubUserInvitationCtrl', function ($scope, $location, mvNotifier, mvUserFeatureRepo, mvSubUserInvitationRepo, mvSubUserInvitationDetail, mvUserFeature, mvSubUserInvitationDetailRepo, mvSubUserInvitation, mvUserPackage, $routeParams, mvPackageFeature, mvFeature, mvPackage, queryBulider, $translate, mvIdentity) {
    var id = $routeParams.id;
    var curUser = mvIdentity.currentUser._id;
    //$scope.pId = $routeParams.pId;
    //var routeParamspId = '58f6342423b01eec147214e5'
    var routeParamspId = undefined;
    $scope.packageFeaturesMax = undefined;
    //$scope.pId = $routeParams.pId;
    $scope.pId = routeParamspId;
    $scope.maxVal = 0;
    $scope.nameText = "";
    $scope.addEnabled = false;
    $scope.UserFeature = undefined;
    $scope.subInvitationDetail = undefined;
    $scope.packageFeaturesss = [];
    $scope.UserFeature2 = undefined;
    $scope.currentLang = $translate.use();
    if (id) {
        $scope.subUserInvitation = mvSubUserInvitation.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
        }));


    }

    else {
        $scope.subUserInvitation = new mvSubUserInvitation();
        $scope.subUserInvitation.Status = "O";
        $scope.subUserInvitation.Employer = mvIdentity.currentEmployer;;

        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        $scope.subUserInvitation.Deleted = false;


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
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 10,
        pageSize: 10
    };
    //'57f37e81d476e7240ef20e78'
    $scope.getData = function () {

        if (curUser) {
            var datetime = new Date();
            console.log(datetime);
            $scope.UserPackage = mvUserPackage.query({
                query: queryBulider.qb("User=='" + curUser + "'&&!Deleted&&" + "ExpiryDate>=" + Date.now()),
                currentPage: 1,
                pageSize: 10
            }, (function (res) {

                if (res[0].allDataCount > 0) {

                    $scope.UserPackage2 = res[0].collection;
                    $scope.allDataCount2 = res[0].allDataCount;
                    routeParamspId = res[0].collection[0].Package._id;

                    $scope.pId = routeParamspId;

                    //////
                    var packageFeatures = mvPackageFeature.query({
                        query: queryBulider.qb("Package=='" + routeParamspId + "'&&!Deleted"),
                        currentPage: $scope.paging.currentPage,
                        pageSize: $scope.paging.pageSize
                    }, (function () {
                        var package = mvPackage.get({ _id: $scope.pId }, (function () {

                            mvFeature.query({
                                query: queryBulider.qb("Type=='" + package.Type + "'&&!Deleted"),
                                currentPage: $scope.paging.currentPage,
                                pageSize: $scope.paging.pageSize
                            }, (function (features) {
                                features[0].collection.forEach(function (feature) {
                                    if (typeof $scope.searchAtJson(packageFeatures[0].collection, "Feature", feature._id, "_id") == "undefined") {
                                        var pf = new mvPackageFeature();
                                        pf.Package = $scope.pId;
                                        pf.Feature = feature;
                                        pf.Points = 0;
                                        pf.Deleted = false;
                                        //$scope.packageFeaturesss = $scope.packageFeatures
                                        $scope.packageFeaturesss = angular.copy(packageFeatures[0].collection);
                                        //angular.extend(clone,);
                                        //$scope.packageFeaturesss = angular.clo .extend(true, {}, packageFeatures[0].collection);
                                        packageFeatures[0].collection.push(pf);
                                    }
                                });
                                $scope.packageFeatures = packageFeatures[0].collection;

                                $scope.allDataCount = packageFeatures[0].allDataCount;
                                //$scope.calculatePoints();



                                $scope.UserFeature = mvUserFeature.query({
                                    //query: queryBulider.qb("User=='" + curUser + "'&&!Deleted&&" + "Package=='" + $scope.packageFeatures[infoIndex].Package + "'&&Feature=='" +
                                    //    $scope.packageFeatures[infoIndex].Feature._id + "'&&" + "ExpiryDate>=" + Date.now()),
                                    query: queryBulider.qb("User=='" + curUser + "'&&!Deleted&&" + "ExpiryDate>=" + Date.now()),
                                    currentPage: $scope.paging.currentPage,
                                    pageSize: $scope.paging.pageSize

                                }, (function (userFeatures) {

                                    userFeatures[0].collection.forEach(function (userfFeatures) {
                                        var i = userfFeatures;
                                        var ii = $scope.packageFeatures;

                                        $.each($scope.packageFeatures, function (i, v) {
                                            var flag = false;
                                            if (v.Feature._id == userfFeatures.Feature._id && v.Package == userfFeatures.Package._id) {
                                                //alert(v);
                                                v.Points = v.Points - userfFeatures.DistrbuitedForSubUsers - userfFeatures.UsedFromPoints
                                                //$scope.maxVal = v.Points;
                                                flag = true;
                                                //alert(v.Points);

                                            }
                                            if (flag == true)
                                                return false;
                                        });
                                    });
                                    $scope.packageFeaturesMax = jQuery.extend(true, {}, $scope.packageFeatures);

                                    $scope.UserFeature2 = userFeatures[0].collection



                                    //if (infoIndex == $scope.packageFeatures.length) infoIndex = 0;
                                    //$scope.userFeatures = userFeatures[0].collection;
                                    //$scope.packageFeatures[infoIndex].Points = $scope.packageFeatures[infoIndex].Points - $scope.userFeatures[0].DistrbuitedForSubUsers - $scope.userFeatures[0].UsedFromPoints
                                    //$scope.allDataCount = userFeatures[0].allDataCount;
                                    //infoIndex++;

                                }));



                            }))


                        }));
                    }));
                }

            }));


        };
    };

    $scope.languages = [{ value: 'en', text: 'English' },
        { value: 'ar', text: 'عربى' },
        { value: 'fr', text: 'French' }];


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
    $scope.checkData = function (packageFeaturess) {
        //if (packageFeatures.Points > $scope.maxVal)
        //    postMessage('error max valueee');
        $.each($scope.packageFeaturesMax, function (i, v) {
            var flag = false;
            if (v.Feature._id == packageFeaturess.Feature._id && v.Package == packageFeaturess.Package) {
                flag = true;

                if (packageFeaturess.Points > v.Points)
                    packageFeaturess.Points = v.Points;
                //alert("v");
                //v.Points = v.Points - userfFeatures.DistrbuitedForSubUsers - userfFeatures.UsedFromPoints
                //$scope.maxVal = v.Points;

                //alert(v.Points);

            }
            if (flag == true)
                return false;
        });

    }
    $scope.EditData = function (SubUserInvitationObj) {

        //var dfd = $q.defer();
        $scope.subInvitationDetail.SubUserInvitation = SubUserInvitationObj;
        $scope.subInvitationDetail.Points = $scope.packageFeatures[0].Points
        $scope.subInvitationDetail.Feature = $scope.packageFeatures[0].Feature
        $scope.subInvitationDetail.Deleted = false;
        mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {
            mvNotifier.notify('New SubUserInvitationDetails Added!');

            for (infoIndex = 1; infoIndex < $scope.packageFeatures.length; infoIndex++) {
                //$scope.subInvitationDetail[infoIndex].InvitationID += '664644645458yt';
                //$scope.subInvitationDetail[infoIndex].FeatureID += $scope.packageFeatures[infoIndex].Feature._id
                //$scope.subInvitationDetail[infoIndex].Points += $scope.packageFeatures[infoIndex].Points;
                //$scope.subInvitationDetail.push('664644645458yt',)  ;
                //$scope.subInvitationDetail.push({ Points: $scope.packageFeatures[infoIndex].Points, Feature: $scope.packageFeatures[infoIndex].Feature,  Deleted:false })
                //mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {
                //    mvNotifier.notify('New SubUserInvitationDetails Added!');
                //}, function (reason) {
                //    mvNotifier.error(reason);
                //});
                //$scope.subInvitationDetail[infoIndex].Points += ;


                $scope.subInvitationDetail.SubUserInvitation = SubUserInvitationObj;
                $scope.subInvitationDetail.Points = $scope.packageFeatures[infoIndex].Points
                $scope.subInvitationDetail.Feature = $scope.packageFeatures[infoIndex].Feature
                $scope.subInvitationDetail.Deleted = false;
                mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {



                    //mvNotifier.notify('New SubUserInvitationDetails Added!');

                }, function (reason) {
                    mvNotifier.error(reason);
                });

            }
            //$scope.addEnabled = false;
            //$location.path('/subUserInvitations/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
        //return dfd.promise;

    }
    $scope.add = function () {
        if ($scope.subUserInvitationForm.$valid && $scope.addEnabled) {
            mvSubUserInvitationRepo.createSubUserInvitation($scope.subUserInvitation).then(function (SubUserInvitationObj) {


                //mvUserFeatureRepo.updateCurrentUserFeature($scope.UserFeature2).then(function () {
                //    mvNotifier.notify('UserFeature has been updated!');
                //    $location.path('/userFeatures/' + uId);
                //}, function (reason) {
                //    mvNotifier.error(reason);
                //});
                //$scope.UserFeature3 = mvUserFeature.get({ _id: '596778439d67d220184658b6' }, (function () {
                //    $scope.UserFeature3.DistrbuitedForSubUsers += 15;
                //    mvUserFeatureRepo.updateCurrentUserFeature($scope.UserFeature3);

                //}));



                //put save detail here
                var temp1 = $scope.packageFeatures;
                var temp2 = $scope.subInvitationDetail
                $scope.subInvitationDetail = new mvSubUserInvitationDetail();
                var Invitation_id = SubUserInvitationObj._id;
                $scope.EditData(Invitation_id);
                mvNotifier.notify('New SubUserInvitation Added!');
                $scope.subInvitationDetail = new mvSubUserInvitationDetail();


                //$scope.subInvitationDetail.Deleted = false;
                //$scope.subInvitationDetail.Employer = mvIdentity.currentEmployer;;
                //mvSubUserInvitationDetailRepo.createSubUserInvitationDetail($scope.subInvitationDetail).then(function (res) {
                //    mvNotifier.notify('New SubUserInvitationDetails Added!');
                //}, function (reason) {
                //    mvNotifier.error(reason);
                //});
                var mail = SubUserInvitationObj.Email;
                //pass distrbuted
                for (infoIndex = 0; infoIndex < $scope.packageFeaturesss.length; infoIndex++) {
                    $.each($scope.UserFeature[0].collection, function (i, v) {
                        var flag = false;
                        if (v.Feature._id == $scope.packageFeaturesss[infoIndex].Feature._id && v.Package._id == $scope.packageFeaturesss[infoIndex].Package) {
                            //v.DistrbuitedForSubUsers += packFeature.Points
                            //var gg = 596778439d67d220184658b6;

                            $scope.UserFeature3 = mvUserFeature.get({ _id: v._id }
                                //$scope.UserFeature3 = mvUserFeature.query({                                           
                                //    query: queryBulider.qb("_id=='" + v._id +"'"),
                                //     currentPage: $scope.paging.currentPage,
                                //     pageSize: $scope.paging.pageSize

                                , (function (UserFeature3) {
                                    //$scope.packageFeaturesss.forEach(function (packFeature) {
                                    //    if (UserFeature3.Feature == packFeature.Feature._id && UserFeature3.Package == packFeature.Package) {
                                    //        UserFeature3.DistrbuitedForSubUsers += packFeature.Points;
                                    //        mvUserFeatureRepo.updateCurrentUserFeature(UserFeature3);
                                    //    }

                                        $.each($scope.packageFeatures, function (i, v2) {
                                            var flag1 = false;
                                            if (UserFeature3.Feature == v2.Feature._id && UserFeature3.Package == v2.Package) {
                                                UserFeature3.DistrbuitedForSubUsers += v2.Points;
                                                mvUserFeatureRepo.updateCurrentUserFeature(UserFeature3);
                                                flag1 = true;
                                            }
                                            if (flag1 == true)
                                                return false;
                                        });


                                    //});


                                }));
                            flag = true;
                            //alert(v.Points);
                        }
                        if (flag == true)
                            return false;
                    })
                }



                $scope.addEnabled = false;
                console.log('Send Message');


                $location.path('/subUserInvitations/');

            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };

    $scope.loop = function () {

        var listItems = $("#names li");
        listItems.each(function (idx, li) {
            $scope.lang = $(li).attr('id');
            var input = $(li).find("#NameText2");
            $scope.nameText = input.val();
            $scope.saveName();

        });
    };

    $scope.saveName = function () {

        var old = false;
        if ($scope.subUserInvitation.Status) {
            for (var i = 0; i < $scope.subUserInvitation.Status.length; i++) {
                var obj = $scope.subUserInvitation.Status[i];

                if ($scope.subUserInvitation.Status[i].Lang == $scope.lang) {
                    $scope.subUserInvitation.Status[i].Text = $scope.nameText;
                    old = true;
                }

            }
        }

        if (!old) {
            if (!$scope.subUserInvitation.Status) {
                $scope.subUserInvitation.Status = [];
            }
            var name = { "Lang": $scope.lang, "Text": $scope.nameText };
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
    $scope.getData();
    $scope.searchAtJson = function (obj, searchField, searchVal, returnField) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][searchField]._id == searchVal) {
                return obj[i][returnField];
            }
        }
    };
});