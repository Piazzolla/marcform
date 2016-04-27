// declare a module
var myAppModule = angular.module('marcform', []);

//inicializar datos de diccionario
var initCtrl = myAppModule.factory('initCtrl', function($scope){
	// $scope.codigoArray = [];
	// $scope.codigoArray.push({nombre: "International Standar Book Number ISBN", codigo:"020"});
	// $scope.codigoArray.push({nombre: "Nombre Personal Autor", codigo: "100"});
	// $scope.codigoArray.push({nombre: "Título e información del título", codigo: "245"});
	// $scope.codigoArray.push({nombre: "Edición", codigo: "250"});
	// $scope.codigoArray.push({nombre: "Información de Publicación", codigo: "260"});
	// $scope.codigoArray.push({nombre: "Descripción Física", codigo: "300"});
	// return $scope.codigoArray;
	});


//filtro que usa diccionario para devolver los códigos de marc
myAppModule.filter('fieldFilter', [ 'initCtrl', function($scope) {
	return function(text){
		var datarray = $scope.codigoArray;

		for(i=0; i< datarray.length; i++){
			if(datarray.nombre === text){
				return datarray.codigo;
			}
		}
		return "000";
	}
}]);

myAppModule.controller('DemoController', ['$scope', function($scope){
	$scope.codigoArray = [];
	$scope.codigoArray.push({nombre: "International Standar Book Number ISBN", codigo:"020"});
	$scope.codigoArray.push({nombre: "Nombre Personal Autor", codigo: "100"});
	$scope.codigoArray.push({nombre: "Título e información del título", codigo: "245"});
	$scope.codigoArray.push({nombre: "Edición", codigo: "250"});
	$scope.codigoArray.push({nombre: "Información de Publicación", codigo: "260"});
	$scope.codigoArray.push({nombre: "Descripción Física", codigo: "300"});
	}]);	

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
