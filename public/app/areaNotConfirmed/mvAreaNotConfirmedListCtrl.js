angular.module('app').controller('mvAreaNotConfirmedListCtrl', function ($scope, mvArea, $translate, mvIdentity, 
    mvAreaRepo, mvNotifier, queryBulider, mvAddressRepo) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvArea.query({
            query: queryBulider.qb("!Confirmed&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.areas = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.selectArea = function(area) {
        $("#message").text("");
        var flag = true;
        var id = area._id;
        var ids = $("#selectedNotConfirmedAreasIds").val();
        var res = ids.split(",");
        if (res != null) {
            res.forEach(function(entry) {
                console.log(entry);
                if (id == entry) {
                    $("#message").text("This Area Selected Before !");
                    flag = false;
                    return;
                }

            });
        }
        if (flag) {
            var text = $("#selectedNotConfirmedAreas").text();
            if (text != '') {
                text += ' , ';
            }

            text += area.Name[0].Text;
            $("#selectedNotConfirmedAreas").text(text);


            if (ids != '') {
                ids += ',';
            }

            ids += id;
            $("#selectedNotConfirmedAreasIds").val(ids);
        }

    };
    
    $scope.saveArea = function () {
        $("#message").text("");
        var id = $("#hfAreaId").val();
        console.log(id);
        if (id) {


            var ids = $("#selectedNotConfirmedAreasIds").val();
            if (ids != "") {
                var res = ids.split(",");
                if (res != null) {

                    res.forEach(function(entry) {
                        var ed = mvArea.get({ _id: entry }, (function () {
                            ed.Deleted = true;
                            ed.DeletedBy = mvIdentity.currentUser;
                            mvAreaRepo.updateCurrentArea(ed).then(function () {
                                mvNotifier.notify('Area has been deleted!');
                                mvAddressRepo.updateAllAddressesArea(id + "_" + entry);
                               
                            }, function (reason) {
                                
                                mvNotifier.error(reason);
                            });
                        }));
                        

                    });

                    $("#selectedNotConfirmedAreasIds").val("");
                    $("#selectedNotConfirmedAreas").text("");
                    
                    $("#message").text("Areas Updated Succeffuly!");
                    $scope.getData();
                }
            } else {
                $("#message").text("No Citities Selected !");
            }
        } else {
            $("#message").text("No Confirmed Area Selected !");
        }


    };

    $scope.getData();

    $(function () {
        $("#areaName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/areasByName/" + request.term,
                    data: { prefix: request.term, currentLang: $("#currentLang").val(),Confirmed : true },
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
                        var p = $("#selectedArea");
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
                $("#hfAreaId").val(i.item.id);
                $('#hfAreaId').trigger('change');
                var p = $("#selectedArea");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
});
