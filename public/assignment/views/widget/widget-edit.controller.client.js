
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.checkIsWidgetIsValid = checkIsWidgetIsValid;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    if(widget != '0'){
                        vm.widget = widget;
                    }
                })
                .error(function (error) {

                });

        }
        init();

        /**
         * updates a widget
         */
        function updateWidget() {
            if(canUpdateWidget(vm.widget)){
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function (widget) {
                        if(widget != '0'){
                            vm.widget = widget;
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +"/widget");
                        }
                    })
                    .error(function (error) {

                    });

            } else{
                vm.error = getWidgetEditErrorMessage(vm.widget);
            }

        }

        /**
         * deletes a widget
         */
        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +"/widget");
                })
                .error(function (error) {

                });

        }

        /**
         * returns true if the required fields of the widget are not undefined
         * @param widget
         * @returns {boolean}
         */
        function canUpdateWidget(widget) {
            if(widget.widgetType === "HEADER"){
                if(widget.text != undefined && widget.size != undefined){
                    if(widget.size >= 1 && widget.size <= 6){
                        return true;
                    }
                }
            }
            if(widget.widgetType === "HTML"){
                if(widget.text != undefined && widget.text.length != 2){
                    return true;
                }
            }
            if(widget.widgetType === "IMAGE"){
                if(widget.url != undefined){
                    return true;
                }
            }
            if(widget.widgetType === "YOUTUBE"){
                if(widget.url != undefined){
                    return true;
                }
            }
            if(widget.widgetType === "TEXT"){
                return true;
            }
            return false;
        }

        /**
         * returns an error message for each widget if mandatory fields are missing
         * @param widget
         * @returns {*}
         */
        function getWidgetEditErrorMessage(widget) {
            if(widget.widgetType === "HEADER"){
                return "Text and size [1-6] are required fields.";
            }
            if(widget.widgetType === "HTML"){
                return "Text is a required field.";
            }
            if(widget.widgetType === "IMAGE"){
                return "URL is a required field.";
            }
            if(widget.widgetType === "YOUTUBE"){
                return "URL is a required field.";
            }
        }


        /**
         * used when (left-chevron) os clicked from widget edit page
         * checks if the current widget has all necessary items while creating
         * if not, it deletes the current widget
         */
        function checkIsWidgetIsValid() {
            if(canUpdateWidget(vm.widget)){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }else{
                deleteWidget();
            }

        }

    }
})();
