<?php 
include("airops_con.php"); 

// set the default timezone to use. Available since PHP 5.1
date_default_timezone_set('UTC');

//Instantiate custom DB class
$airops = new AiropsDB; 
 
$flag = $_POST['flag'];
$query = "";

$aircraftid = $_POST['aircraftid']; 

if($flag == 1){	// Select
	$query = "SELECT * FROM defects WHERE aircraftid = {$aircraftid} order by logged DESC";
	$rs = $airops->exec($query);
	$data = array(); 
	if($rs){
		while($row = $rs->fetch_assoc()){ 
			array_push($data, $row); 
		}
		$rs->close();
		echo json_encode($data);
	} 
}else if($flag == 2){ // Add New Defect
	$defect = $_POST['defect'];
	$actiontaken = $_POST['actiontaken'];
	$engineer = $_POST['engineer'];
	$logged = $_POST['logged'];
	$daysleft = $_POST['daysleft'];
	$deffered = 0;
	$status = 0;
	$created_at = $_POST['defectdate'];
	$updated_at = date("Y-m-d H:i:s");

	$query = "INSERT INTO `defects` (`defectid`, `aircraftid`, `defect`, `actiontaken`, `engineer`, `logged`, `daysleft`, `deffered`, `status`, `created_at`, `updated_at`) 
	VALUES (NULL, '$aircraftid','$defect','$actiontaken','$engineer','$logged','$daysleft','$deffered','$status','$created_at','$updated_at');";

	// VALUES(2,'No lights on aisle','none','Mr Hudson','02/01/14',2,0,0,'02/08/14','02/08/14')";
	// Run insert query
	$rs = $airops->exec($query); 
	//echo $airops->conn->insert_id; 
	echo $airops->conn->insert_id."| '$aircraftid','$defect','$actiontaken','$engineer','$logged','$daysleft','$deffered','$status','$created_at','$updated_at'";
}else if($flag == 3){ // Update/Edit Defect
	
}

?>