
module.exports = function (app, model) {

    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);


    /**
     * creates a new website for a given user
     * @param req
     * @param res
     */
    function createWebsite(req, res) {
        var userId = req.params.uid;
        var website = req.body;
        //create website
            // find user by ID
                // add website to the website array of user
        model.websiteModel
            .createWebsite(userId, website)
            .then(
                function (website) {
                    model.userModel
                        .findUserById(userId)
                        .then(
                            function (user) {
                                model.userModel
                                    .updateUserWebsite(user, website)
                                    .then(
                                        function (status) {
                                            res.send(website);
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
     * finds websites for a given user
     * @param req
     * @param res
     */
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        model.websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.send(websites);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds a website by the given websiteId
     * @param req
     * @param res
     */
    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        model.websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    if(website){
                        res.send(website);
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
     * updates a given website
     * @param req
     * @param res
     */
    function updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var website = req.body;
        model.websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (status) {
                    res.send(website);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * deletes the current website
     * @param req
     * @param res
     */
    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        model.websiteModel
            .deleteWebsite(websiteId)
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