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
        vm.widgetUrl = widgetUrl;

        function init(){
            WidgetService.findWidgetsByPageId(vm.pid)
                .success(function(widgets){
                    vm.widgets = widgets;

                    var initial, final;
                    $( "#sortable" )
                        .sortable({
                            axis: 'y',
                            start: function(event, ui){
                                initial = ui.item.index();
                            },
                            update: function (event, ui) {
                                final = ui.item.index();
                                WidgetService.sortWidget(vm.pid, initial, final)
                                    .success(function(widgets){
                                        vm.widgets = widgets;
                                    });
                            }
                        });
                })
                .error(function(err){console.log(err)})
        }
        init();

        function widgetUrl(widget){
            var url = widget.url;
            if(widget.widgetType == 'image'){
                return $sce.trustAsResourceUrl(url);
            }

            var vId = url.indexOf("?v=");
            if(vId == -1){
                url = 'http://www.youtube.com/embed'+url.substr(url.lastIndexOf('/')+1)
                return $sce.trustAsResourceUrl(url);
            }
            return $sce.trustAsResourceUrl('http://www.youtube.com/embed'+url.substr(vId+3));

        }


    }

    function NewWidgetController($routeParams,WidgetService){
        console.log("in new widget controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.type = $routeParams.type;
        vm.widgetId = (new Date()).getTime();
        vm.createWidget = createWidget;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pid)
                .success(function(widgets){
                    vm.widgets = widgets;
                    console.log("widgets: "+widgets)
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
            console.log("go to widget type: "+type)
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new/" + vm.type);
        }

    }

    function EditWidgetController($routeParams,WidgetService,$location){

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.widget = {};
        vm.widget.widgetType = 'image';
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService.findWidgetById(vm.wgid)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function(err){
                    console.log(err);
                });
        }
        init();

        function updateWidget(widget){
            WidgetService.updateWidget(widget)
                .success(function(widget){
                    init();
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(err){
                    console.log(err);
                });
        }

        function deleteWidget(widget){
            WidgetService.deleteWidget(widget._id)
                .success(function(widget){
                    init();
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(err){
                    console.log(err);
                });
        }

        function widgetType(){
            var widget = WidgetService.findWidgetById(vm.wgid);
            console.log("widget type : "+widget.widgetType)
            return widget.widgetType;
        }


    }

})();