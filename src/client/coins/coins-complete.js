
var app = angular.module('app')
  .directive('coinDirective',[coinDirective])
  .factory('coinFactory', coinFactory)
  .service('coinService', coinService)


function coinDirective() {
    return {
        restrict: 'E',
        templateUrl: '../coins/coins.html',
        controller: CoinController,
        controllerAs: 'ctrl'
    }
}


CoinController.$inject = ['coinService'];

function CoinController(coinService) {
  this.coins = coinService;
  this.add = function(){
    this.coins.add();
  }
  this.deposit = function(i){
    this.coins.deposit(i);
  };
  this.increase = function(i){
    console.log(i)
    this.coins.increase(i)
  }
  this.total = function(){
    return this.coins.total();
  };
  console.log(this)
}

function coinService(coinFactory){
  this.currentId = 0;
  this.coins = [];
  this.deposited = [];
  this.undeposited = [];
  this.add = function(){
      var c = coinFactory();
      c.set(this.currentId);
      this.coins.push(c);
      this.undeposited.push(c);
      this.currentId++;
  }
  this.deposit = function(i){
    var c = this.undeposited.splice(i,1);
    this.deposited.push(c[0]);
  }
  this.increase = function(i){
    this.undeposited[i].increaseAmount()
  }
  this.total = function(){
    var totalAmount = 0;
    for (var i = 0; i < this.deposited.length; i++) {
      totalAmount += this.deposited[i].amount
    }
    return totalAmount
  }
}

function coinFactory() {
    var coinFactory = function(){
      var Coin = {};
      Coin.set = function (id) {
          Coin.id = id;
          Coin.amount = 1;
      }
      Coin.increaseAmount = function () {
          Coin.amount++
      };
      return Coin;
    }
    return coinFactory;
  }
