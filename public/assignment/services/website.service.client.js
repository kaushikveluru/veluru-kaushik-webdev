(function(){
    angular
        .module("WebAppMaker")
        .factory("WebSiteService",WebSiteService);

    function WebSiteService($http){

        var api={
            "createWebsite":createWebsite,
            "findWebsitesByUser":findWebsitesByUser,
            "findWebsiteById":findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite,
            "getAllWebsites":getAllWebsites

        }

        return api;

        function getAllWebsites()
        {
            return websites;
        }

        function createWebsite(userId,website){

            website.developerId = userId;
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);

        }

        function findWebsitesByUser(userId){
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }



        function findWebsiteById(websiteId){
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId,website){

            var url = "/api/website/"+website._id;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId){
            var url = "/api/website/"+websiteId;
            return $http.delete(url);
        }
    }
})();