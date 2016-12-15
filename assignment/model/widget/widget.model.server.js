
module.exports = function () {

    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {

        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        uploadImage: uploadImage

    };
    return api;

    /**
     * Creates new widget instance for parent page whose _id is pageId
     * @param pageId
     * @param widget
     * @returns {widget}
     */
    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.widgetType = widget.widgetType;
        return WidgetModel.create(widget);
    }

    /**
     * Retrieves all widgets for parent page whose _id is pageId
     * @param pageId
     * @returns {*|{}|Query}
     */
    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find(
            {
                _page: pageId
            }
        );
    }

    /**
     * Retrieves widget whose _id is widgetId
     * @param widgetId
     * @returns {*}
     */
    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    /**
     * Updates widget whose _id is widgetId
     * @param widgetId
     * @param widget
     * @returns {*|Query}
     */
    function updateWidget(widgetId, widget) {
        return WidgetModel.update({
            _id: widgetId
        },{
            name: widget.name,
            text: widget.text,
            size: widget.size,
            rows: widget.rows,
            placeholder: widget.placeholder,
            description: widget.description,
            url: widget.url,
            width: widget.width,
            class: widget.class,
            icon: widget.icon,
            deletable: widget.deletable,
            formatted: widget.formatted
        });
    }

    /**
     * Removes widget whose _id is widgetId
     * @param widgetId
     * @returns {Promise}
     */
    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId});
    }

    /**
     * Uploads an image
     * @param widgetId
     * @param originalName
     * @param width
     * @param url
     * @returns {*|Query}
     */
    function uploadImage(widgetId, originalName, width, url) {
        return WidgetModel.update({
            _id: widgetId
        }, {
            name: originalName,
            width: width,
            url: url
        });
    }
};