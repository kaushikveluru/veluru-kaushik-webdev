(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController)

    function WebsiteListController($routeParams,WebSiteService){

        var vm = this;
        vm.uid = $routeParams.uid;

        function init(){
            var websites = WebSiteService.findWebsitesByUser(vm.uid);
            websites
                .success(function(websites){vm.websites = websites})
                .error(function(err){vm.error = error})
        }
        init();

    }

    function NewWebsiteController($routeParams, WebSiteService,$location){
        console.log("in new website controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createNewWebsite = createNewWebsite;

        function init(){
            var websites = WebSiteService.findWebsitesByUser(vm.uid);
            websites
                .success(function(websitesList){vm.websites = websitesList})
                .error(function(err){console.log(err)})
        }
        init()


        function createNewWebsite(website){
            console.log("before addition : "+vm.websites.length)
            WebSiteService.createWebsite(vm.uid,website)
                .success(function(websiteList){
                    vm.websites = websiteList
                    console.log("after addition : "+vm.websites.length)
                    $location.url("/user/"+vm.uid+"/website")
                })
                .error(function(err){console.log(err)})

        }



    }

    function EditWebsiteController($routeParams,WebSiteService,$location){
        console.log("in edit website controller")

        var vm = this;
        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init(){
            WebSiteService.findWebsitesByUser(vm.uid)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(err){
                    console.log(err);
                });
            WebSiteService.findWebsiteById(vm.wid)
                .success(function(website){
                    vm.website = website})
                .error(function(err){
                    console.log(err);
                });
        }

        init();

        function updateWebsite(website) {
            WebSiteService.updateWebsite(website)
                .success(function(website){
                    init();
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function(err){
                    console.log("Error updating website: "+err);
                });
        }




        function deleteWebsite(wid)
        {
            WebSiteService.deleteWebsite(wid)
                .success(function(website){
                    init();
                    $location.url("/user/"+vm.uid+"/website")
                })
                .error(function(err){console.log("error deleting the page: "+err)})
        }


    }
})();