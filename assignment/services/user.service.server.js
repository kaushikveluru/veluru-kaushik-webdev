
module.exports = function(app,model){

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;


    app.post("/api/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/:uid",findUserById);
    app.put("/api/user/:uid",updateUser);
    app.delete("/api/user/:uid",deleteUser);




    passport.deserializeUser(deserializeUser);


    passport.serializeUser(serializeUser);

    passport.use(new LocalStrategy(localStrategy));


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }



    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {
        developerModel
            .findDeveloperById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function findUser(req,res){

        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }

    }


    function createUser(req,res){
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req,res){
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (users) {
                    if(users) {
                        res.json(users[0]);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req,res){
        model
            .userModel
            .findUserById(req.params.uid)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateUser(req,res){
        var user = req.body;
        model
            .userModel
            .updateUser(req.params.uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req,res){
        model
            .userModel
            .deleteUser(req.params.uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
}