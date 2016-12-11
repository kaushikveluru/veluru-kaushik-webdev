(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http)
    {
        var api = {
            "createUser":createUser,
            "findUserById":findUserById,
            "findUserByCredentials":findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };

        return api;

        function createUser(user){
            console.log("http post to create user")
            return $http.post("/api/user",user);
        }

        function findUserById(userId){
            console.log("finding user for user id at client side: "+userId)
            var url = "/api/user/"+userId;
            return $http.get(url);
        }


        function findUserByCredentials(username,password){

            var url = "/api/user?username="+username+"&password="+password;
            console.log("url crated: "+url)
            return $http.get(url);
        }

        function updateUser(userId, user){

            var url = "/api/user/" + user._id;
            $http.put(url, user);
        }

        function deleteUser(userId){
            var url = "/api/user/" + uid;
            return $http.delete(url);

        }

    }


})();