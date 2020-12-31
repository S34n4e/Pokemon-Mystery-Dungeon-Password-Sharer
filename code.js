var app = angular.module("main2",[])
app.controller("controller2", [ "$scope", "$window", "$route" , function($scope, $http, $window, $route){
	/*
	Canvas draws
	*/
	$scope.count = 99; //1 to 5, 6 to 10, 11 to 15, 16 to 20, 21 to 25, 26 to 30
	var c = "";
	var ctx = "";
	var urlCode = "cod=";
	var urlType = "a"; //a for Request, b for Revive

	$scope.goHome = function() {
		$window.location.href = "index.html";      
	}
	$scope.reloadRoute = function() {
		$route.reload();
	}

	window.onload = function() {
		console.log('PAGE LOADED');
		c = document.getElementById("myCanvas2");
		ctx = c.getContext("2d");
		var img = new Image();
		img.src = "/image/bg2.jpg";
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
			if(window.location.href.includes("cod=")) {
				var data = window.location.href;
				var n = data.search("cod=");
				data = data.substring(n+4);
				var type = data.substr(-1);
				n = n + 4;
				console.log( n + " " + data);
				var i = 0;
				for(i; i < (data.length); i++) {
					$scope.insertLetter(data.substr(i, 2));
					i++;
				}
				$scope.count = 0;
			}
		}
	};

	$scope.insertLetter = function(code) {
		if($scope.count >= 1 && $scope.count <= 30) {
			urlCode = urlCode + code;
			var insertImage = new Image();
			var xExtraSpace = ($scope.count*46) - 46 + 20;
			var yExtraSpace = 10;
			if( ($scope.count >= 6 && $scope.count <= 10) || 
						($scope.count >= 21 && $scope.count <= 25) ) {
				xExtraSpace = 20 + xExtraSpace;
			}
			if( ($scope.count >= 11 && $scope.count <= 15) || 
						($scope.count >= 26 && $scope.count <= 30) ) {
				xExtraSpace = 40 + xExtraSpace ;
			}
			if($scope.count >= 16) { 
				yExtraSpace = 58 ;
				xExtraSpace = xExtraSpace - (15*46);
			}
			var xLocation = xExtraSpace ;
			var yLocation = yExtraSpace ;
			insertImage.src = "/image/" + code + ".png";
			insertImage.onload = function () {
				ctx.drawImage(insertImage, xLocation , yLocation );
			}
			$scope.count++;
			console.log('count ' + $scope.count + ' x y ' + xLocation + ' ' + yLocation + ' code:' + code);
		}
	}

} ] );