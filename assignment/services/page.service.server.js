module.exports = function(app,model){


    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req,res){
        var page = req.body;
        model.pageModel
            .createPage(req.params.websiteId, page)
            .then(function (page) {
                res.json(page);
            });
    }
    function findAllPagesForWebsite(req,res){
        model.pageModel
            .findAllPagesForWebsite(req.params.websiteId)
            .then(function(website){
                res.json(website.pages);
            });
    }

    function findPageById(req,res){

        model
            .pageModel
            .findPageById(req.params.pageId)
            .then(
                function (page) {
                    if(page) {
                        res.send(page);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

    function updatePage(req,res){
        var page = req.body;
        model
            .pageModel
            .updatePage(req.params.pageId, page)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req,res){
        model
            .pageModel
            .deletePage(req.params.pageId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

}
