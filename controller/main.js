var app = angular.module("SismosWtd", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home', {
		templateUrl :  'views/links.html'
	})
	.when('/procedimientos/:etapa', {
		templateUrl :  'views/procedimientos.html',
		controller: 'Procedimientos'
	})
	.when('/telefonos', {
		templateUrl :  'views/telefonos.html',
		controller: 'Telefonos'
	})
	.when('/about', {
		templateUrl :  'views/about.html'
	})
	.otherwise({
		redirectTo: '/home'
	})

}])

app.controller("Procedimientos", function ($scope, $http, $routeParams, filterFilter) {
	$http.get('http://jovenred.com/sismos-wtd/json/sismos_wtd.json').success(function (data) {

		var filter = filterFilter(data.sismos_wtd.acciones, {
			name: $routeParams.etapa
		});
		$scope.procedimientos = filter[0].procedimientos;
		$scope.titulo = filter[0].titulo;

		if($routeParams.etapa=="antes"){
			$scope.icono = "reply";
		}else if($routeParams.etapa=="durante"){
			$scope.icono = "warning";
		}else if($routeParams.etapa=="despues"){
			$scope.icono = "share";
		}

	});
})

app.controller("Telefonos", function ($scope, $http, $routeParams) {
	$http.get('http://jovenred.com/sismos-wtd/json/sismos_wtd.json').success(function (data) {

		$scope.telefonos = data.sismos_wtd.telefonos;

	});
});