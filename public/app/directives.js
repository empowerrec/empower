(function () {
    'use strict';

    angular.module('app').directive('matchPasswordValidationError', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctl) {
                scope.$watch(attrs['matchPasswordValidationError'], function (errorMsg) {
                    elm[0].setCustomValidity(errorMsg);
                    ctl.$setValidity('matchPasswordValidationError', errorMsg ? false : true);
                });
            }
        };
    });

    angular.module('app').directive('widgetHeader', function () {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                'title': '@',
                'hyperlink1': '@',
                'ref': '@',
                'hyperlink2': '@',
                'ref2': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/layout/widgetheader.html',
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('class', 'widget-head');
        }
    });

    angular.module('app').directive('myMap', function () {
            // directive link function
            var link = function (scope, element, attrs) {
                var map, infoWindow;
                var markers = [];

                // map config
                var mapOptions = {
                    center: new google.maps.LatLng(50, 2),
                    zoom: 4,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                };

                // init the map
                function initMap() {
                    if (map === void 0) {
                        map = new google.maps.Map(element[0], mapOptions);
                    }
                }

                // place a marker
                function setMarker(map, position, title, content) {
                    var marker;
                    var markerOptions = {
                        position: position,
                        map: map,
                        title: title,
                        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    };

                    marker = new google.maps.Marker(markerOptions);
                    markers.push(marker); // add marker to array

                    google.maps.event.addListener(marker, 'click', function () {
                        // close window if not undefined
                        if (infoWindow !== void 0) {
                            infoWindow.close();
                        }
                        // create new window
                        var infoWindowOptions = {
                            content: content
                        };
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);
                    });
                }

                // show the map and place some markers
                initMap();

                setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
                setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
                setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
            };

            return {
                restrict: 'A',
                template: '<div id="gmaps"></div>',
                replace: true,
                link: link
            };
        });


})();