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
	
	//Mocked Data
	$scope.customer 			= {};
	$scope.customer.first_name 	= 'Chris';
	$scope.customer.last_name 	= 'Gheorgies';
	$scope.customer.phone 		= '6786175386';
	$scope.customer.email 		= 'peb7268@gmail.com';
	$scope.customer.address 	= '304 Sweetwater ridge';
    $scope.customer.city 		= 'Hoschton';
    $scope.customer.state 		= 'GA';
    $scope.customer.zip 		= '30548';


    $scope.cc   		= {};
    $scope.cc.name 		= 'Chris Gheorgies';
    $scope.cc.number 	= '4246315214167346';
    $scope.cc.address 	= '304 Sweetwater ridge';
    $scope.cc.city 		= 'Hoschton';
    $scope.cc.state 	= 'GA';
    $scope.cc.cid 		= '3732';
    $scope.cc.exp 		= '08/18';


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
    	
    	App.reservation.unitId 	= $($event.target).parent().parent().parent().data('unit-id');

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
		$scope.reservation = {
			"Units": [{
			    "UnitID": App.reservation.unitId,
			    "InsuranceID": null
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
			    // "CreditCard": '371335053008000',
			    // "ExpirationMMYY": '08/18',
			    // "CSC": '3732'
			    "CreditCard": '4246315214167346',
			    "ExpirationMMYY": '0816',
			    "CSC": '825'
			}
		};

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) dd='0'+dd;
		if(mm<10) mm='0'+mm;

		today = mm+'/'+dd+'/'+yyyy;

		$scope.reservation.ReservationDay = today;

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
			$scope.reservationResp = resp = JSON.parse(resp);
			
			if(resp.Success == true){
				var p = $('<p />', {
					text: 'Thank you for your purchase. Your reservation number is: ' + resp.ReservationNumber
				});
			} else {
				var p = $('<p />', {
					text: 'Oops there was an error: ' + resp.ErrorMessage
				});
			}
			
			$('#content .wrapper .show').html(p);	
			
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
			
			App.reservation 		= {};
			angular.element('#loading').fadeOut(100, function(){
				$scope.$apply();
			});
		});
	}
}]);