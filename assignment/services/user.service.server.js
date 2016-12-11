
module.exports = function(app){

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice.wonder@gmail.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob.marley@gmail.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly.garcia@gmail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose.annunzi@gmail.com" }
    ];
    app.get("/api/",function (req,res) {
        res.send({mess: "runinng"});
    });
    app.post("/api/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/:uid",findUserById);
    app.put("/api/user/:uid",updateUser);
    app.delete("/api/user/:uid",deleteUser);


    function findUser(req,res){

        var query = req.query;
        var params = req.params;
        if(query.username && query.password){
            console.log("finding user by credentials")
            findUserByCredentials(req,res)
        }
        else if(query.username){
            findUserByUsername(req,res);
        }

    }


    function createUser(req,res){
        var user = req.body;
        user._id = users.length+1;
        user.firstName = user.username;
        user.lastName = user.username;
        user.email = user.username+"@gmail.com";
        users.push(user);
        res.send(user);
    }

    function findUserByUsername(req,res){
        var username = req.query.username;
        for(var u in users){
            if(users[u].username == username){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users){
            if(users[u].username == username && users[u].password == password){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req,res){
        var userId = req.params.uid;
        for(var u in users){
            if(users[u]._id === userId){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function updateUser(req,res){
        var user = req.body;
        var userId = req.params.uid;
        for(var u in users){
            if(users[u]._id == userId){
                users[u] = user;
                return;
            }
        }
        res.send(200);
    }

    function deleteUser(req,res){
        var userId = req.params.uid;
        for(var u in users){
            if(users[u]._id === userId){
                users.splice(u,1);
                return;
            }
        }
        res.send(200);
    }
}