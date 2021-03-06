<!DOCTYPE html>
<html lang="es" ng-app="SismosWtd">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title ng-bind="'Sismos WTD - ' + $root.title">Sismos WTD - Qué hacer en un sismo</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/main.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular-route.min.js"></script>
	<script src="controller/main.js"></script>
</head>
<body>
	<header class="header">
	<h1><a href="#home">Qué hacer en un sismo</a></h1>
	</header>
	<section class="sections" ng-view></section>
</body>
</html>
