angular.module('app').controller('mvMainCtrl', ['$scope', 'mvCourse', 'mvIdentity', '$location',

    function ($scope, mvCourse, mvIdentity, $location) {
        $scope.identity = mvIdentity;
        $scope.courses = mvCourse.query();

        $scope.search = function () {
            $location.path('/vacanciesSearchResult');
        };

        $(function () {
            $('#noo-slider-3 .sliders').carouFredSel({
                infinite: true,
                circular: true,
                responsive: true,
                debug: false,
                items: {
                    start: 0
                },
                scroll: {
                    items: 1,
                    duration: 400,

                    fx: "scroll"
                },
                auto: {
                    timeoutDuration: 3000,

                    play: true
                },

                pagination: {
                    container: "#noo-slider-3-pagination"
                },
                swipe: {
                    onTouch: true,
                    onMouse: true
                }
            });
            $('#noo-tabs-2 a:eq(1)').tab('show');
        });
    }
]);