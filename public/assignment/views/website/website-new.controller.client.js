
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {

                });
        }
        init();


        /**
         * creates a new website
         * @param website
         */
        function createWebsite(website) {
            if(website === undefined || website.name === undefined){
                vm.error = "Name is required to create a new website";
            }else{
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .success(function (website) {
                        if(website != '0'){
                            $location.url("/user/" + vm.userId + "/website");
                        }
                    })
                    .error(function () {

                    });
            }
        }
    }
})();
