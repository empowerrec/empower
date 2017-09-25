angular.module('app').controller('mvApplicantListCtrl', function ($scope, $translate, mvApplicant, $routeParams,
    mvApplicantRepo, queryBulider, mvNotifier, mvIdentity) {

    //to add new search in accordion 
    //1- add new accordion header and content at html  
    //   change name of the field ,in these blocks I use 'Industry' 
    //2- add list  like one at code #1    
    //3- add block like one at code #2
    //4- add block like one at code #3 
    //5- change name of the field in these blocks I use 'Industry' 
    //6- go to applicants controller at server to change at function getApplicantsSearchResult

    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.vacancyId;

    var SelectedBirthDates = [];
    var BirthDatesHeaderFlag = false;

    if (mvIdentity.currentJobSeeker)
        var jobSeekerId = null;
    if (mvIdentity.currentJobSeeker)
        jobSeekerId = mvIdentity.currentJobSeeker._id;
    debugger;
    if (!jobSeekerId)
        jobSeekerId = 0;

    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };

    $scope.getData = function () {

        var qr = '';

        // start code #2
        if (SelectedBirthDates.length > 0) {
            var qrBirthDate = '';

            if (SelectedBirthDates[0].flag !== true) {
                for (var y = 0; y < SelectedBirthDates.length; y++) {
                    if (SelectedBirthDates[y].flag) {
                        qrBirthDate += "BirthDate=='" + SelectedBirthDates[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedBirthDates.length; y++) {
                    qrBirthDate += "BirthDate=='" + SelectedBirthDates[y].id + "'||";
                }
            }

            if (qrBirthDate.length > 0) {
                qr += '(' + qrBirthDate.slice(0, -2) + ')&&';
            }
        }
        // end code #2

<<<<<<< HEAD
        if (qr.length > 0) {
            var qr1 = "(" + qr.slice(0, -2) + ')';
        }

        qr = "Vacancy=='" + id + "'&&!Deleted";

        mvApplicant.query({
            query: queryBulider.qb(qr),
            query1: queryBulider.qb(qr1),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize,
            jobSeeker: jobSeekerId
=======

        if (qr.length > 0) {
            qr = "Vacancy=='" + id + "'&&!Deleted&&(" + qr.slice(0, -2) + ')';
        }
        else {
            qr = "Vacancy=='" + id + "'&&!Deleted";
        }

        mvApplicant.query({
            query: queryBulider.qb(qr),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize,
            jobSeeker: jobSeekerId,
>>>>>>> origin/master
        }, (function (res) {
            $scope.applicants = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };

    $scope.getData();

    var addCheckBoxToDiv = function (id, lab, flag, name, selectedList) {
        var flg = true;
        for (var y = 0; y < selectedList.length; y++) {
            if (selectedList[y].id == id) {
                flg = false;
                break;
            }
        }
        if (flg) {
            selectedList.push({ 'id': id, 'flag': flag });
            var div = document.getElementById(name + 'Div');
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = name;
            checkbox.value = id;
            checkbox.id = id;
            checkbox.checked = flag;

            var label = document.createElement('label');
            label.htmlFor = "id";
            label.appendChild(document.createTextNode(lab));

            var br = document.createElement("br");

            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(br);


            checkbox.addEventListener('change', function (event) {

                var name = checkbox.name;
                var checkboxes = document.getElementsByName(name); //checkbox items                                          

                //uncheck all check boxes when check select all 
                if (checkbox.id == 0) {
                    if ($(this).is(":checked")) {
                        for (i = 1; i < checkboxes.length; i++) {
                            checkboxes[i].checked = false;
                        }
                    } else {
                        checkboxes[0].checked = true;
                    }
                } else {
                    if ($(this).is(":checked")) {
                        checkboxes[0].checked = false;
                    }
                }

                //check "select all" if all checkbox items are checked                
                //if ($('input[name="' + name + '"]:checked').length == checkboxes.length - 1) {
                //    checkboxes[0].checked = true; //change "select all" checked status to true
                //    for (i = 1; i < checkboxes.length; i++) {
                //        checkboxes[i].checked = false;
                //    }
                //}

                //check "select all" if all checkbox items are unchecked                
                if ($('input[name="' + name + '"]:not(:checked)').not(":eq(0)").length == checkboxes.length - 1) {
                    checkboxes[0].checked = true; //change "select all" checked status to true
                }

                for (i = 0; i < checkboxes.length; i++) {
                    $.each(selectedList, function () {
                        if (this.id == checkboxes[i].id) {
                            this.flag = checkboxes[i].checked;
                        }
                    });
                }

                $scope.getData();

            });

        }
    };

    // start code #3
    var BirthDatesHeaderClickFunction = function () {
        if (BirthDatesHeaderFlag) {
            BirthDatesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/applicantsSearchResult",
<<<<<<< HEAD
                data: { groupBy: "BirthDate", currentLang: $translate.use(), vacancyId: id },
=======
                data: { groupBy: "JobSeeker.BirthDate", currentLang: $translate.use() ,vacancyId : id},
>>>>>>> origin/master
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'birthDates', SelectedBirthDates);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
<<<<<<< HEAD
                        var datee = new Date(item.groupByObject);
                        var datee = datee.getDate() + '/' + (datee.getMonth() + 1) + '/' + datee.getFullYear();
                        lab = datee + '   (' + item.count + ')  ';

=======
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
>>>>>>> origin/master
                        addCheckBoxToDiv(item._id, lab, false, 'birthDates', SelectedBirthDates);
                    });
                }
            });

            BirthDatesHeaderFlag = true;
        }
    }
    $("#birthDatesHeader").click(BirthDatesHeaderClickFunction);
    $(function () {
        $("#birthDateName").autocomplete({
            source: function (request, response) {
                $scope.SelectedBirthDates = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/applicantsSearchResult",
<<<<<<< HEAD
                    data: { groupBy: "BirthDate", currentLang: $translate.use(), vacancyId: id },
=======
                    data: { groupBy: "JobSeeker.BirthDate", currentLang: $translate.use(), vacancyId: id },
>>>>>>> origin/master
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
<<<<<<< HEAD
                            var datee = new Date(item.groupByObject);
                            var datee = datee.getDate() + '/' + (datee.getMonth() + 1) + '/' + datee.getFullYear();
                            lab = datee + '   (' + item.count + ')  ';
=======
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
>>>>>>> origin/master

                            if (lab == '') {
                                return;
                            }

                            return { label: lab, value: lab, id: item._id };
                        }));
                    },
                    error: function (error) {
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                    },
                    complete: function () {
                    }
                });
            },
            select: function (e, i) {
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'birthDates', SelectedBirthDates);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //end code #3 


    //// accordions start

    var headers = $('#accordion1 .accordion-header');
    var contentAreas = $('#accordion1 .ui-accordion-content').show();
    var expandLink = $('.accordion-expand-all');

    // add the accordion functionality
    headers.click(function () {
        var panel = $(this).next();
        var isOpen = panel.is(':visible');

        // open or close as necessary
        panel[isOpen ? 'slideUp' : 'slideDown']()
            // trigger the correct custom event
            .trigger(isOpen ? 'hide' : 'show');

        // stop the link from causing a pagescroll
        return false;
    });

    // hook up the expand/collapse all
    expandLink.click(function () {
        var isAllOpen = $(this).data('isAllOpen');

        contentAreas[isAllOpen ? 'hide' : 'show']().trigger(isAllOpen ? 'hide' : 'show');
    });

    // when panels open or close, check to see if they're all open
    contentAreas.on({
        // whenever we open a panel, check to see if they're all open
        // if all open, swap the button to collapser
        show: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (isAllOpen) {
                expandLink.text('Collapse All').data('isAllOpen', true);
            }
        },
        // whenever we close a panel, check to see if they're all open
        // if not all open, swap the button to expander
        hide: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (!isAllOpen) {
                expandLink.text('Expand all').data('isAllOpen', false);
            }
        }
    });
    //// accordions end


    $(function () {
        BirthDatesHeaderClickFunction();
    });

});
