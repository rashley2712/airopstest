<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);
include("airops_con.php");
//include("BcryptHasher.php");

//Instantiate custom DB class
$airops = new AiropsDB;
$q = strtolower($_GET["term"]);
//Instantiate BcryptHasher class$bcrypt = new BcryptHasher;

//$name = $_POST['name'];
$return = array();

$getSQL = "SELECT *, CONCAT(icao,', ',airport,', ',city) AS fullAir FROM airports WHERE airport LIKE '%$q%' OR city LIKE '%$q%' or icao LIKE '%$q%'";
$query = $airops->exec($getSQL);

while ($row = mysql_fetch_array($query)) {
    array_push($return,array('label'=>$row['fullAir'],'value'=>$row['fullAir']));
}
echo(json_encode($return));