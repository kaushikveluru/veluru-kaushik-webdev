(function(){
    angular
        .module("WebAppMaker")
        .factory("WebSiteService",WebSiteService);

    function WebSiteService(UserService){
        var websites=[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ]

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
            var index = websites.length+1;
            website._id=index+"";
            websites.push(website);

        }

        function findWebsitesByUser(userId){
            var websitesResult=[];

            for(var u in websites)
            {
                if(websites[u].developerId === userId)
                {
                    websitesResult.push(websites[u]);
                }
            }
            return websitesResult;
        }



        function findWebsiteById(websiteId){
            for(var w in websites)
            {
                if(websites[w]._id === websiteId)
                {
                    return websites[w];
                }

            }
            return null;
        }

        function updateWebsite(websiteId,website){

            for(var w in websites)
            {
                if(websites[w]._id === websiteId)
                {
                    websites[w] = website;
                }
            }
        }

        function deleteWebsite(websiteId){
            for(var w in websites)
            {
                if(websites[w]._id === websiteId)
                {
                    websites.splice(w,1);
                }
            }
        }
    }
})();