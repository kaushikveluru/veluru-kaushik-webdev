
module.exports=function(app){
    var websites=[
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ]

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req,res){
        var website = req.body;
        var userId = req.params.userId;
        website._id = websites.length+1;
        website.developerId = userId;
        websites.push(website);
        res.send(websites);
    }
    function findAllWebsitesForUser(req,res){
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {

            if(websites[w].developerId == uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }
    function findWebsiteById(req,res){
        var wid = req.params.websiteId;
        var websitesList=[];
        for(var w in websites){
            if(websites[w]._id == wid){
                websitesList.push(websites[w])
            }
        }
        if(websitesList.length == 1){
            console.log("website found on server: "+websitesList[0].name)
            res.send(websitesList[0]);

        }
        else{
            console.log("no website found with wid: "+wid)
            res.send('0');
        }

    }
    function updateWebsite(req,res){

        var website = req.body;
        var wid = req.params.websiteId;
        console.log("updating the website:"+wid)
        for(var w in websites) {
            if(websites[w]._id == wid) {
                websites[w] = website;
            }
        }
        res.send(200);
    }
    function deleteWebsite(req,res){
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id == wid) {
                websites.splice(w, 1);
            }
        }
        res.send('0');
    }
}
