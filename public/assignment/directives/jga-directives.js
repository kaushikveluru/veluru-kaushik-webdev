
(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable); // .jga-sortable

    /**
     * sorts the widgets
     * @returns {{scope: {}, link: linker, controller: sortableController, controllerAs: string}}
     */
    function jgaSortable() {

        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element.sortable({
                axis: 'y',
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort(start, end);
                }
            });
        }

        return{
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }


    function sortableController($routeParams, WidgetService) {
        var vm = this;
        vm.sort = sort;
        var pageId = $routeParams.pid;

        /**
         * sorts the widgets based on the initial and final index
         * @param start
         * @param end
         */
        function sort(start, end) {
            WidgetService
                .sort(start, end, pageId)
                .success(function (success) {
                    
                })
                .error(function (error) {
                    
                });
        }

    }
})();
