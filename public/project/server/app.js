
module.exports = function(app, db, mongoose){


    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var reviewModel = require("./models/review.model.server.js")(db, mongoose);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);

    var restaurantModel = require("./models/restaurant.model.server.js")(db,mongoose);
    var restaurantService = require("./services/restaurant.service.server.js")(app,restaurantModel,reviewModel)

}
