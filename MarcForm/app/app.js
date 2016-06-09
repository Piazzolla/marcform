// declare a module
(function() {
var myAppModule = angular.module('marcform', ['ngMaterial'])
.controller('MainCtrl', ['$scope', 'DiccionarioService', function ($scope, DiccionarioService)  {
	$scope.codigosMarc = DiccionarioService.getCodigosMarc();
	$scope.subcodigosMarc = DiccionarioService.getSubcodigosMarc();


$scope.colours = [
    { name: 'black', id: 0 },
    { name: 'white', id: 1 },
    { name: 'red',   id: 2 }
    ];

$scope.selectedColour = $scope.colours[2]; // red.

$scope.colourChanged = function (value) {
    var colourName = value ? value.name : "none";
    $scope.message = "ac-change event fired for colour. New colour: " + colourName;
    $scope.$digest();
};

//	$scope.campos = [];
//	$scope.campos.subcampos = [];
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

myAppModule.controller('subcampoCtrl', function($scope){
		$scope.addSubfield = function(camposIndex) {
			console.log("índice de campo: " + camposIndex);
			var scdata = [];
			$scope.campos[camposIndex].subcampos.push(scdata);
		}
});

myAppModule.controller('campoCtrl', function($scope){
		$scope.addField = function() {
			var subcampo = [];
			$scope.campos.push(subcampo);
		}
});

myAppModule.controller('debugCtrl', function($scope){
		$scope.mostrarCamposJson = function() {
			for(i = 0; i < $scope.campos.length; i++) {
				console.log(JSON.stringify($scope.campos[i].codigo));
			}
			console.log("Estructura de campos:" + JSON.stringify($scope.campos));
		}
});

myAppModule.controller('getJsonCtrl', function($scope, $http) {
	$scope.getJson = function(){
		$http.get('../data/template.json',  {headers: { 'Accept': 'application/json' }})
		.then(function( ){
			$scope.template = res.data;
//			$scope.campos = $scope.template;
			console.log("Template length: " + $scope.template.length);
			for(var i=0; i < $scope.template.length; i++){
            	console.log("Dato número " + i +": " + $scope.template[i].dato.codigo);
    		}
//			console.log(JSON.stringify($scope.template));

		});
	}
});



//Esta directiva es para mantener el preview visible cuando
//scrolleás el formulario.
myAppModule.directive('setClassWhenAtTop', function ($window) {
    var $win = angular.element($window); // wrap window object as jQuery object

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                offsetTop = element.offset().top; // get element's top relative to the document

            $win.on('scroll', function (e) {
                if ($win.scrollTop() >= offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
});

myAppModule.controller('ctrl', function ($scope) {
    $scope.scrollTo = function (target){
    };
});



/*********************************************************************/
myAppModule.controller('DemoCtrl', DemoCtrl);
  function DemoCtrl ($timeout, $q, $log) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  }


})();