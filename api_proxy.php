<?php header("Access-Control-Allow-Origin: *");


/*
To: /wssapi/v1/reservation/{entity}
Exp: https://api.webselfstorage.com/wssapi/v1/reservation/1030654

Where entity is: String value of the location entity for which to return information
*/

$locationId = '1030654';
$base 		= $_POST['base'];
$endpoint 	= $_POST['endpoint'];
$loc 		= $endpoint . $locationId;
$action 	= $_POST['action'];

$headers = array(
    'Content-Type:application/json',
    'Authorization: Basic 88acf91c-d737-4137-a63a-85828a48e8ff'
);

$curl = curl_init($loc);

if($action == 'submitReservation'){
	$data 		= $_POST['packet'];
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);	
}

curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

if($result = curl_exec($curl) !== false){
	return $result;
} else {
	return 'error';
}