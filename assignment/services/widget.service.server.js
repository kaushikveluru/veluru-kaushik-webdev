module.exports = function(app){
    var widgets=[
        { "_id": "123", "widgetType": "HEADER", "pageId": "543", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "543", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "543", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>"}
    ]

    var mime = require('mime');
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });


    app.post("/api/widget/:pageId/widget", createWidget);
    app.get("/api/widget/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget", sortWidgets);


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
        widgets.push(widget);
        res.send(widgets);
    }

    function findAllWidgetsForPage(req,res){
        var pid = req.params.pageId;
        var result = [];
        for(var wg in widgets) {

            if(widgets[wg].pageId == pid) {
                result.push(widgets[wg]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req,res){
        var wgid = req.params.widgetId;
        var wg = widgets.filter(function(widget){
            return widget._id === wgid;
        });
        if(wg.length == 1)
            res.send(wg[0]);
        else
            res.send('0');


        var wgid = req.params.widgetId;
        var widgetsList=[];
        for(var wg in widgets){
            if(widgets[wg]._id == wgid){
                widgetsList.push(widgets[wg])
            }
        }
        if(widgetsList.length == 1){
            res.send(widgetsList[0]);

        }
        else{
            res.send('0');
        }
    }

    function updateWidget(req,res){
        var widget = req.body;
        var wgid = req.params.widgetId;
        for(var wg in widgets) {
            if(widgets[wg]._id === wgid) {
                widgets[wg] = widget;
            }
        }
        res.send(200);
    }

    function deleteWidget(req,res){
        var wgid = req.params.widgetId;
        for(var wg in widgets) {
            if(widgets[wg]._id === wgid) {
                widgets.splice(wg, 1);
            }
        }
        res.send('0');
    }

}
