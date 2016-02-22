var App = angular.module('App', ['ngSanitize']);

App.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider){
	$locationProvider.html5Mode(true);

	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json"
}]);

App.controller('AppController', ['$scope', '$http', '$sanitize', function($scope, $http, $sanitize){
    $scope.name = 'Skilltouch | Elegance In Motion';
    var hash 	= window.location.hash;
	
	$scope.togglePage 	= function($event, $i){
		if(typeof $i == 'undefined') $i = 1;
    	$scope.tab = $i;
    	if($i == 3) loadStorageData($http);
    };

    $scope.reserveSpot 				= function($event){
    	$ = jQuery;
    	$event.preventDefault();
    	var $rowToReserve 	= $($event.target).parent().parent();
    	var qtyRemaining 	= $rowToReserve.data('qty-remaining');
    	
    	$.fancybox({
        	href: '#reserveForm'        	
    	});
    };

    $scope.fillOutBillingForm 		= function($event){
    	if(typeof $scope.cc == 'undefined') $scope.cc = {};
    	angular.forEach($scope.customer, function(prop, key){
			if(key == 'first_name') $scope.cc.name = prop;
			if(key == 'last_name')  $scope.cc.name = $scope.cc.name + ' ' + prop;
			if(key !== 'first_name' && key !== 'last_name') $scope.cc[key] = prop;
		});
    }

    $scope.submitReserveForm 		= function($event){
    	$event.preventDefault();
    	$scope.formData 			= {};
    
    	angular.forEach($scope.cc, function(field, key){
    		if(typeof field !== 'undefined') {
	    		var val = $sanitize(field.trim());
	    		if(typeof $scope.formData[key] == 'undefined') $scope.formData[key] = val;
    		}
    	});

    	angular.forEach($scope.customer, function(field, key){
    		var val = $sanitize(field.trim());
    		if(typeof $scope.formData[key] == 'undefined') $scope.formData[key] = val;
    	});
    	
    	/*
		- capture unit id
		- insurance_id ?
		- phone
		- email
		- address
    	*/

    	//var date = new Date();
    	//date.toISOString();
		$scope.reservation = {
			"ReservationDay": "3/15/2016",
			"Units": [{
			    "UnitID": 12345,
			    "InsuranceID": 123
			}],
			"PaymentInfo": {
			    "FirstName": $scope.formData.first_name,
			    "LastName": $scope.formData.last_name,
			    "Address1": $scope.formData.address,
			    "Address2": $scope.formData.address2,
			    "City": $scope.formData.city,
			    "State": $scope.formData.state,
			    "Zip": $scope.formData.zip,
			    "Phone": $scope.formData.phone,
			    "Email": $scope.formData.email,
			    //"CreditCard": $scope.formData.number,
			    //"ExpirationMMYY": '3732'$scope.formData.exp,
			    //"CSC": $scope.formData.cid
			    "CreditCard": '371335053008000',
			    "ExpirationMMYY": '08/18',
			    "CSC": '3732'
			}
		};

    	var dto 		= {};
		dto.base 		= 'https://api.webselfstorage.com/wssapi/v1';
		dto.endpoint 	=  dto.base + '/reservation/';
		dto.action 		= 'submitReservation';
		dto.packet 		= JSON.stringify($scope.reservation);

		var req = jQuery.ajax('http://storage53.com/wp-content/themes/storage53.com/api_proxy.php', 
		{
			'method': 'POST',
			data: dto
		});

		req.done(function(resp){
			$scope.reservationResp = JSON.parse(resp);
			
			var p = $('<p />', {
				text: resp.Success + ': ' + resp.ErrorMessage
			});
			angular.element('#content .wrapper .show').append(p);
			
			$.fancybox.close();
		});
    }
	
	hash 						= (hash.length > 0) ? hash : '#home';
	var $link 					= jQuery('#nav li').find('a[href="'+hash+'"]');
	var idx 					= (typeof $link.data('index') !== 'undefined') ? $link.data('index') : 1;
	$scope.navTarget 			= $link;
	$scope.tab 					= idx;
	
	jQuery($scope.navTarget).click();

	function loadStorageData($http){
		var dto 		= {};
		dto.base 		= 'https://api.webselfstorage.com/wssapi/v1';
		dto.endpoint 	=  dto.base + '/location/';
		dto.action 		= 'loadStorageData';

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