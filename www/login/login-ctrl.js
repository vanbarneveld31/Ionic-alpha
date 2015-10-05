'use strict';

angular.module('bizapp')
.controller('loginCtrl', function($scope, $state, $http) {
  
  $scope.signIn = function(user) {
	console.log('Sign-In', user);
	$state.go('tab.home');
  }

  $scope.loginToExact = function() {
    $state.go('tab.home');
    var URL_AUTH = 'https://start.exactonline.com/api/oauth2/auth';
    var URL_TOKEN = 'https://start.exactonline.com/api/oauth2/token';
    var GRANT_AUTHORIZATION_CODE = 'authorization_code';
    var GRANT_REFRESH_TOKEN = 'refresh_token';
    var RESPONSE_TYPE_CODE = 'code';
    var CLIENT_ID = '{12cf99a8-cfdb-4e11-a63c-6c97b0a35ea1}';
    var CLIENT_SECRET = 'KoAiKUjiqzqF';
    var REDIRECT_URL = 'http://localhost/callback';
    var DIVISION = '21600';
    var requestToken ='';

    var ref = window.open(URL_AUTH + '?client_id=' + CLIENT_ID + 
                          '&redirect_uri=' + REDIRECT_URL + 
                          '&force_login=1&response_type=' + RESPONSE_TYPE_CODE ,'_blank', 'location=no');
    if(ref){
       ref.addEventListener('loadstart', function(event) { 
        if((event.url).startsWith(REDIRECT_URL)) {
            requestToken = (event.url).split("code=")[1];
            //Logged in
            $state.go('tab.home');
            $http({method: "post", url: URL_TOKEN, data: "client_id=" + CLIENT_ID + 
                                                         "&client_secret=" + CLIENT_SECRET + 
                                                         "&redirect_uri=" + REDIRECT_URL + 
                                                         "&grant_type=authorization_code" + 
                                                         "&code=" + requestToken })
              .success(function(data) {
                $scope.accessToken = data.access_token;
                //Store the token into secure storage
                //$state.go('tab.home');

              })
              .error(function(data, status) {
                  console.log("ERROR: " + data);
              })
            ref.close();
        }
      });
    }

    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (str){
      	console.log('startsWith');
          return this.indexOf(str) == 0;
      };
    }
  };
  
})