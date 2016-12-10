
module.exports = function(app){

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice.wonder@gmail.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob.marley@gmail.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly.garcia@gmail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose.annunzi@gmail.com" }
    ];

    app.post('/api/user',createUser);
    app.get('/api/user?username=username',findUserByUsername);
    app.get('/api/user?username=username&password=password',findUserByCredentials);
    app.get('/api/user/:uid',findUserById);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',deleteUser);



    function createUser(req,res){

    }

    function findUserByUsername(req,res){

    }

    function findUserByCredentials(req,res){

    }

    function findUserById(req,res){

    }

    function updateUser(req,res){

    }

    function deleteUser(req,res){
        
    }
}