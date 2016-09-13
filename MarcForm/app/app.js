// declare a module
var myAppModule = angular.module('marcform', ['ngMaterial']);

function entrada(codigo, subcampos) {
    this.codigo = codigo;
    this.subcampos = subcampos;
}


myAppModule.controller('MainCtrl', ['$scope', 'DiccionarioService', function($scope, DiccionarioService) {
    $scope.codigosMarc = DiccionarioService.getCodigosMarc();
    $scope.subcodigosMarc = DiccionarioService.getSubcodigosMarc();

    $scope.campos = [];

    var self = this;
    self.searchTextChange = searchTextChange;

    function searchTextChange(text, index) {
        console.log('Text changed to ' + text);
        console.log('Index ' + index);
    }


    $scope.colours = [
        { name: 'black', id: 0 },
        { name: 'white', id: 1 },
        { name: 'red', id: 2 }
    ];

    $scope.selectedColour = $scope.colours[2]; // red.

    $scope.colourChanged = function(value) {
        var colourName = value ? value.name : "none";
        $scope.message = "ac-change event fired for colour. New colour: " + colourName;
        $scope.$digest();
    };

    //  $scope.campos = [];
    //  $scope.campos.subcampos = [];
}]);

//diccionario de códigos marc
myAppModule.factory('DiccionarioService', function() {
    var codigosMarc = [
        { nombre: "International Standar Book Number ISBN", codigo: "020" },
        { nombre: "Nombre Personal Autor", codigo: "100" },
        { nombre: "Título e información del título", codigo: "245" },
        { nombre: "Edición", codigo: "250" },
        { nombre: "Información de Publicación", codigo: "260" },
        { nombre: "Descripción Física", codigo: "300" }
    ];

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

myAppModule.controller('subcampoCtrl', function($scope) {
    $scope.addSubfield = function(camposIndex) {
        console.log("índice de campo: " + camposIndex);
        var scdata = [];
        $scope.campos[camposIndex].subcampos.push(scdata);
    }
});

myAppModule.controller('campoCtrl', function($scope) {
    $scope.addField = function() {
        var campo = new entrada();

        /*    var ultimo = $scope.campos[$scope.campos.length-1];
              if(ultimo != undefined)
              {
                for(var a in ultimo)
                  console.log("for in: " + a);
                for(var i = 0; i < ultimo.length; i++)
                  console.log("for tradicional" + ultimo[i]);
                if(ultimo.constructor === Array)
                {
                  console.log("ES UN ARRAY");
                }
              }*/
        $scope.campos.push(campo);
    }
});

myAppModule.controller('debugCtrl', function($scope) {
    $scope.mostrarCamposJson = function() {
        for (var i in $scope.campos) {
            console.log("Var i:");
            console.log(JSON.stringify(i));
        }
        //console.log("Estructura de campos:" + JSON.stringify($scope.campos));
    }
});

myAppModule.controller('getJsonCtrl', function($scope, $http) {
    $scope.grabarArchivo = function() {
        var data = [];

        for (var i = 0; i < $scope.campos.length; i += 1) {
            for (var j = 0; j < $scope.campos[i].subcampos.length; j += 1) {
                var entrada = $scope.campos[i].codigo + " " + $scope.campos[i].indicador1 + $scope.campos[i].indicador2;
                entrada += " " + $scope.campos[i].subcampos[j].subcodigo;
                entrada += " " + $scope.campos[i].subcampos[j].content;
                data.push(entrada);
            }
        
}
        console.log("data: " + data.join("\n"));
        var blob = new Blob([data.join("\n")], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "data.txt");
    }
});

//Esta directiva es para mantener el preview visible cuando
//scrolleás el formulario.
myAppModule.directive('setClassWhenAtTop', function($window) {
    var $win = angular.element($window); // wrap window object as jQuery object

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                offsetTop = element.offset().top; // get element's top relative to the document

            $win.on('scroll', function(e) {
                if ($win.scrollTop() >= offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
});

myAppModule.controller('ctrl', function($scope) {
    $scope.scrollTo = function(target) {};
});

myAppModule.directive('awLimitLength', function() {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            attrs.$set("ngTrim", "false");
            var limitLength = parseInt(attrs.awLimitLength, 10); // console.log(attrs);
            scope.$watch(attrs.ngModel, function(newValue) {
                if (ngModel.$viewValue.length > limitLength) {
                    ngModel.$setViewValue(ngModel.$viewValue.substring(0, limitLength));
                    ngModel.$render();
                }
            });
        }
    };
});
