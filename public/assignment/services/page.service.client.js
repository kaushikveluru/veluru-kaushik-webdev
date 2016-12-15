
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById:findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        /**
         * creates a new page
         * @param websiteId
         * @param page
         * @returns {*}
         */
        function createPage(websiteId, page) {
            var url = '/api/website/'+websiteId+'/page';
            return $http.post(url, page);
        }

        /**
         * finds pages by websiteId
         * @param websiteId
         * @returns {Array}
         */
        function findPageByWebsiteId(websiteId) {
            var url = '/api/website/'+websiteId+'/page';
            return $http.get(url);
        }

        /**
         * finds page by pageId
         * @param pageId
         * @returns {*}
         */
        function findPageById(pageId) {
            var url = '/api/page/'+pageId;
            return $http.get(url);
        }

        /**
         * updates a the given page
         * @param pageId
         * @param page
         * @returns {*}
         */
        function updatePage(pageId, page) {
            var url = '/api/page/'+pageId;
            return $http.put(url, page);
        }

        /**
         * deletes a given page
         * @param pageId
         */
        function deletePage(pageId) {
            var url = '/api/page/'+pageId;
            return $http.delete(url);
        }
    }
})();

