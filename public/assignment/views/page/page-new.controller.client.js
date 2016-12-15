
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error) {

                });
        }
        init();

        /**
         * creates a new page
         * @param page
         */
        function createPage(page) {
            if(page === undefined || page.name === undefined){
                vm.error = "Name is required to create a new page";
            }else{
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function (page) {
                        if(page != '0'){
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        }
                    })
                    .error(function (error) {

                    });

            }
        }
    }
})();
