<?php include('airops_con.php');

//Instantiate custom DB class
$airops = new AiropsDB;

// Set date to UTC
date_default_timezone_set('utc');

// Get aircraft id
$aircraftid = $_GET['aircraftid'];
//$aircraftid = 2;

$query = "select * from crew where aircraftid = {$aircraftid}";

$result = $airops->exec($query);

while ($data = $result->fetch_assoc()) {		
	echo "<td>{$data['position']}&#58;&nbsp;<span>{$data['displayname']}</span>&nbsp;<span>{$data['codeno']}</span></td>";
}
$result->free();
