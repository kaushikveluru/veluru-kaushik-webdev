(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService)

    function PageService()
    {
        var pages=[
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage":"createPage",
            "findPageByWebsiteId":"findPageByWebsiteId",
            "findPageById":"findPageById",
            "updatePage":"updatePage",
            "deletePage":"deletePage"
        };

        return api;

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId){
            for(var p in pages)
            {
                if(pages[p].websiteId === websiteId)
                {
                    return pages[p]
                }

            }
            return null;
        }

        function findPageById(pageId){
            for(var p in pages)
            {
                if(pages[p]._Id === pageId)
                {
                    return pages[p]
                }

            }
            return null;
        }

        function updatePage(pageId,page){
            for(var p in pages)
            {
                if(pages[p]._Id === pageId)
                {
                     pages[p] = page;
                }

            }

        }

        function deletePage(pageId){
            for(var p in pages)
            {
                if(pages[p]._Id === pageId)
                {
                    pages[p].remove();
                }

            }

        }
    }

})();