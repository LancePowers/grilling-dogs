//*** YOU DO ***//

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
  //*** REQUIRED ***//
  // 1. As a user, I should be able to add a coin to my coins.
  // 2. As a user, I should be able to see my coins.
  //*** STRETCH ***//
  // 3. As a user, I should be able to add coins into my piggy bank.
  // 4. As a user, I should be able to increase the value of a coin.
  // 5. As a user, I should be able to see the value of the coins in my bank.
}

function coinService(coinFactory){

}

function coinFactory() {
    var coinFactory = function(){

    }
    return coinFactory;
  }
