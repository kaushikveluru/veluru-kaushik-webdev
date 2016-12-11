(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController)

    function WidgetListController($routeParams,WidgetService,$sce){
            console.log("in widget list controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init(){
            WidgetService.findWidgetsByPageId(vm.pid)
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(err){console.log(err)})
        }
        init();



    }

    function NewWidgetController($routeParams){
        console.log("in new widget controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.type = $routeParams.type;
        vm.widgetId = (new Date()).getTime();
        vm.createWidget = createWidget;

        function init() {
            WidgetService.findWidgetsByPageId(pageId)
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(err){
                    console.log(err);
                });
        }
        init();

        function createWidget(widget){
            widget.widgetType = vm.type;
            widget.width += '%';
            widget._id = vm.widgetId;
            WidgetService.createWidget(vm.pid, widget)
                .success(function(widget){
                    init();
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(err){
                    console.log(err);
                });
        }


        function goToWidget(type) {
            vm.type = type;
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new/" + type);
        }

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