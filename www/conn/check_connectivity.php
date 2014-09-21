<?php include("airops_con.php"); 
//Instantiate custom DB class
$airops = new AiropsDB;  

// Check connectivity 
if($airops->conn) {
	echo "Connected";
}else{
	echo "Disconnected";
}
?>