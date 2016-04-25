// declare a module
var myAppModule = angular.module('marcform', []);

// configure the module.
// in this example we will create a greeting filter
myAppModule.controller('DemoController', ['$scope', function($scope){
	$scope.name = 'blah';
	}]);	
