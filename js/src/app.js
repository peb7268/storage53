var App = angular.module('App', []);

App.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(true);
	
}]);

App.controller('AppController', ['$scope', function($scope){
    $scope.name = 'Skilltouch | Elegance In Motion';
    var hash 	= window.location.hash;
	
	$scope.togglePage = function($event, $i){
		console.log('toggling to page: ', $i);
    	$scope.tab = $i;
    };

	
	hash 				= (hash.length > 0) ? hash : '#home';
	var $link 			= jQuery('#nav li').find('a[href="'+hash+'"]');
	var idx 			= $link.data('index');
	$scope.navTarget 	= $link;
	$scope.tab 			= idx;
	
	
	console.log('navigating to link: ', idx);
	jQuery($scope.navTarget).click();			
}]);