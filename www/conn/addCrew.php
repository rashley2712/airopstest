<?php 
include("airops_con.php");
//include("BcryptHasher.php");

//Instantiate custom DB class
$airops = new AiropsDB;

//Instantiate BcryptHasher class$bcrypt = new BcryptHasher;

$name = $_POST['name'];
$position = $_POST['position'];
$licenseNo = $_POST['licenseNo'];
$licenseType = $_POST['licenseType'];
$medicalExp = $_POST['medicalExp'];


$insertSQL = "INSERT into `added_crew` (`name`,`position`,`license_no`,`license_type`,`medical_exp`) VALUES ('{$name}','{$position}','{$licenseNo}','{$licenseType}','{$medicalExp}')";
// Run insert query
$rs = $airops->exec($insertSQL);
//echo $ra;
?>