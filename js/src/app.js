var App = angular.module('App', []);

App.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(true);
	
}]);

App.controller('AppController', ['$scope', function($scope){
    $scope.name = 'Skilltouch | Elegance In Motion';
    var hash 	= window.location.hash;
	
	$scope.togglePage = function($event, $i){
		if(typeof $i == 'undefined') $i = 1;
    	$scope.tab = $i;
    };

	
	hash 				= (hash.length > 0) ? hash : '#home';
	var $link 			= jQuery('#nav li').find('a[href="'+hash+'"]');
	var idx 			= (typeof $link.data('index') !== 'undefined') ? $link.data('index') : 1;
	$scope.navTarget 	= $link;
	$scope.tab 			= idx;
	
	jQuery($scope.navTarget).click();			
}]);