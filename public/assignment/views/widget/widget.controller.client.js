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
        console.log("in new widget controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

    }

    function EditWidgetController($routeParams,WidgetService){

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.widgetType = widgetType;

        function widgetType(){
            var widget = WidgetService.findWidgetById(vm.wgid);
            console.log("widget type : "+widget.widgetType)
            return widget.widgetType;
        }


    }

})();