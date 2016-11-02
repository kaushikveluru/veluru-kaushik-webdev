(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService()
    {
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice.wonder@gmail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob.marley@gmail.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly.garcia@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose.annunzi@gmail.com" }
        ];


        var api = {
            "createUser":createUser,
            "findUserById":findUserById,
            "findUserByCredentials":findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };

        return api;

        function createUser(user){

           var index = users.length+1;
            user._id=index+"";
            users.push(user)
            
        }

        function findUserById(userId){
            for(var u in users)
            {
                if(users[u]._id === userId)
                {
                    return users[u]
                }
            }
            return null;
        }


        function findUserByCredentials(username,password){
            for(var u in users)
            {
                if(users[u].username === username && users[u].password === password)
                {
                    return users[u]
                }
            }
            return null;
        }

        function updateUser(userId, user){

            for(var u in users)
            {
                if(users[u]._id === userId)
                {
                    users[u] = user;
                }
            }
        }

        function deleteUser(userId){
            for(var u in users)
            {
                if(users[u]._id === userId)
                {
                    users[u].remove();
                }
            }

        }

    }


})();