


var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);



    var api = {
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        createUser : createUser,
        deleteUserById: deleteUserById,
        findUserById: findUserById,
        findAllUsers :findAllUsers,
        findUserByUsername: findUserByUsername,

        addfollowers : addfollowers,
        getUsersIFollow : getUsersIFollow,
        deleteUsersIFollow : deleteUsersIFollow,
        userFollowedby : userFollowedby,
        getMyFollowers : getMyFollowers,
        deleteMyFollowers : deleteMyFollowers,
        findUserByFacebookId: findUserByFacebookId

    };
    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        UserModel.findOne(
            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function updateUser(userId, user){

        delete user._id;
        return UserModel.update({_id: userId}, {$set: user});

    }

    function createUser(user){
        return UserModel.create(user);
    }

    function findAllUsers(){

        return UserModel.find();
    }

    function deleteUserById(userId){

        return UserModel.remove({_id: userId});

    }

    function findUserById(userId){

        return UserModel.findById(userId);

    }

    function findUserByUsername(username) {
        return UserModel.findOne({"username": username});
    }





    function addfollowers(userid,username){

        return UserModel.findById(userid)
            .then(function(user){
                user.follows.push(username);
                return user.save();
            });
    }


    function getUsersIFollow(userId){

        return UserModel.findById(userId).select("follows");
    }

    function deleteUsersIFollow(userId,username){

        console.log(username);
        return UserModel.update(
            { '_id' : userId},
            { '$pull' : { 'follows': { '$in': [username] }}}
        );

    }

    function userFollowedby(username,currUser){

        return UserModel.findOne(
            {username: username})
            .then(function (user) {
                user.followedBy.push(currUser);
                return user.save();
            })
    }

    function getMyFollowers(userId){
        return UserModel.findById(userId).select("followedBy");
    }

    function deleteMyFollowers(userId,username){

        return UserModel.update(
            { '_id' : userId},
            { '$pull' : { 'followedBy': { '$in': [username] }}}
        );
    }



}
