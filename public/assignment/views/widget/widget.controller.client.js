(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController)

    function WidgetListController($routeParams,WidgetService,$sce){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid)
        vm.checkSafeHTML = checkSafeHTML;
        vm.checkSafeYouTubeURL = checkSafeYouTubeURL;

        function checkSafeHTML(html){
            return $sce.trustAsHtml(html)

        }

        function checkSafeYouTubeURL(url,$sce ){
            var parts = url.split("/");
            url = "https://www.youtube.com/embed/"+parts[parts.length-1];
            console.log(url)
            return $sce.trustAsResourceUrl(url)
        }


    }

    function NewWidgetController($routeParams){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

    }

    function EditWidgetController($routeParams){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

    }

})();