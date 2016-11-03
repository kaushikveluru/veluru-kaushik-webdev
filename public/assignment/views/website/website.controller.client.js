(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController)

    function WebsiteListController($routeParams,WebSiteService){

        var vm = this;
        var uid = $routeParams.uid;
        vm.goToWebsite = goToWebsite;

        var websites = WebSiteService.getAllWebsites();

        var tempWebsites=[];
        for(var u in websites)
        {
            if(websites[u].developerId === uid)
            {
                tempWebsites.push(websites[u]);
            }
        }

        vm.websites = tempWebsites;


        function goToWebsite(website)
        {
            
        }




    }

    function NewWebsiteController(){
        var vm = this;
    }

    function EditWebsiteController(){
        var vm = this;
    }
})();