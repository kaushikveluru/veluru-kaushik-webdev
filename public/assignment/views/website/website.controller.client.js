(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController)

    function WebsiteListController($routeParams,WebSiteService){

        var vm = this;
        vm.uid = $routeParams.uid;


        var websites = WebSiteService.getAllWebsites();

        var tempWebsites=[];
        for(var u in websites)
        {
            if(websites[u].developerId === vm.uid)
            {
                tempWebsites.push(websites[u]);
            }
        }
        vm.websites = tempWebsites;

    }

    function NewWebsiteController(){
        console.log("in new website controller")
        var vm = this;
    }

    function EditWebsiteController($routeParams,WebSiteService){
        console.log("in edit website controller")
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.website = WebSiteService.findWebsiteById(vm.wid);

        var websites = WebSiteService.getAllWebsites();
        console.log("fetched websites : "+websites.length)

        var tempWebsites=[];
        for(var u in websites)
        {
            if(websites[u].developerId === vm.uid)
            {
                tempWebsites.push(websites[u]);
            }
        }
        vm.websites = tempWebsites;
        console.log("websites after : "+vm.websites.length)


    }
})();