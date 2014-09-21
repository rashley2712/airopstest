<?php
session_start(); 
include("airops_con.php");
include("BcryptHasher.php");

//Instantiate custom DB class
$airops = new AiropsDB;

//Instantiate BcryptHasher class
$bcrypt = new BcryptHasher;

$username = $_POST['userN'];
$password = $_POST['passW'];

$query = "SELECT * FROM users where username='{$username}' LIMIT 1";

// Run select query
$rs = $airops->exec($query);
$user = $rs->fetch_assoc();
if($user){
	$isValid = $bcrypt->checkhash($password, $user['password']);
	if($isValid){ 
		// return user as json object
		echo json_encode($user);
	}else{
		echo json_encode(array("error"=>1));
	}	
}else{
	echo json_encode(array("error"=>1));
}
