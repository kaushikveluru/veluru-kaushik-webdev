
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserByID: findUserByID,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            register: register,
            checkLogin: checkLogin,
            logout: logout,
            findCurrentUser: findCurrentUser,
            checkAdmin: checkAdmin
        };

        return api;

        function createUser(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post('/api/user', user);
        }

        /**
         * finds a user with the given credentials
         * returns null if none found
         * @param username
         * @param password
         * @returns {*}
         */
        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' +password;
            return $http.get(url);
        }

        /**
         * finds a user with given userId
         * @param userId
         * @returns {*}
         */
        function findUserByID(userId) {
            var url = '/api/user/'+userId;
            return $http.get(url);
        }

        /**
         * finds a user with a given username
         * @param username
         * @returns {*}
         */
        function findUserByUserName(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        /**
         * updates a given user
         * @param userId
         * @param user
         * @returns {*}
         */
        function updateUser(userId, user) {
            var url = '/api/user/'+userId;
            return $http.put(url, user);
        }

        /**
         * deletes a given user
         * @param userId
         */
        function deleteUser(userId) {
            var url = '/api/user/'+userId;
            return $http.delete(url);
        }
        
        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }
        
        
        function checkLogin() {
            return $http.post("/api/checkLogin");
        }
        
        function logout() {
            return $http.post("/api/logout");
        }

        function findCurrentUser() {
            var url = '/api/user';
            return $http.get(url);
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }

        function register(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }

    }
})();
