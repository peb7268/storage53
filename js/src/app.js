var App = angular.module('App', []);

App.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider){
	$locationProvider.html5Mode(true);

	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json"
}]);

App.controller('AppController', ['$scope', '$http', function($scope, $http){
    $scope.name = 'Skilltouch | Elegance In Motion';
    var hash 	= window.location.hash;
	
	$scope.togglePage = function($event, $i){
		if(typeof $i == 'undefined') $i = 1;
    	$scope.tab = $i;
    	if($i == 3) loadStorageData($http);
    };

	
	hash 				= (hash.length > 0) ? hash : '#home';
	var $link 			= jQuery('#nav li').find('a[href="'+hash+'"]');
	var idx 			= (typeof $link.data('index') !== 'undefined') ? $link.data('index') : 1;
	$scope.navTarget 	= $link;
	$scope.tab 			= idx;
	
	jQuery($scope.navTarget).click();

	function loadStorageData($http){
		var dto 		= {};
		dto.base 		= 'https://api.webselfstorage.com/wssapi/v1';
		dto.endpoint 	=  dto.base + '/location/';

		var req = jQuery.ajax('http://storage53.com/wp-content/themes/storage53.com/api_proxy.php', 
		{
			'method': 'POST',
			data: dto
		});

		req.done(function(resp){
			resp = JSON.parse(resp).Location;
			$scope.locationData = resp;
			
			angular.element('#loading').fadeOut(100, function(){
				$scope.$apply();
			});
		});
	}
}]);