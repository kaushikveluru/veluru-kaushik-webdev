
module.exports = function (app, model) {

    var passport      = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);


    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function localStrategy(username, password, done) {
        model.userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    /**
     * creates a new user
     * @param req
     * @param res
     */
    function createUser(req, res) {
        var user = req.body;
        // user._id = (new Date()).getTime().toString();
        // users.push(user);
        model.userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds an existing user by username or credentials
     * @param req
     * @param res
     */
    function findUser(req, res) {
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req, res);
        } else if(query.username){
            findUserByUsername(req, res);
        }
    }

    /**
     * finds an existing user by username
     * returns '0' if not found
     * @param req
     * @param res
     */
    function findUserByUsername(req, res) {
        var username = req.query.username;
        model.userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
                    }else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds an existing user by credentials
     * returns '0' if not found
     * @param req
     * @param res
     */
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
                    }else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * finds an existing user by userId
     * returns '0' if not found
     * @param req
     * @param res
     */
    function findUserById(req, res) {
        var userId = req.params.uid;
        model.userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
                    } else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * updates a given user
     * @param req
     * @param res
     */
    function updateUser(req, res) {
        var userId = req.params.uid;
        var user = req.body;
        model.userModel
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    /**
     * deletes the currently logged in user
     * @param req
     * @param res
     */
    function deleteUser(req, res) {
        var userId = req.params.uid;
        model.userModel
            .deleteUser(userId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }


};