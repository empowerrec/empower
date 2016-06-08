angular.module('app').controller('mvCityNotConfirmedListCtrl', function ($scope, mvCity, $translate, mvIdentity, 
    mvCityRepo, mvNotifier, queryBulider, mvAddressRepo) {
    
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvCity.query({
            query: queryBulider.qb("!Confirmed&&!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.cities = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.selectCity = function(city) {
        $("#message").text("");
        var flag = true;
        var id = city._id;
        var ids = $("#selectedNotConfirmedCitiesIds").val();
        var res = ids.split(",");
        if (res != null) {
            res.forEach(function(entry) {
                console.log(entry);
                if (id == entry) {
                    $("#message").text("This City Selected Before !");
                    flag = false;
                    return;
                }

            });
        }
        if (flag) {
            var text = $("#selectedNotConfirmedCities").text();
            if (text != '') {
                text += ' , ';
            }

            text += city.Name[0].Text;
            $("#selectedNotConfirmedCities").text(text);


            if (ids != '') {
                ids += ',';
            }

            ids += id;
            $("#selectedNotConfirmedCitiesIds").val(ids);
        }

    };
    
    $scope.saveCity = function () {
        $("#message").text("");
        var id = $("#hfCityId").val();
        console.log(id);
        if (id) {


            var ids = $("#selectedNotConfirmedCitiesIds").val();
            if (ids != "") {
                var res = ids.split(",");
                if (res != null) {

                    res.forEach(function(entry) {
                        var ed = mvCity.get({ _id: entry }, (function () {
                            ed.Deleted = true;
                            ed.DeletedBy = mvIdentity.currentUser;
                            mvCityRepo.updateCurrentCity(ed).then(function () {
                                mvNotifier.notify('City has been deleted!');
                                mvAddressRepo.updateAllAddressesCity(id + "_" + entry);
                               
                            }, function (reason) {
                                
                                mvNotifier.error(reason);
                            });
                        }));
                        

                    });

                    $("#selectedNotConfirmedCitiesIds").val("");
                    $("#selectedNotConfirmedCities").text("");
                    
                    $("#message").text("Cities Updated Succeffuly!");
                    $scope.getData();
                }
            } else {
                $("#message").text("No Citities Selected !");
            }
        } else {
            $("#message").text("No Confirmed City Selected !");
        }


    };

    $scope.getData();

    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/citiesByName/" + request.term,
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
                        var p = $("#selectedCity");
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
                $("#hfCityId").val(i.item.id);
                $('#hfCityId').trigger('change');
                var p = $("#selectedCity");
                p.text(i.item.label);
            },
            minLength: 2
        });
    });
});
