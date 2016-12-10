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

    }
    function findAllPagesForWebsite(req,res){

    }

    function findPageById(req,res){

    }

    function updatePage(req,res){

    }

    function deletePage(req,res){

    }

}
