angular.module('bizapp', ['ionic'])
  .run(function($ionicPlatform, $http) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
   

    // if (typeof String.prototype.startsWith != 'function') {
    //   String.prototype.startsWith = function (str){
    //       return this.indexOf(str) == 0;
    //   };
    // }

    // var URL_AUTH = 'https://start.exactonline.%s/api/oauth2/auth';
    // var URL_TOKEN = 'https://start.exactonline.%s/api/oauth2/token';
    // var clientId = '{b81cc4de-d192-400e-bcb4-09254394c52a}';
    // var clientSecret = 'n3G7KAhcv8OH';
    // var requestToken;
    // var ref = window.open('https://start.exactonline.nl/api/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&force_login=1&response_type=code','_blank', 'location=no');
    // if(ref){
    //    ref.addEventListener('loadstart', function(event) { 
    //     if((event.url).startsWith("http://localhost/callback")) {
    //         requestToken = (event.url).split("code=")[1];
    //         ref.close();
    //     }
    //   })
    // }
    
    // $http({method: "post", url: URL_TOKEN, data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
    // .success(function(data) {
    //     accessToken = data.access_token;
    // })
    // .error(function(data, status) {
    //     console.log("ERROR: " + data);
    // });


  })

 

 

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "login/login.html",
    controller: 'loginCtrl'
  })

  .state('forgotpassword', {
    url: "/forgot-password",
    templateUrl: "login/forgot-password.html"
  })

  .state('sales', {
    url: '/sales',
    templateUrl: "sales/sales-invoices.html",
    controller: 'SalesCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'home/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.notifications', {
    url: '/notifications',
    views: {
      'tab-notifications': {
        templateUrl: 'notifications/tab-notifications.html',
        controller: 'NotificationCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'settings/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');
})

 