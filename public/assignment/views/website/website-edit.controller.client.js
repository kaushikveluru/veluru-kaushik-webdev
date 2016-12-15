(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    
    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    if(website != '0'){
                        vm.website = website;
                    }
                })
                .error(function () {

                });

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
         * updates the given website
         * @param website
         */
        function updateWebsite(website) {
            if(website.name === undefined || website.name.length < 1){
                vm.error = "Website name cannot be empty.";
            } else{
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .success(function (website) {
                        if(website != '0'){
                            $location.url("/user/"+vm.userId+"/website");
                        }
                    })
                    .error(function (error) {

                    });
            }

        }

        /**
         * deletes a website
         */
        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {

                });
        }


    }
})();
