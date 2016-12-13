
module.exports = function(mongoose) {


    var ReviewSchema = mongoose.Schema({
        userId: String,
        username : String,
        restaurantId: String,
        restaurantName : String,
        reviews: String

    }, {collection: 'project.reviews'});
    return ReviewSchema;
};
