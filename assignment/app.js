module.exports = function(app,db,mongoose) {
    var model = require("./models/models.server.js")(db,mongoose);
    require("./services/user.service.server.js")(app,model);
    require("./services/website.service.server.js")(app,model);
    require("./services/page.service.server.js")(app,model);
    require("./services/widget.service.server.js")(app,model);
};