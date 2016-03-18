var app = angular.module("SismosWtd", ['ngRoute']);
var json = 'json/sismos_wtd.json';

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home', {
		title : 'Qué hacer en un sismo',
		templateUrl :  'views/home.html'
	})
	.when('/procedimientos/:etapa', {
		title : 'Acciones a tomar',
		templateUrl :  'views/procedimientos.html',
		controller: 'Procedimientos'
	})
	.when('/mochila', {
		title : 'Mochila para Emergencias',
		templateUrl :  'views/mochila.html',
		controller: 'Mochila'
	})
	.when('/emergencias119', {
		title : '119 Mensajería de voz para emergencias',
		templateUrl :  'views/emergencias119.html',
		controller: 'Emergencias119'
	})
	.when('/telefonos', {
		title : 'Teléfonos de emergencia',
		templateUrl :  'views/telefonos.html',
		controller: 'Telefonos'
	})
	.when('/about', {
		title : 'El Proyecto',
		templateUrl :  'views/about.html'
	})
	.otherwise({
		redirectTo: '/home'
	})

}]);

app.controller("Procedimientos", function ($scope, $http, $routeParams, filterFilter) {
	$http.get(json).success(function (data) {

		var filter = filterFilter(data.wtd.sismos, {
			name: $routeParams.etapa
		});
		$scope.procedimientos = filter[0].procedimientos;
		$scope.titulo = filter[0].titulo;
		$scope.header = filter[0].titulo;

		if($routeParams.etapa=="antes"){
			$scope.icono = "reply";
		}else if($routeParams.etapa=="durante"){
			$scope.icono = "warning";
		}else if($routeParams.etapa=="despues"){
			$scope.icono = "share";
		}

	});
});

app.controller("Mochila", function ($scope, $http, $routeParams) {
	$http.get(json).success(function (data) {

		$scope.mochila_descripcion = data.wtd.mochila_emergencias.descripcion;
		$scope.mochila_caracteristicas = data.wtd.mochila_emergencias.caracteristicas;
		$scope.mochila_contenido = data.wtd.mochila_emergencias.contenido;

	});
})

app.controller("Emergencias119", function ($scope, $http, $routeParams) {
	$http.get(json).success(function (data) {

		$scope.e119_descripcion = data.wtd.emergencias119.descripcion;
		$scope.e119_pasos = data.wtd.emergencias119.pasos;

	});
})

app.controller("Telefonos", function ($scope, $http, $routeParams) {
	$http.get(json).success(function (data) {

		$scope.telefonos = data.wtd.telefonos;

	});
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);