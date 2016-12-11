(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController)

    function PageListController($routeParams,PageService){
        console.log("in page list controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        function init(){
            PageService.findPageByWebsiteId(vm.wid)
                .success(function(pages){vm.pages = pages})
                .error(function(err){console.log(err)})
        }
        init();
    }

    function NewPageController($routeParams,PageService,$location){

        console.log("in new page controller ")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createNewPage = createNewPage;

        function init(){
            PageService.findPageByWebsiteId(vm.wid)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(err){console.log(err)});
        }

        init();

        function createNewPage(page){

            PageService.createPage(vm.wid,page)
                .success(function(page){
                    init();
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page")
                })
                .error(function(err){
                    console.log(err);
                })
        }

    }

    function EditPageController($routeParams,PageService,$location){
        console.log("in edit page controller")
        var vm = this;
        vm.uid= $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.page = PageService.findPageById(vm.pid);

        vm.savePage = savePage;
        vm.deletePage = deletePage;


        function init(){
            PageService.findPageByWebsiteId(vm.wid)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(msg){
                    console.log(msg);
                });
            PageService.findPageById(vm.pid)
                .success(function(page){
                    vm.page = page;
                });
        }

        init();

        function savePage(name,title){
            vm.page.name = name;
            vm.page.description =title;
            PageService.updatePage(vm.pid,vm.page)
                .success(function(page){
                    init();
                    var url = "/user/"+vm.uid+"/website/"+vm.wid+"/page"
                    $location.url(url)

                })
                .error(function(err){console.log(err)})

        }

        function deletePage(){
           PageService.deletePage(vm.pid)
               .success(function(page){
                   init();
                   $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page")
               })
               .error(function(err){console.log(err)})
        }


    }
})();