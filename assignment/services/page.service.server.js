
module.exports = function (app, model) {

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);


    /**
     * creates a new page for the given website
     * @param req
     * @param res
     */
    function createPage(req, res) {
        var websiteId = req.params.wid;
        var page = req.body;
        //create page
        // find website by ID
        // add page to the page array of website
        model.pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    model.websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function (website) {
                                model.websiteModel
                                    .updateWebsitePages(website, page)
                                    .then(
                                        function (status) {
                                            res.send(page);
                                        },
                                        function (error) {
                                            res.sendStatus(400).message(error);
                                        }
                                    );
                            },
                            function (error) {
                                res.sendStatus(400).message(error);
                            }
                        );
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds all pages for a given websiteId
     * @param req
     * @param res
     */
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        model.pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.send(pages);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds a page by pageId
     * @param req
     * @param res
     */
    function findPageById(req, res) {
        var pageId = req.params.pid;
        model.pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    if(page){
                        res.send(page);
                    }else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * updates a given page
     * @param req
     * @param res
     */
    function updatePage(req, res) {
        var pageId = req.params.pid;
        var page = req.body;
        model.pageModel
            .updatePage(pageId, page)
            .then(
                function (status) {
                    res.send(page);
                },
                function (error) {
                   res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * deletes the given page
     * @param req
     * @param res
     */
    function deletePage(req, res) {
        var pageId = req.params.pid;
        model.pageModel
            .deletePage(pageId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }

};