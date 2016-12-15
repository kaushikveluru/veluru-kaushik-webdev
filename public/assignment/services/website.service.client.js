
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {

            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };

        return api;

        /**
         * creates a new website
         * @param userId
         * @param website
         * @returns {*}
         */
        function createWebsite(userId, website) {
            var url = '/api/user/'+userId+'/website';
            return $http.post(url, website);
        }

        /**
         * finds websites for a given user
         * @param userId
         * @returns {Array}
         */
        function findWebsitesByUser(userId) {
            var url = '/api/user/'+userId+'/website';
            return $http.get(url);
        }

        /**
         * finds a website by given websiteId, returns null if not found
         * @param websiteId
         * @returns {*}
         */
        function findWebsiteById(websiteId) {
            var url = '/api/website/'+websiteId;
            return $http.get(url);
        }

        /**
         * updates a given website
         * @param websiteId
         * @param website
         * @returns {*}
         */
        function updateWebsite(websiteId, website) {
            var url = '/api/website/'+websiteId;
            return $http.put(url, website);
        }

        /**
         * deletes a given website
         * @param websiteId
         */
        function deleteWebsite(websiteId) {
            var url = '/api/website/'+websiteId;
            return $http.delete(url);
        }
    }
})();
