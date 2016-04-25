// declare a module
var myAppModule = angular.module('marcform', []);

// configure the module.
// in this example we will create a greeting filter
myAppModule.controller('DemoController', ['$scope', function($scope){
	$scope.name = 'blah';
	}]);	

myAppModule.factory('messages', function(){
  var messages = {};

  messages.list = [];

  messages.add = function(message){
    messages.list.push({id: messages.list.length, text: message});
  };

  return messages;
});

myAppModule.controller('ListCtrl', function(messages){
	var self = this;

	self.messages = messages.list;
	
})

myAppModule.controller('PostCtrl', function(messages){
	var self = this;
	self.newMessage = 'hola';
	self.addMessage = function(message){
		messages.add(message);
		self.newMessage='';
	};


})