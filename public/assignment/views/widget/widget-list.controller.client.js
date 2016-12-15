
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeImage = checkSafeImage;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (error) {

                });

        }
        init();

        /**
         * checks and returns the trusted HTML content
         * @param html
         * @returns {*}
         */
        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        /**
         * checks and returns trusted image resources URL
         * @param url
         * @returns {*}
         */
        function checkSafeImage(url) {
            return $sce.trustAsResourceUrl(url);
        }

        /**
         * checks and returns a trusted youtube url and converts it into embedded URL
         * @param url
         * @returns {*}
         */
        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length-1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();

