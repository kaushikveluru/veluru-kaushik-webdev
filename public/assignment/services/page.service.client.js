(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService)

    function PageService()
    {
        var pages=[
            { "_id": "321", "name": "Page1", "websiteId": "678", "description": "title of page1" },
            { "_id": "432", "name": "Page2", "websiteId": "678", "description": "title of page2" },
            { "_id": "543", "name": "Page3", "websiteId": "567", "description": "title of page3" },
            { "_id": "456", "name": "Page4", "websiteId": "567", "description": "title of page4" }
        ];

        var api = {
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };

        return api;

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            var index = pages.length+1;
            page._id=index+"";
            pages.push(page);

        }

        function findPageByWebsiteId(websiteId){
            var pagesResult=[];

            for(var p in pages)
            {
                if(pages[p].websiteId === websiteId)
                {
                    pagesResult.push(pages[p]);
                }

            }
            return pagesResult;
        }

        function findPageById(pageId){

            for(var p in pages)
            {

                if(pages[p]._id === pageId)
                {
                    return pages[p];
                }

            }
            return null;
        }

        function updatePage(pageId,page){

            for(var p in pages)
            {
                if(pages[p]._id === pageId)
                {

                    console.log("page udpated ")
                    console.log("name updated from : "+pages[p].name +" to : "+page.name)
                    pages[p] = page;
                    return pages[p];
                }

            }


        }

        function deletePage(pageId){
            for(var p in pages)
            {
                if(pages[p]._id === pageId)
                {
                    pages.splice(p,1);
                }

            }
            return pages

        }
    }

})();