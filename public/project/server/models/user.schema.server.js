
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        follows : [String],
        followedBy : [String],
        email: String,
        roles: [String]

        // collection name to 'user'
    }, {collection: 'project.user'});
    return UserSchema;
};