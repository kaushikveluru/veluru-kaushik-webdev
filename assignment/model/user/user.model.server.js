module.exports = function () {

    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        updateUserWebsite: updateUserWebsite
    };
    return api;

    /**
     * Creates a new user instance
     * @param user
     * @returns {user}
     */
    function createUser(user) {
        return UserModel.create(user);
    }

    /**
     * Retrieves a user instance whose _id is equal to parameter userId
     * @param userId
     * @returns {*}
     */
    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    /**
     * Retrieves a user instance whose username is equal to parameter username
     * @param username
     * @returns {*|Query}
     */
    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        });
    }

    /**
     * Retrieves a user instance whose username and password are equal to parameters userId and password
     * @param username
     * @param password
     * @returns {*|Query}
     */
    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    /**
     * Updates user instance whose _id is equal to parameter userId
     * @param userId
     * @param user
     * @returns {*|Query}
     */
    function updateUser(userId, user) {
        return UserModel.update({
            _id:userId
        },{
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        });
    }

    /**
     * Removes user instance whose _id is equal to parameter userId
     * @param userId
     * @returns {Promise}
     */
    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    /**
     * Adds a new website to the array of websites for a given user
     * @param user
     * @param website
     * @returns {Query|*}
     */
    function updateUserWebsite(user, website) {
        user.websites.push(website._id);
        return UserModel.update({
            _id:user._id
        }, {
            websites: user.websites
        });
    }
};