
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,$location, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.updateProfile= updateProfile;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            UserService
                // .findUserByID(userId)
                .findCurrentUser()
                .success(function (user) {
                    if(user != '0'){
                        vm.user = user;
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        init();

        /**
         * updates the user profile
         * @param user
         */
        function updateProfile(user) {
            UserService
                .updateUser(user._id, user)
                .success(function (user) {
                    if(user != '0'){
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (error) {

                });

        }

        /**
         * deletes the currently logged in user
         */
        function deleteUser() {
            UserService
                .deleteUser(userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function (error) {
                    
                });
        }
        
        
        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });
        }
    }
})();