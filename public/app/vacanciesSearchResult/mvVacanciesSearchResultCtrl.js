angular.module('app').controller('mvVacanciesSearchResultCtrl', function ($scope, $translate, mvVacancy,
    mvVacancyRepo, queryBulider, mvNotifier, mvIdentity) {
    
    //to add new search in accordion 
    //1- add new accordion header and content at html  
    //   change name of the field ,in these blocks I use 'Industry' 
    //2- add list  like one at code #1    
    //3- add block like one at code #2
    //4- add block like one at code #3 
    //5- change name of the field in these blocks I use 'Industry' 
    //6- go to vacancies controller at server to change at function getVacanciesSearchResult
    
    $scope.currentUser = mvIdentity.currentUser;
    
    //start code #1
    var SelectedIndustries = [];
    var IndustriesHeaderFlag = false;
    //end code #1
    
    var SelectedCountries = [];
    var CountriesHeaderFlag = false;
    
    var SelectedCities = [];
    var CitiesHeaderFlag = false;
    
    var SelectedAreas = [];
    var AreasHeaderFlag = false;
    
    var SelectedJobRoles = [];
    var JobRolesHeaderFlag = false;
    
    var SelectedJobTypes = [];
    var JobTypesHeaderFlag = false;
    
    var SelectedEducationalLevels = [];
    var EducationalLevelsHeaderFlag = false;
    
    var SelectedCareerLevels = [];
    var CareerLevelsHeaderFlag = false;

    var jobSeekerId = mvIdentity.currentJobSeeker._id;
    debugger;
    if (!jobSeekerId)
        jobSeekerId = 0;

    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 5
    };
    
    $scope.getData = function () {
        
        var qr = '';

        // start code #2
        if (SelectedIndustries.length > 0) {
            var qrIndustry = '';
            
            if (SelectedIndustries[0].flag !== true) {
                for (var y = 0; y < SelectedIndustries.length; y++) {
                    if (SelectedIndustries[y].flag) {
                        qrIndustry += "Industry=='" + SelectedIndustries[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedIndustries.length; y++) {
                    qrIndustry += "Industry=='" + SelectedIndustries[y].id + "'||";
                }
            }
            
            if (qrIndustry.length > 0) {
                qr += '(' + qrIndustry.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        // end code #2
        
        //start country code #2
        if (SelectedCountries.length > 0) {
            var qrCountry = '';
            
            if (SelectedCountries[0].flag !== true) {
                for (var y = 0; y < SelectedCountries.length; y++) {
                    if (SelectedCountries[y].flag) {
                        qrCountry += "Country=='" + SelectedCountries[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedCountries.length; y++) {
                    qrCountry += "Country=='" + SelectedCountries[y].id + "'||";
                }
            }
            
            if (qrCountry.length > 0) {
                qr +=  '(' + qrCountry.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }                
        //end country code #2

        //start city code #2 
        if (SelectedCities.length > 0) {
            var qrCity = '';
            
            if (SelectedCities[0].flag !== true) {
                for (var y = 0; y < SelectedCities.length; y++) {
                    if (SelectedCities[y].flag) {
                        qrCity += "City=='" + SelectedCities[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedCities.length; y++) {
                    qrCity += "City=='" + SelectedCities[y].id + "'||";
                }
            }
            
            if (qrCity.length > 0) {
                qr += '(' + qrCity.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end city code #2
        
        //start area code #2 
        if (SelectedAreas.length > 0) {
            var qrArea = '';
            
            if (SelectedAreas[0].flag !== true) {
                for (var y = 0; y < SelectedAreas.length; y++) {
                    if (SelectedAreas[y].flag) {
                        qrArea += "Area=='" + SelectedAreas[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedAreas.length; y++) {
                    qrArea += "Area=='" + SelectedAreas[y].id + "'||";
                }
            }
            
            if (qrArea.length > 0) {
                qr += '(' + qrArea.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end area code #2
        
        
        //start job role code #2 
        if (SelectedJobRoles.length > 0) {
            var qrJobRole = '';
            
            if (SelectedJobRoles[0].flag !== true) {
                for (var y = 0; y < SelectedJobRoles.length; y++) {
                    if (SelectedJobRoles[y].flag) {
                        qrJobRole += "JobRole=='" + SelectedJobRoles[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedJobRoles.length; y++) {
                    qrJobRole += "JobRole=='" + SelectedJobRoles[y].id + "'||";
                }
            }
            
            if (qrJobRole.length > 0) {
                qr += '(' + qrJobRole.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end job role code #2
        
        
        //start job type code #2 
        if (SelectedJobTypes.length > 0) {
            var qrJobType = '';
            
            if (SelectedJobTypes[0].flag !== true) {
                for (var y = 0; y < SelectedJobTypes.length; y++) {
                    if (SelectedJobTypes[y].flag) {
                        qrJobType += "JobType=='" + SelectedJobTypes[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedJobTypes.length; y++) {
                    qrJobType += "JobType=='" + SelectedJobTypes[y].id + "'||";
                }
            }
            
            if (qrJobType.length > 0) {
                qr += '(' + qrJobType.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end job type code #2
        
        
        
        //start educational level code #2 
        if (SelectedEducationalLevels.length > 0) {
            var qrEducationalLevel = '';
            
            if (SelectedEducationalLevels[0].flag !== true) {
                for (var y = 0; y < SelectedEducationalLevels.length; y++) {
                    if (SelectedEducationalLevels[y].flag) {
                        qrEducationalLevel += "EducationalLevel=='" + SelectedEducationalLevels[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedEducationalLevels.length; y++) {
                    qrEducationalLevel += "EducationalLevel=='" + SelectedEducationalLevels[y].id + "'||";
                }
            }
            
            if (qrEducationalLevel.length > 0) {
                qr += '(' + qrEducationalLevel.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end educational level code #2
        
        
        //start career level code #2 
        if (SelectedCareerLevels.length > 0) {
            var qrCareerLevel = '';
            
            if (SelectedCareerLevels[0].flag !== true) {
                for (var y = 0; y < SelectedCareerLevels.length; y++) {
                    if (SelectedCareerLevels[y].flag) {
                        qrCareerLevel += "CareerLevel=='" + SelectedCareerLevels[y].id + "'||";
                    }
                }
            } else {
                for (var y = 1; y < SelectedCareerLevels.length; y++) {
                    qrCareerLevel += "CareerLevel=='" + SelectedCareerLevels[y].id + "'||";
                }
            }
            
            if (qrCareerLevel.length > 0) {
                qr += '(' + qrCareerLevel.slice(0, -2) + ')&&';
            }
        }
        //if (qr.length > 0) { qr += '&&'; }
        //end career level code #2
        
        
        
        


        
        if (qr.length > 0) { qr = '!Deleted&&(' + qr.slice(0, -2) + ')'; } else { qr = '!Deleted'; }
        debugger;
        mvVacancy.query({
            query: queryBulider.qb(qr),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize,
            jobSeeker: jobSeekerId,
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.getData();

    var addCheckBoxToDiv = function(id, lab, flag, name, selectedList) {
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
            
            
            checkbox.addEventListener('change', function(event) {

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
                    $.each(selectedList, function() {
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
    var IndustriesHeaderClickFunction = function () {
        if (IndustriesHeaderFlag) {
            IndustriesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "Industry", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'industries', SelectedIndustries);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'industries', SelectedIndustries);
                    });
                }
            });

            IndustriesHeaderFlag = true;
        }
    }
    $("#industriesHeader").click(IndustriesHeaderClickFunction);    
    $(function () {
        $("#industryName").autocomplete({
            source: function (request, response) {
                $scope.SelectedIndustries = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "Industry", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'industries', SelectedIndustries);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //end code #3
    
    //start country code #3
    var CountriesHeaderClickFunction = function () {
        if (CountriesHeaderFlag) {
            CountriesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "Country", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'countries', SelectedCountries);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'countries', SelectedCountries);
                    });
                }
            });

            CountriesHeaderFlag = true;
        }
    }
    $("#countriesHeader").click(CountriesHeaderClickFunction);    
    $(function () {
        $("#countryName").autocomplete({
            source: function (request, response) {
                $scope.SelectedCountries = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "Country", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'countries', SelectedCountries);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start country code #3
    

    //start city code #3
    var citiesHeaderClickFunction = function () {
        if (CitiesHeaderFlag) {
            CitiesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "City", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'cities', SelectedCities);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'cities', SelectedCities);
                    });
                }
            });

            CitiesHeaderFlag = true;
        }
    }
    $("#citiesHeader").click(citiesHeaderClickFunction);    
    $(function () {
        $("#cityName").autocomplete({
            source: function (request, response) {
                $scope.SelectedCities = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "City", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'cities', SelectedCities);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start city code #3
    
    //start area code #3
    var AreasHeaderClickFunction = function () {
        if (AreasHeaderFlag) {
            AreasHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "Area", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'areas', SelectedAreas);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'areas', SelectedAreas);
                    });
                }
            });

            AreasHeaderFlag = true;
        }
    }
    $("#areasHeader").click(AreasHeaderClickFunction);    
    $(function () {
        $("#areaName").autocomplete({
            source: function (request, response) {
                $scope.SelectedAreas = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "Area", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'areas', SelectedAreas);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start area code #3    
    
    //start job role code #3
    var JobRolesHeaderClickFunction = function () {
        if (JobRolesHeaderFlag) {
            JobRolesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "JobRole", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'jobRoles', SelectedJobRoles);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'jobRoles', SelectedJobRoles);
                    });
                }
            });

            JobRolesHeaderFlag = true;
        }
    }     
    $("#jobRolesHeader").click(JobRolesHeaderClickFunction);    
    $(function () {
        $("#jobRoleName").autocomplete({
            source: function (request, response) {
                $scope.SelectedJobRoles = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "JobRole", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'jobRoles', SelectedJobRoles);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start job role code #3    
    
    //start job type code #3
    var JobTypesHeaderClickFunction = function () {
        if (JobTypesHeaderFlag) {
            JobTypesHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "JobType", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'jobTypes', SelectedJobTypes);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'jobTypes', SelectedJobTypes);
                    });
                }
            });

            JobTypesHeaderFlag = true;
        }
    }
    $("#jobTypesHeader").click(JobTypesHeaderClickFunction);    
    $(function () {
        $("#jobTypeName").autocomplete({
            source: function (request, response) {
                $scope.SelectedJobTypes = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "JobType", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'jobTypes', SelectedJobTypes);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start job type code #3    
        
    //start educational level code #3
    var EducationalLevelsHeaderClickFunction = function () {
        if (EducationalLevelsHeaderFlag) {
            EducationalLevelsHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "EducationalLevel", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'educationalLevels', SelectedEducationalLevels);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'educationalLevels', SelectedEducationalLevels);
                    });
                }
            });

            EducationalLevelsHeaderFlag = true;
        }
    }
    $("#educationalLevelsHeader").click(EducationalLevelsHeaderClickFunction);    
    $(function () {
        $("#educationalLevelName").autocomplete({
            source: function (request, response) {
                $scope.SelectedEducationalLevels = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "EducationalLevel", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'educationalLevels', SelectedEducationalLevels);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start educational level code #3    
    
    //start career level code #3
    var CareerLevelsHeaderClickFunction = function () {
        if (CareerLevelsHeaderFlag) {
            CareerLevelsHeaderFlag = false;
        } else {
            $.ajax({
                type: "get",
                async: false,
                url: "/api/vacanciesSearchResult",
                data: { groupBy: "CareerLevel", currentLang: $translate.use() },
                success: function (data) {

                    var count = 0;
                    $.map(data, function (item) { count += item.count; });

                    addCheckBoxToDiv(0, 'All   (' + count + ')  ', true, 'careerLevels', SelectedCareerLevels);

                    $.map(data.splice(0, 3), function (item) {
                        var lab = '';
                        for (var i = 0; i < item.groupByObject.Name.length; i++) {
                            var lang = item.groupByObject.Name[i].Lang;
                            var text = item.groupByObject.Name[i].Text;
                            if (lang == $translate.use()) {
                                lab = text + '   (' + item.count + ')  ';
                                break;
                            }
                        }
                        addCheckBoxToDiv(item._id, lab, false, 'careerLevels', SelectedCareerLevels);
                    });
                }
            });

            CareerLevelsHeaderFlag = true;
        }
    }
    $("#careerLevelsHeader").click(CareerLevelsHeaderClickFunction);    
    $(function () {
        $("#careerLevelName").autocomplete({
            source: function (request, response) {
                $scope.SelectedCareerLevels = [];
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "CareerLevel", currentLang: $translate.use() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            var prefix = request.term;
                            var lab = '';
                            for (var i = 0; i < item.groupByObject.Name.length; i++) {
                                var lang = item.groupByObject.Name[i].Lang;
                                var text = item.groupByObject.Name[i].Text;
                                if (lang == $translate.use() && text.toLowerCase().indexOf(prefix.toLowerCase()) >= 0) {
                                    lab = text + '   (' + item.count + ')  ';
                                    break;
                                }
                            }
                            
                            if (lab == '') {
                                return;
                            }
                            
                            return { label: lab , value: lab , id: item._id };
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
                addCheckBoxToDiv(i.item.id, i.item.label, true, 'careerLevels', SelectedCareerLevels);
                this.value = "";
                return false;
            },
            minLength: 2
        });
    });
    //start career level code #3    

    
        
    
    //// accordions start
    
    var headers = $('#accordion1 .accordion-header');
    var contentAreas = $('#accordion1 .ui-accordion-content').show();
    var expandLink = $('.accordion-expand-all');
    
    // add the accordion functionality
    headers.click(function () {
        var panel = $(this).next();
        var isOpen = panel.is(':visible');
        
        // open or close as necessary
        panel[isOpen? 'slideUp': 'slideDown']()
        // trigger the correct custom event
        .trigger(isOpen? 'hide': 'show');
        
        // stop the link from causing a pagescroll
        return false;
    });
    
    // hook up the expand/collapse all
    expandLink.click(function () {
        var isAllOpen = $(this).data('isAllOpen');
        
        contentAreas[isAllOpen? 'hide': 'show']().trigger(isAllOpen? 'hide': 'show');
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
        IndustriesHeaderClickFunction();
        CountriesHeaderClickFunction();
        citiesHeaderClickFunction();
        AreasHeaderClickFunction();
        JobRolesHeaderClickFunction();
        JobTypesHeaderClickFunction();
        EducationalLevelsHeaderClickFunction();
        CareerLevelsHeaderClickFunction();
    });

});
