// declare a module
(function() {
var myAppModule = angular.module('marcform', [])
.controller('MainCtrl', ['$scope', 'DiccionarioService', function ($scope, DiccionarioService)  {
	$scope.codigosMarc = DiccionarioService.getCodigosMarc();

}])
//diccionario de códigos marc
.factory('DiccionarioService', function() {
	var codigosMarc = [{nombre: "International Standar Book Number ISBN", codigo:"020"},
		{nombre: "Nombre Personal Autor", codigo: "100"},
		{nombre: "Título e información del título", codigo: "245"},
		{nombre: "Edición", codigo: "250"},
		{nombre: "Información de Publicación", codigo: "260"},
		{nombre: "Descripción Física", codigo: "300"}];

	var getCodigosMarc = function() {
		return codigosMarc;
	};

	return {
		getCodigosMarc: getCodigosMarc
	};
});

//filtro que usa diccionario para devolver los códigos de marc
// myAppModule.filter('fieldFilter', function() {
// 	return function(text){
// //		var datarray = $scope.codigoArray;
// 		console.log("text: " + text);
// 		console.log("lenght: " + codigoArray.lenght);

// 		for(i=0; i< codigoArray.length; i++){
// 			if(codigoArray[i].nombre === text){
// 				return codigoArray[i].codigo;
// 			}
// 		}
// 		return {"000"};
// 	}
// });

})();