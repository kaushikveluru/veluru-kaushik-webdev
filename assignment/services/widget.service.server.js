
module.exports = function (app, model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
    var fs = require('fs');

    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findAllWidgetsForPage);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.delete('/api/widget/:wgid', deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", updateWidgetIndices);


    /**
     * creates a new widget for the given pageId
     * @param req
     * @param res
     */
    function createWidget(req, res) {
        var pageId = req.params.pid;
        var widget = req.body;
        //create widget
        // find page by ID
        // add widget to the widgets array of page
        model.widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    model.pageModel
                        .findPageById(pageId)
                        .then(
                            function (page) {
                                model.pageModel
                                    .updatePageWidgets(page, widget)
                                    .then(
                                        function (status) {
                                            res.send(widget);
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
     * finds widgets for a given pageId
     * @param req
     * @param res
     */
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds a widget by widgetId
     * @param req
     * @param res
     */
    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    if(widget){
                        res.send(widget);
                    }else{
                        res.send('0');
                    }
                },
                function (error) {

                }
            );
    }

    /**
     * updates the given widget
     * @param req
     * @param res
     */
    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        model.widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * deletes the given widget
     * @param req
     * @param res
     */
    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    model.widgetModel
                        .deleteWidget(widgetId)
                        .then(
                            function () {
                                model.pageModel
                                    .findPageById(widget._page)
                                    .then(
                                        function (page) {
                                            model.pageModel
                                                .deleteWidgetFromPage(page, widgetId)
                                                .then(
                                                    function (status) {
                                                        res.sendStatus(200);
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
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * uploads an image
     * @param req
     * @param res
     */
    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId        = req.body.websiteId;
        var pageId        = req.body.pageId;
        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        filename += originalname;
        fs.renameSync(path, destination + "/" + filename);
        var url = '/assignment/uploads/'+filename;

        model.widgetModel
            .uploadImage(widgetId, originalname, width, url)
            .then(
                function (status) {
                    res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }


    /**
     * updates the index of the widget in the array to maintain the order of widgets
     * while sorting them
     * @param req
     * @param res
     */
    function updateWidgetIndices(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;

        model.pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    model.pageModel
                        .reorderWidgetsForPage(page, initial, final)
                        .then(
                            function (status) {
                                res.sendStatus(200);
                            },
                            function (error) {
                                res.sendStatus(400);
                            }
                        );
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }
};