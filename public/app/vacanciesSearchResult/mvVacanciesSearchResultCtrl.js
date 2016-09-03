angular.module('app').controller('mvVacanciesSearchResultCtrl', function ($scope, mvVacancy, mvVacancyRepo, queryBulider, mvNotifier, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    
    $scope.paging = {
        currentPage: 1,
        maxPagesToShow: 5,
        pageSize: 10
    };
    
    $scope.getData = function () {
        mvVacancy.query({
            query: queryBulider.qb("!Deleted"),
            currentPage: $scope.paging.currentPage,
            pageSize: $scope.paging.pageSize
        }, (function (res) {
            $scope.vacancies = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
    };
    
    $scope.getData();
      
    $scope.searchAtJson = function (obj, searchField , searchVal, returnField) {
        for (var i = 0; i < obj.length ; i++) {
            if (obj[i][searchField] == searchVal) {
                return obj[i][returnField];
            }
        }
    };

    $(function () {
        $("#industryName").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/api/vacanciesSearchResult",
                    data: { groupBy: "Industry", currentLang: $("#currentLang").val() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return { label: item.ind.Description[0].Text, value: item._id, id: item._id };
                        }));
                    },
                    error: function (error) {                        
                        console.log(error);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    beforeSend: function () {
                        //var p = $("#SelectedCities");
                        //var offset = p.offset();
                        ////set
                        //$("#loader").offset({ top: offset.top + 10, left: offset.left + 200 });
                        //$('#loader').css("visibility", "visible");
                    },
                    complete: function () {
                        //$('#loader').css("visibility", "hidden");
                    }
                });
            },
            select: function (e, i) {
                console.log(i.item);
                $scope.SelectedCities.push(i.item);                
            },
            minLength: 2
        });
    });
    
    //// accordions start
  
    var headers = $('#accordion1 .accordion-header');
    var contentAreas = $('#accordion1 .ui-accordion-content ').hide();
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
        
        contentAreas[isAllOpen? 'hide': 'show']()
        .trigger(isAllOpen? 'hide': 'show');
    });
    
    // when panels open or close, check to see if they're all open
    contentAreas.on({
        // whenever we open a panel, check to see if they're all open
        // if all open, swap the button to collapser
        show: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (isAllOpen) {
                expandLink.text('Collapse All')
                .data('isAllOpen', true);
            }
        },
        // whenever we close a panel, check to see if they're all open
        // if not all open, swap the button to expander
        hide: function () {
            var isAllOpen = !contentAreas.is(':hidden');
            if (!isAllOpen) {
                expandLink.text('Expand all')
            .data('isAllOpen', false);
            }
        }
    });
    //// accordions end
                 
});
