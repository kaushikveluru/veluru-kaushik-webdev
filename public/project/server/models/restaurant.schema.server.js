
module.exports = function(mongoose) {


    var RestaurantSchema = mongoose.Schema({

        restaurantId: String,
        restaurantName: String

    }, {collection: 'project.restaurant'});
    return RestaurantSchema;
};
