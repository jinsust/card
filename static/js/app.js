'use strict';

var cardApp = angular.module("card", ['ngTable', 'ngResource', 'ui.router']);
//
//cardApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//  $routeProvider.
//      when('/', {templateUrl: 'templates/intro.html',   controller: 'IntroCtrl', publicAccess: true}).
//      when('/index', {templateUrl: 'templates/intro.html',   controller: 'IntroCtrl', publicAccess: true}).
//      when('/buy', {templateUrl: 'templates/buy_card.html', controller: 'BuyCtrl'}).
//      when('/sell', {templateUrl: 'templates/sell_card.html', controller: 'SellCtrl'}).
//      when('/sell2', {templateUrl: 'templates/sell_card_step2.html', controller: 'Sell2Ctrl'}).
//      when('/sell3', {templateUrl: 'templates/sell_card_step3.html', controller: 'Sell3Ctrl'}).
//      when('/login', {templateUrl: 'templates/login.html', controller: 'LoginCtrl'}).
//      when('/cart', {templateUrl: 'templates/cart.html', controller: 'CartCtrl'}).
//      when('/help', {templateUrl: 'templates/about.html', controller: 'AboutCtrl'}).
//      otherwise({redirectTo: '/'});
//  $locationProvider.html5Mode(true);
//}]);

cardApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('index', {
            url: "/intro",
            templateUrl: "templates/intro.html",
            controller: "IntroCtrl"
        })
        .state('buy', {
            url: "/buy",
            templateUrl: "templates/buy_card.html",
            controller: "BuyCtrl"
        })
        .state('sell', {
            url: "/sell",
            templateUrl: "templates/sell_card.html",
            controller: "SellCtrl"
        })
        .state('sell.step2', {
            url: "/sell_step2",
            templateUrl: "templates/sell_card2.html",
            controller: "Sell2Ctrl"
        })
        .state('sell.step3', {
            url: "/sell_step3",
            templateUrl: "templates/sell_card3.html",
            controller: "Sell3Ctrl"
        })
        .state('login', {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "LoginCtrl"
        })
        .state('cart', {
            url: "/cart",
            templateUrl: "templates/cart.html",
            controller: "CartCtrl"
        })
        .state('about', {
            url: "/about",
            templateUrl: "templates/about.html"
        });
    $urlRouterProvider.when("", "/intro");
})
