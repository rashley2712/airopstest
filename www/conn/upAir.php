<?php 
include("conn/airops_con.php");
//include("BcryptHasher.php");

//Instantiate custom DB class
$airops = new AiropsDB;

//Instantiate BcryptHasher class$bcrypt = new BcryptHasher;

$airport = $_POST['bCom'];
$icao = $_POST['icao'];
$city = $_POST['aCom'];

$insertSQL = "INSERT into `airports` (`airport`,`ICAO`,`city`) VALUES ('{$airport}','{$icao}','{$city}')";
// Run insert query
$rs = $airops->exec($insertSQL);
//echo $ra;
?>