// Config variables
var firebaseUrl = "https://f4a-fire-signin.firebaseio.com/";  // change this url with your own.


// END Config variables



var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    'markdown',
    'foundation.init',
    'foundation.init.state',
    'foundation.common.services',
    'foundation.common.directives',
    'foundation.common.animations',
    'foundation.accordion',
    'foundation.actionsheet',
    'foundation.interchange',
    'foundation.modal',
    'foundation.notification',
    'foundation.offcanvas',
    'foundation.panel',
    'foundation.popup',
    'foundation.tabs',
    'foundation.iconic',
    'firebase'
  ])
  .config(['$FoundationStateProvider', '$urlRouterProvider', '$locationProvider', function(FoundationStateProvider, $urlProvider, $locationProvider) {

    $urlProvider.otherwise('/');

    FoundationStateProvider.registerDynamicRoutes();

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }])

  .run(['FoundationInit', '$rootScope', '$state', '$stateParams', function(foundationInit, $rootScope, $state, $stateParams) {
    foundationInit.init();

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);




/* --- controllers --- */

// var app = angular.module("fireApp", ["firebase"]);

app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase(firebaseUrl);
  return $firebaseAuth(ref);
}]);


app.controller("FireCtrl", function($scope, $firebase, $firebaseAuth) {
  var ref = new Firebase(firebaseUrl+"/data");
  var sync = $firebase(ref);
  var auth = $firebaseAuth(ref);



  $scope.auth = auth;
  $scope.user = $scope.auth.$getAuth();

  // download the data into a local object
  var syncObject = sync.$asObject();

  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  // syncObject.$bindTo($scope, "data");
  $scope.messages = sync.$asArray();
  $scope.addMessage = function(text) {
    $scope.messages.$add({text: text});
  }

  // EMAIL AUTH
    // var firebaseObj = new Firebase(firebaseUrl);
    // var loginObj = $firebaseSimpleLogin(firebaseObj);
    // bind
      // $scope.SignIn = function($scope) {
      //     var username = $scope.user.email;
      //     var password = $scope.user.password;
      //     // Auth Logic will be here
      //       loginObj.$login('password', {
      //           email: username,
      //           password: password
      //       })
      //       .then(function(user) {
      //           //Success callback
      //           console.log('Authentication successful');
      //       }, function(error) {
      //           //Failure callback
      //           console.log('Authentication failure');
      //       });
      // }


    // Create email auth
      // var isNewUser = true;
      // ref.onAuth("email",function(authData) {
      //   if (authData && isNewUser) {
      //     // save the user's profile into Firebase so we can list users,
      //     // use them in Security and Firebase Rules, and show profiles
      //     ref.child("users").child(authData.uid).set(authData);
      //   }
      // });

    //  Password-Reset
      // ref.resetPassword({
      //     email : "bobtony@firebase.com"
      //   }, function(error) {
      //   if (error === null) {
      //     console.log("Password reset email sent successfully");
      //   } else {
      //     console.log("Error sending password reset email:", error);
      //   }
      // })


});