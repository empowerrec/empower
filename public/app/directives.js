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

})();