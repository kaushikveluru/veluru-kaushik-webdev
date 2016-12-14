module.exports = function (db,mongoose) {

    var userModel = require("./user/user.model.server")(db,mongoose);
    var websiteModel = require("./website/website.model.server")(db,mongoose);
    var pageModel = require("./page/page.model.server")(db,mongoose);
    var widgetModel = require("./widget/widget.model.server")(db,mongoose);

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};