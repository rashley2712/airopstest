<?php
session_start(); 
include("airops_con.php");
//include("BcryptHasher.php");

//Instantiate custom DB class
$airops = new AiropsDB;

//Instantiate BcryptHasher class$bcrypt = new BcryptHasher;

$username = $_POST['userN'];
$password = $_POST['passW'];
$picture = $_POST['usrPic'];
$reason = $_POST['logRez'];
$usertype = $_POST['usrType'];


$insertSQL = "INSERT into `login` (`username`,`password_used`,`usertype`,`reason`,`picLocation`) VALUES ('{$username}','{$password}','{$usertype}','{$reason}','{$picture}')";
// Run insert query
$rs = $airops->exec($insertSQL);
//echo $ra;
$curUsr = $_SESSION['userN'];
?>