
module.exports = function () {

    var mongoose = require('mongoose');
    // var websites = require('../website/website.schema.server.js')();

    /**
     * Implementation of a Mongoose User Schema
     */
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        google: {
            id: String,
            token: String,
            email: String
        },
        facebook:{
            id: String,
            token: String
        },
        email: String,
        phone: String,
        role: {type: String, enum:["ADMIN", "STUDENT", "FACULTY"], default: "STUDENT"},
        websites: {type:[mongoose.Schema.Types.ObjectId], default: []},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "user"});

    return UserSchema;
};