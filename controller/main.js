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
	.when('/telefonos', {
		title : 'Teléfonos de emergencia',
		templateUrl :  'views/telefonos.html',
		controller: 'Telefonos'
	})
	.when('/mochila', {
		title : 'Mochila para Emergencias',
		templateUrl :  'views/mochila.html',
		controller: 'Mochila'
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

app.controller("Telefonos", function ($scope, $http, $routeParams) {
	$http.get(json).success(function (data) {

		$scope.telefonos = data.wtd.telefonos;

	});
});

app.controller("Mochila", function ($scope, $http, $routeParams) {
	$http.get(json).success(function (data) {

		$scope.mochila_descripcion = data.wtd.mochila_emergencias[0].descripcion;
		$scope.mochila_caracteristicas = data.wtd.mochila_emergencias[0].caracteristicas;
		$scope.mochila_contenido = data.wtd.mochila_emergencias[0].contenido;

	});
})

app.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);