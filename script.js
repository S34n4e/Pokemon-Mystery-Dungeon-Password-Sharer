/*
#########################################
ROUTES
#########################################
*/
var views = angular.module('views', [])
var mainApp = angular.module('mainApp', ['ngRoute','views'])

mainApp.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix("!");
	$routeProvider
		.when('/home',{
		templateUrl: 'home.html',
		controller: 'HomeController'
	})
		.when('/code',{
		templateUrl: 'code.html',
		controller: 'CodeController'
	})
		.otherwise({
		redirectTo: '/home'
	})

	//$locationProvider.html5Mode(true);
});

mainApp.run(['$route', function($route) {
	$route.reload();
}]);

/*
################################################################
Code Controller
################################################################
*/
views.controller("CodeController", function($scope, $location, $timeout, $window) {
	/*	Canvas draws */
	$scope.count = 1; //1 to 5, 6 to 10, 11 to 15, 16 to 20, 21 to 25, 26 to 30
	$scope.c = "";
	$scope.ctx = "";
	var urlCode = "cod=";
	var urlType = "a"; //a for Request, b for Revive

	$scope.goHome = function() {
		$location.search('key', null);
		$location.path("/home");
	}

	$scope.reloadRoute = function() {
		$window.location.reload();
	}

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
				$scope.ctx.drawImage(insertImage, xLocation , yLocation );
			}
			$scope.count++;
			//console.log('count ' + $scope.count + ' x y ' + xLocation + ' ' + yLocation + ' code:' + code);
		}
	}

	function drawPasswordAtTimeout(img){
		$scope.ctx.drawImage(img, 0, 0);
		if(window.location.href.includes("cod=")) {
			//console.log("cod= found!!!");
			var data = window.location.href;
			var n = data.search("cod=");
			data = data.substring(n+4);
			var type = data.substr(-1);
			if(type === 'a') {
				document.getElementById("passType").innerHTML = "This is a rescue request password, please help them!";
			} else {
				document.getElementById("passType").innerHTML = "This is a revival password! Congratulations, you were saved!";
				document.getElementById("goHome").innerHTML = "Main page";
			}
			//console.log( n + " " + data);
			var i = 0;
			for(i; i < (data.length); i++) {
				$timeout($scope.insertLetter(data.substr(i, 2)), 10);
				i++;
			}
			$scope.count = 0;
		} else {
			//console.log("cod= not found???")
		}
	}

	$timeout($scope.init);

	$scope.isMobile = function() {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$scope.c.width = $scope.c.width/2;
			$scope.c.height = $scope.c.height/2;
		}
	}

	$scope.init = function() {
		//console.log('PAGE LOADED');
		$scope.c = document.getElementById("myCanvas2");
		$scope.ctx = $scope.c.getContext("2d");
		var img = new Image();
		img.src = "/image/bg2.jpg";
		img.onload = function () {
			$timeout(drawPasswordAtTimeout(img), 3000);
		}
	};

});

/*
################################################################
Home Controller
################################################################
*/
views.controller("HomeController", function($scope, $location, $timeout) {
	/*
	Canvas draws
	*/
	$scope.count = 1; //1 to 5, 6 to 10, 11 to 15, 16 to 20, 21 to 25, 26 to 30
	$scope.c = "";
	$scope.ctx = "";
	var urlCode = "cod=";
	var urlType = "a"; //a for Request, b for Revive

	function drawBackgroundAtTimeout(img){
		$scope.ctx.drawImage(img, 0, 0);		
	}

	$scope.init = function() {
		$scope.c = document.getElementById("myCanvas");
		$scope.ctx = $scope.c.getContext("2d");
		var img = new Image();
		img.src = "/image/bg2.jpg";
		img.onload = function () {
			$timeout(drawBackgroundAtTimeout(img), 3000);
		}
	};

	$timeout($scope.init);

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
				$scope.ctx.drawImage(insertImage, xLocation , yLocation );
			}
			$scope.count++;
			//console.log('count ' + $scope.count + ' x y ' + xLocation + ' ' + yLocation + ' code:' + code);
		}
	}

	$scope.resetLetter = function() {
		var newimg = new Image();
		newimg.src = "/image/bg2.jpg";
		newimg.onload = function () {
			$scope.ctx.drawImage(newimg, 0, 0);
		}
		$scope.count = 1;
		urlCode = "cod=";
	}

	$scope.generateUrl = function(urlType) {
		$location.search('key', null);
		var finalurl = "";
		if(window.location.href.includes('//www.')) {
			finalurl = 
				(window.location.href.substring(0, window.location.href.search('.com') ) + '.com/#!/code' + '?' + urlCode + urlType);
		} else {
			finalurl = 
				(window.location.href.substring(0, window.location.href.search('.com') ) + '.com/#!/code' + '?' + urlCode + urlType).replace("//", "//www.");
		}
		return finalurl;
	}

	$scope.shareAsRequest = function() {
		urlType = "a";
		document.getElementById("shareCode").value = ($scope.generateUrl(urlType));
		document.getElementById("shareCodeReddit").value = "[Rescue request password]" + "(" + $scope.generateUrl(urlType) + ")";
	}

	$scope.shareAsRevive = function() {
		urlType = "b";
		document.getElementById("shareCode").value = ($scope.generateUrl(urlType));
		document.getElementById("shareCodeReddit").value = "[Revival password]" + "(" + $scope.generateUrl(urlType) + ")";
	}

	$scope.copy = function() {
		var copyText = document.getElementById("shareCode");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	} 
	
	$scope.copyReddit = function() {
		var copyText = document.getElementById("shareCodeReddit");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	} 
	
});