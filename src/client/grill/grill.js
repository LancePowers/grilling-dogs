//*** WE DO ***//

/*
We'll start by creating a module called app
and add a directive, service, and factory to it.
Notice the format for creating a factory and directive.
It requires a name and a function. To begin, we'll add a variable placeholder
for the functions we'll create a little later.
*/
var app = angular.module('app',[])
  .directive('tableDirective',[tableDirective] )
  .factory('hotdogFactory', hotdogFactory)
  .service('grillService', grillService)
/*
Don't get confused by the dot notation above. This is the same as saying app.factory
since we have assigned our module to a variable. We can also access our module
by calling angular.module('app').
Leaving out the second array parameter lets angular know we are looking for an
existing module not trying to create a new one.
*/

// Here we'll create the first function we need to pass into our app.directive
function tableDirective() {
    return {
        //controls the scope of our directive.
        restrict: 'E',
        //specifies where to look for the directives view.
        templateUrl: '../grill/grill.html',
        //Specify another function we need to create for our controller.
        controller: TableController,
        //Assigns a name to our controller we will use in the view.
        controllerAs: 'ctrl'
    }
}

/*
.$inject allows us to decide what we'll have available to us in our controller.
In this case, we are going to inject our service, 'grillService', and an
angular's version of setInterval, $interval.
*/
TableController.$inject = ['grillService', '$interval'];


function TableController(grillService) {
  /*
  Next, we'll create the contoller function we used above. We will only have
  access to the controller in our view, so we need to specify any functions or
  properties it needs in the controller.
  **Split screen with view to identify.
  */
}

function grillService(hotdogFactory, $interval){
  this.currentId = 0;
  /*
  Now we create our service. Our service needs to provide the controller with
  the properties and functions it needs to satisfy what we are trying to do in
  our view.
  */
}

function hotdogFactory() {
    var hotdogFactory = function(){
      /*
      Finally, we need to build a factory to construct our hotdogs.
      What do you notice immediately that's different about the structure of
      of our factory from our sevice?
      As much as possible, an object should be responsible for itself.
      So what do we need to know about each hotdog to correctly
      display it in our view?
      */
    };
    return hotdogFactory;
  }
