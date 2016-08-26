
angular.module('app').controller('mvUnivirstyNotConfirmedListCtrl', function ($scope, mvUnivirsty, $translate, mvIdentity, 
    mvUnivirstyRepo, mvNotifier, queryBulider, mvAddressRepo) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvUnivirsty.query({
            query: queryBulider.qb("!Confirmed&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.univirsties = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.selectUnivirsty = function(univirsty) {
        $("#message").text("");
        var flag = true;
        var id = univirsty._id;
        var ids = $("#selectedNotConfirmedUnivirstiesIds").val();
        var res = ids.split(",");
        if (res != null) {
            res.forEach(function(entry) {
                console.log(entry);
                if (id == entry) {
                    $("#message").text("This Univirsty Selected Before !");
                    flag = false;
                    return;
                }

            });
        }
        if (flag) {
            var text = $("#selectedNotConfirmedUnivirsties").text();
            if (text != '') {
                text += ' , ';
            }

            text += univirsty.Name[0].Text;
            $("#selectedNotConfirmedUnivirsties").text(text);


            if (ids != '') {
                ids += ',';
            }

            ids += id;
            $("#selectedNotConfirmedUnivirstiesIds").val(ids);
        }

    };
    
    $scope.saveUnivirsty = function () {
        $("#message").text("");
        var id = $("#hfUnivirstyId").val();
        console.log(id);
        if (id) {


            var ids = $("#selectedNotConfirmedUnivirstiesIds").val();
            if (ids != "") {
                var res = ids.split(",");
                if (res != null) {

                    res.forEach(function(entry) {
                        var ed = mvUnivirsty.get({ _id: entry }, (function () {
                            ed.Deleted = true;
                            ed.DeletedBy = mvIdentity.currentUser;
                            mvUnivirstyRepo.updateCurrentUnivirsty(ed).then(function () {
                                mvNotifier.notify('Univirsty has been deleted!');
                                mvAddressRepo.updateAllAddressesUnivirsty(id + "_" + entry);
                               
                            }, function (reason) {
                                
                                mvNotifier.error(reason);
                            });
                        }));
                        

                    });

                    $("#selectedNotConfirmedUnivirstiesIds").val("");
                    $("#selectedNotConfirmedUnivirsties").text("");
                    
                    $("#message").text("Univirsties Updated Succeffuly!");
                    $scope.getData();
                }
            } else {
                $("#message").text("No Citities Selected !");
            }
        } else {
            $("#message").text("No Confirmed Univirsty Selected !");
        }


    };

    $scope.getData();

    $(function () {
        $("#univirstyName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/univirstiesByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val() },
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            console.log(item.Name[0].Text);
                            return { label: item.Name[0].Text, value: item.Name[0].Text, id: item._id };
                        }));
                    },
                    error: function (error) {
                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        var p = $("#selectedUnivirsty");
                        var offset = p.offset();
                        //set
                        $("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        $('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        $('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $("#hfUnivirstyId").val(i.item.id);
                $('#hfUnivirstyId').trigger('change');
                var p = $("#selectedUnivirsty");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
});
