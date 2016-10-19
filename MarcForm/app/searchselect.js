/*********************************************************************/
var myAppModule = angular.module('marcform');

myAppModule.controller('DemoCtrl',
  function DemoCtrl ($timeout, $q, $log, $scope) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    // list of `state` value/display objects
    self.campos        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    function newState(campo) {
      alert("Sorry! You'll need to create a Constituion for " + campo + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for campos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.campos.filter( createFilterFor(query) ) : self.campos,
          deferred;
          console.log("querySearch");
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
    function selectedItemChange(item, index) {
      $log.info('Item changed to ' + JSON.stringify(item));
      $scope.campos[index].codigo = item.value;

    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
/*      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
*/

    var allStates = [{nombre: "020 International Standar Book Number ISBN", codigo:"020"},
    {nombre: "040 Fuente de Catalogación", codigo: "040"},
    {nombre: "041 Código de Idioma", codigo: "041" },
    {nombre: "080 Número de Clasificación Decimal Universal CDU", codigo: "080"},
    {nombre: "082 Número de Clasificación Decimal Dewey", codigo: "082"},
    {nombre: "100 Nombre Personal Autor", codigo: "100"},
    {nombre: "110 Nombre Corporativo", codigo: "110"},
    {nombre: "111 Nombre de Reunión", codigo: "111"},
    {nombre: "130 Título Uniforme", codigo: "130"},
    {nombre: "245 Título e información del título", codigo: "245"},
    {nombre: "250 Edición", codigo: "250"},
    {nombre: "260 Información de Publicación", codigo: "260"},
    {nombre: "300 Descripción Física", codigo: "300"},
    {nombre: "500 Nota General", codigo: "500"},
    {nombre: "504 Nota de Bibliografía", codigo: "504"},
    {nombre: "505 Nota de Contenido con Formato Preestablecido", codigo: "505"},
    {nombre: "520 Nota de Resumen", codigo: "520"},
    {nombre: "530 Nota de Formato Físico Adicional Disponible", codigo: "530"},
    {nombre: "546 Nota de Idioma", codigo: "546"},
    {nombre: "600 Asiento Secundario de Materia - Nombre Personal", codigo: "600"},
    {nombre: "610 Asiento Secundario de Materia - Nombre Corporativo", codigo: "610"},
    {nombre: "650 Asiento Secundario de Materia - Término Temático", codigo: "650"},
    {nombre: "651 Asiento Secundario de Materia - Nombre Geográfico", codigo:"651"},
    {nombre: "653 Término de Indización - No Controlado", codigo: "653"},
    {nombre: "655 Término de Indización - Género/Forma", codigo: "655"},
    {nombre: "700 Asiento Secundario - Nombre Personal", codigo: "700"},
    {nombre: "710 Asiento Secundario - Nombre Corporativo", codigo: "710"},
    {nombre: "711 Asiento Secundario - Nombre de Reunión", codigo: "711"},
    {nombre: "776 Asiento de Soporte Físico Adicional", codigo: "776"},
    {nombre: "850 Insitución en Posición de las Existencias", codigo: "850"},
    {nombre: "856 Localización y Acceso Electrónicos", codigo: "856"},
    {nombre: "876 Información de Item - Unidad Bibliográfica Básica", codigo: "876"}
    ];

//      return allStates.split(/, +/g).map( function (state) {
     return allStates.map( function (campo) {
        return {
          value: campo.codigo,
          display: campo.nombre
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      console.log("createFilterFor(query)");
      return function filterFn(campo) {
        console.log("query: " + query);
        console.log("campo.value: " + campo.value);
        return query;// ->inutiliza la funcion (campo.value.indexOf(lowercaseQuery) === 0);
      };
    }
  });
