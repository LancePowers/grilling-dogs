angular.module('app',[])
      .factory('Hotdog', HotdogFactory)
      .service('hotdogService', hotdogService)
      .directive('hotdogsDirective', [hotdogsDirective])

function hotdogsDirective() {
    return {
        restrict: 'E',
        templateUrl: '../views/hotdogs.html',
        controller: HotdogsController,
        controllerAs: 'ctrl'
    }
}

HotdogsController.$inject = ['hotdogService','Hotdog','$interval'];

function HotdogsController(hotdogService, Hotdog, $interval) {
  this.data = hotdogService;
  this.data.buy(50);
  this.putOnGrill = function(i){
    console.log(i)
    var hd = this.data.pan.splice(i,1);
    this.data.grill.push(hd[0]);
  }
  this.takeOffGrill = function(i){
    var hd = this.data.grill.splice(i,1);
    this.data.plate.push(hd[0]);
  }
  var self = this;
  $interval(function(){
      for (var i = 0; i < self.data.grill.length; i++) {
        console.log(self.data.grill[i])
        self.data.grill[i].updateImg(self.data.time);
        self.data.grill[i].updateCookedAmount(self.data.time);
      }
      self.data.time++;
  },250)
}

hotdogService.$inject = ['Hotdog'];

function hotdogService(Hotdog){
  console.log('in Service')
  var service = {};

  service.currentId=0;
  service.hotdogs=[];
  service.time = 0;
  service.pan = [];
  service.grill = [];
  service.plate = [];

  service.buy = function(qty){
    for (var i = 0; i < qty; i++) {
      var hd = new Hotdog();
      hd.set(service.currentId)
      service.hotdogs.push(hd);
      service.pan.push(hd);
      service.currentId++;
    }
  }

  return service;
}



function HotdogFactory() {
    console.log('in Factory')
    var hotdogFactory = function(id){
    var Hotdog = {};
    Hotdog.set = function (id) {
        Hotdog.id = id;
        Hotdog.location = 'On the Pan.';
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
        Hotdog.location = 'On the Grill';
        Hotdog.startTime = t;
        return "There's another one!";
    };
    Hotdog.updateImg = function(){
      if(Hotdog.imgs.length === 1){
        console.log(Hotdog.imgs[0])
      } else if(Hotdog.imgs[0].opacity <= .05){
        Hotdog.imgs.shift();
      } else {
        Hotdog.imgs[0].opacity -= .05;
      }
    }
    Hotdog.updateCookedAmount = function (t) {
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
        return ('Cooked Amount Updated to: ' + Hotdog.cookedAmount);
      }
    return Hotdog;
    };
    return hotdogFactory;
  }
