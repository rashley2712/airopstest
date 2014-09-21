<?php 
include("airops_con.php");
//include("BcryptHasher.php");

//Instantiate custom DB class
$airops = new AiropsDB;

//Instantiate BcryptHasher class$bcrypt = new BcryptHasher;

$supply = $_POST['supply'];
$location = $_POST['location'];
$invoice = $_POST['invoice'];
$liters = $_POST['liters'];
$gallons = $_POST['gallons'];
$name = $_POST['name'];
$comments = $_POST['comments'];
$imgLoc = $_POST['imgLoc'];


$insertSQL = "INSERT into `fuel` (`fuelcompany`,`invoiceno`,`fueling_location`,`receipt_img`,`loaded_gal`,`loaded_lit`,`comments`) VALUES ('{$supply}','{$invoice}','{$location}','{$imgLoc}','{$gallons}','{$liters}','{$comments}')";
// Run insert query
$rs = $airops->exec($insertSQL);
//echo $ra;
?>