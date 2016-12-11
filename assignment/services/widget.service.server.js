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

    app.post("/api/widget/:pageId/widget", createWidget);
    app.get("/api/widget/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req,res){
        var widget = req.body;
        widgets.push(widget);
        res.send(widgets);
    }

    function findAllWidgetsForPage(req,res){
        var pid = parseInt(req.params.pageId);
        var result = [];
        for(var wg in widgets) {
            if(widgets[wg].pageId === pid) {
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
