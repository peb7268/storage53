<?php extract($_POST);
	
//$to 		 = 'peb7268@gmail.com';
$to 		 = 'chris@skilltouch.com';
$from   	 = strtolower($email);

$body   	 = '';
$body		.= "Name: $name \n";
$body		.= "Subject: $subject \n";
$body		.= "Email: $email \n";
$body		.= "Phone: $phone \n";
$body		.= "Message: $message \n";

$headers 	 = '';
$headers 	.= 'From: '. $from . "\r\n";
$headers 	.= 'Reply-To: '. $from . "\r\n";
$headers 	.= 'X-Mailer: PHP/5.5.4';

$status 	 =  (mail($to, $subject, $body, $headers)) ? 'success' : 'error';

echo $status;
