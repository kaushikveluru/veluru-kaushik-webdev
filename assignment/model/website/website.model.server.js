
module.exports = function () {

    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server.js')();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        updateWebsitePages: updateWebsitePages
    };
    return api;

    /**
     * Creates a new website instance for user whose _id is userId
     * @param userId
     * @param website
     * @returns {website}
     */
    function createWebsite(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }

    /**
     * Retrieves all website instances for user whose  _id is userId
     * @param userId
     * @returns {*|{}|Query}
     */
    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find(
            {
                _user: userId
            }
        );
    }

    /**
     * Retrieves single website instance whose _id is websiteId
     * @param websiteId
     * @returns {*}
     */
    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    /**
     * Updates website instance whose _id is websiteId
     * @param websiteId
     * @param website
     * @returns {Query|*}
     */
    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({
            _id: websiteId
        }, {
            name: website.name,
            description: website.description
        });
    }

    /**
     * Removes website instance whose _id is websiteId
     * @param websiteId
     * @returns {Promise}
     */
    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId});
    }

    /**
     * Adds a new page to the array of pages for a given website
     * @param website
     * @param page
     * @returns {Query|*}
     */
    function updateWebsitePages(website, page) {
        website.pages.push(page._id);
        return WebsiteModel.update({
            _id: website._id
        }, {
            pages: website.pages
        });
    }
};
