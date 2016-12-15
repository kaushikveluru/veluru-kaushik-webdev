
module.exports = function () {

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        updatePageWidgets: updatePageWidgets,
        deleteWidgetFromPage: deleteWidgetFromPage,
        reorderWidgetsForPage: reorderWidgetsForPage,
    };
    return api;

    /**
     * Creates a new page instance for website whose _id is websiteId
     * @param websiteId
     * @param page
     * @returns {page}
     */
    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }

    /**
     * Retrieves all page instances for website whose  _id is websiteId
     * @param websiteId
     * @returns {*|{}|Query}
     */
    function findAllPagesForWebsite(websiteId) {
        return PageModel.find(
            {
                _website: websiteId
            }
        );
    }

    /**
     * Retrieves single page instance whose _id is pageId
     * @param pageId
     * @returns {*}
     */
    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    /**
     * Updates page instance whose _id is pageId
     * @param pageId
     * @param page
     * @returns {*|Query}
     */
    function updatePage(pageId, page) {
        return PageModel.update({
            _id: pageId
        },{
            name: page.name,
            title: page.title,
            description: page.description
        });
    }

    /**
     * Removes page instance whose _id is pageId
     * @param pageId
     * @returns {Promise}
     */
    function deletePage(pageId) {
        return PageModel.remove({_id: pageId});
    }

    function updatePageWidgets(page, widget) {
        page.widgets.push(widget._id);
        return PageModel.update({
            _id: page._id
        }, {
            widgets: page.widgets
        });
    }

    function deleteWidgetFromPage(page, widgetId) {
        page.widgets.pull(widgetId);
        return PageModel.update({
            _id: page._id
        },{
            widgets: page.widgets
        });
    }

    function reorderWidgetsForPage(page, start, end) {
        page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
        return PageModel.update({
            _id: page._id
        }, {
            widgets: page.widgets
        });
    }

};