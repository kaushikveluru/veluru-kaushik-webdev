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

    function NewWebsiteController($routeParams, WebSiteService,$location){
        console.log("in new website controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createNewWebsite = createNewWebsite;

        function createNewWebsite(websiteName,websiteDescription){

            var website =  { "_id": "999", "name": websiteName,    "developerId": vm.uid, "description": websiteDescription }
            website = WebSiteService.createWebsite(vm.uid,website);
            $location.url("/user/"+vm.uid+"/website")
        }



    }

    function EditWebsiteController($routeParams,WebSiteService,$location){
        console.log("in edit website controller")

        var vm = this;
        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.website = WebSiteService.findWebsiteById(vm.wid);
        vm.deleteWebsite = deleteWebsite;

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

        function deleteWebsite(wid)
        {
            var websites = WebSiteService.getAllWebsites();
            console.log("before deltion : "+websites.length);
            WebSiteService.deleteWebsite(wid);
            websites = WebSiteService.getAllWebsites();
            console.log("after deletion : "+websites.length)
            $location.url("/user/"+vm.uid+"/website")
        }


    }
})();