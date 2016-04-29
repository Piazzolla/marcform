// declare a module
var myAppModule = angular.module('marcform', []);


//diccionario de códigos marc
myAppModule.controller('DemoController', function($scope){
	codigoArray = [];
	codigoArray.push({nombre: "International Standar Book Number ISBN", codigo:"020"});
	codigoArray.push({nombre: "Nombre Personal Autor", codigo: "100"});
	codigoArray.push({nombre: "Título e información del título", codigo: "245"});
	codigoArray.push({nombre: "Edición", codigo: "250"});
	codigoArray.push({nombre: "Información de Publicación", codigo: "260"});
	codigoArray.push({nombre: "Descripción Física", codigo: "300"});
	return codigoArray;
	});	

//filtro que usa diccionario para devolver los códigos de marc
myAppModule.filter('fieldFilter', function() {
	return function(text){
//		var datarray = $scope.codigoArray;
		console.log("text: " + text);
		console.log("lenght: " + codigoArray.lenght);

		for(i=0; i< codigoArray.length; i++){
			if(codigoArray[i].nombre === text){
				return codigoArray[i].codigo;
			}
		}
		return "000";
	}
});


// service
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
