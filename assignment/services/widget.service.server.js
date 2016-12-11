module.exports = function(app,model){

    app.post("/api/widget/:pageId/widget", createWidget);
    app.get("/api/widget/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);



    function sortWidgets(req, res){
        var pid = req.params.pageId;
        var result = [];
        for(var wg in widgets) {
            if(widgets[wg].pageId === pid) {
                result.push(widgets[wg]);
            }
        }
        var initial = req.query.initial;
        var final = req.query.final;
        var temp = result[initial];
        result.splice(initial, 1);
        result.splice(final, 0, temp);
        res.send(result);
    }


    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var widget = {};
        widget._id = parseInt(widgetId);
        widget.widgetType = "image";
        widget.pageId = parseInt(pageId);
        widget.name = req.body.name;
        widget.text = req.body.text;
        widget.width = width+'%';
        widget.url =  "/uploads/" + filename;
        widgets.push(widget);
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }

    function createWidget(req,res){
        var widget = req.body;
        model.widgetModel
            .createWidget(res == null?req.body.pageId:req.params.pageId, widget)
            .then(function(widget){
                res.json(widget);
            });
    }

    function findAllWidgetsForPage(req,res){
        model.widgetModel
            .findAllWidgetsForPage(req.params.pageId)
            .then(function(page){
                res.json(page.widgets);
            });
    }

    function findWidgetById(req,res){
        model
            .widgetModel
            .findWidgetById(req.params.widgetId)
            .then(
                function (widget) {
                    if(widget) {
                        res.send(widget);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWidget(req,res){
        var widget = req.body;
        model
            .widgetModel
            .updateWidget(req.params.widgetId, widget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req,res){
        model
            .widgetModel
            .deleteWidget(req.params.widgetId)
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
