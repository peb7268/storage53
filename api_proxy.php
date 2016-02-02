<?php header("Access-Control-Allow-Origin: *");

$locationId = '1030654';
$base 		= $_POST['base'];
$endpoint 	= $_POST['endpoint'];
$loc 		= $endpoint . $locationId;


$headers = array(
    'Content-Type:application/json',
    'Authorization: Basic 88acf91c-d737-4137-a63a-85828a48e8ff'
);

$curl = curl_init($loc);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

if($result = curl_exec($curl) !== false){
	return $result;
} else {
	return 'error';
}