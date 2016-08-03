var app = angular.module('app',[])
  .directive('tableDirective',[tableDirective] )
  .factory('hotdogFactory', hotdogFactory)
  .service('grillService', grillService)


function tableDirective() {
    return {
        restrict: 'E',
        templateUrl: '../grill/grill.html',
        controller: TableController,
        controllerAs: 'ctrl'
    }
}


TableController.$inject = ['grillService', '$interval'];

function TableController(grillService) {
  this.grill = grillService;
  this.putOnGrill = function(){
    this.grill.putOnGrill();
  }
  this.takeOffGrill = function(){
    this.grill.takeOffGrill();
  }
  this.buy = function(){
    this.grill.buy();
  }
  this.grill.lite();
  console.log('controller created')
}

function grillService(hotdogFactory, $interval){
  this.currentId = 0;
  this.hotdogs=[];
  this.time = 0;
  /*
  Can anyone think of a better way to handle pan, burner, plate?
  Remember that as much as possible an object should be responsible for itself.
  */
  this.pan = [];
  this.burner = [];
  this.plate = [];
  this.putOnGrill = function(i){
    console.log(this)
    var hd = this.pan.splice(i,1);
    this.burner.push(hd[0]);
  }
  this.takeOffGrill = function(i){
    var hd = this.burner.splice(i,1);
    this.plate.push(hd[0]);
  }
  this.buy = function(qty){
    for (var i = 0; i < qty; i++) {
      var hd = hotdogFactory();
      hd.set(this.currentId);
      this.hotdogs.push(hd);
      this.pan.push(hd);
      this.currentId++;
    }
  }
  this.lite = function(){
    var self = this;
    $interval(function(){
      for (var i = 0; i < self.burner.length; i++) {
        self.burner[i].update(self.time);
      }
      self.time++;}
    ,250)
  }
}

function hotdogFactory() {
    var hotdogFactory = function(){
      var Hotdog = {};
      Hotdog.set = function (id) {
          Hotdog.id = id;
          Hotdog.startTime = 0;
          Hotdog.cookedAmount = 'Raw';
          Hotdog.imgs = [
            {img:'/img/Raw.png', opacity: 1},
            {img:'/img/Warm.png', opacity: 1},
            {img:'/img/Perfect.png', opacity: 1},
            {img:'/img/Cooked.png', opacity: 1},
            {img:'/img/Burnt.png', opacity: 1}
          ]
      }
      Hotdog.onGrill = function (t) {
          Hotdog.startTime = t;
      };
      Hotdog.update = function(t){
        updateImg();
        updateCookedAmount(t);
      };
      function updateImg(){
        if(Hotdog.imgs.length === 1){
          console.log(Hotdog.imgs[0])
        } else if(Hotdog.imgs[0].opacity <= .05){
          Hotdog.imgs.shift();
        } else {
          Hotdog.imgs[0].opacity -= .05;
        }
      }
      function updateCookedAmount(t){
        var cookTime = t - Hotdog.startTime;
          if(cookTime < 2){
            Hotdog.cookedAmount = 'Raw';
          } else if (cookTime <= 5){
            Hotdog.cookedAmount = 'Warm';
          } else if(cookTime <= 7){
            Hotdog.cookedAmount = 'Perfect';
          } else if(cookTime <= 10){
            Hotdog.cookedAmount = 'Overcooked';
          } else if(cookTime > 10){
            Hotdog.cookedAmount = 'Burnt';
          }
          console.log('Cooked Amount Updated to: ' + Hotdog.cookedAmount);
        }
    return Hotdog;
    };
    return hotdogFactory;
  }
