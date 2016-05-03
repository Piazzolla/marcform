// declare a module
(function() {
var myAppModule = angular.module('marcform', [])
.controller('MainCtrl', ['$scope', 'DiccionarioService', function ($scope, DiccionarioService)  {
	$scope.codigosMarc = DiccionarioService.getCodigosMarc();
	$scope.subcodigosMarc = DiccionarioService.getSubcodigosMarc();
	$scope.subcampos = [];
}])
//diccionario de códigos marc
.factory('DiccionarioService', function() {
	var codigosMarc = [{nombre: "International Standar Book Number ISBN", codigo:"020"},
		{nombre: "Nombre Personal Autor", codigo: "100"},
		{nombre: "Título e información del título", codigo: "245"},
		{nombre: "Edición", codigo: "250"},
		{nombre: "Información de Publicación", codigo: "260"},
		{nombre: "Descripción Física", codigo: "300"}];

	var subcodigosMarc = ["#", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	var getCodigosMarc = function() {
		return codigosMarc;
	};

	var getSubcodigosMarc = function() {
		return subcodigosMarc;
	};

	return {
		getCodigosMarc: getCodigosMarc,
		getSubcodigosMarc: getSubcodigosMarc
	};
});

myAppModule.controller('pgCtrl', function($scope){
		$scope.addSubfield = function() {
			$scope.subcampos.push("");
		}
});


})();