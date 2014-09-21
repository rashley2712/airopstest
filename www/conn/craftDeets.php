<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB;

// Startup Details
$airID=$_REQUEST['aircraftid'];
$regN=$_REQUEST['registration'];
$clSgn=$_REQUEST['callsign'];
$serial=$_REQUEST['serial'];
$type=$_REQUEST['type'];

// Insert Query
$insertSQL = "SELECT `aircraftid`,`registration`,`type`,`serial`,`callsign` FROM `aircraft` WHERE `aircraftid`=2";
echo $getSQL;
// Run insert query
$ra = $airops->exec($getSQL);

echo "Added Details {$status} Successfully";

?>