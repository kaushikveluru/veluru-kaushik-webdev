module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        findUserByFacebookId:findUserByFacebookId,
        findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }

    function findUserByFacebookId(facebookId){
        return UserModel.findOne({'facebookId':facebookId})
    }

    function findUserByUsername(username){
        return UserModel.findOne({'username':username})
    }

    function findWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate('websites')
            .exec();
    }

    function deleteUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    function updateUser(userId, user) {
        return UserModel
            .update( {_id: userId}, user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function createUser(user) {
        return UserModel.create(user);
    }
};