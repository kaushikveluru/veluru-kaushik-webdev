module.exports = function(app){
    var pages=[
        { "_id": "321", "name": "Page1", "websiteId": "678", "description": "title of page1" },
        { "_id": "432", "name": "Page2", "websiteId": "678", "description": "title of page2" },
        { "_id": "543", "name": "Page3", "websiteId": "567", "description": "title of page3" },
        { "_id": "456", "name": "Page4", "websiteId": "567", "description": "title of page4" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req,res){
        var page = req.body;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.send(pages);
    }
    function findAllPagesForWebsite(req,res){
        var wid = req.params.websiteId;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId == wid) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req,res){
        var pid = req.params.pageId;
        var pg = pages.filter(function(page){
            return page._id === pid;
        });
        if(pg.length == 1)
            res.send(pg[0]);
        else
            res.send('0');
    }

    function updatePage(req,res){
        var page = req.body;
        var pid = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages[p] = page;
            }
        }
        res.send(200);
    }

    function deletePage(req,res){
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
            }
        }
        res.send('0');
    }

}
