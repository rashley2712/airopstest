<?php
include("airops_con.php"); 

//Instantiate custom DB class
$airops = new AiropsDB; 
 
$pic = $_POST['pic']; 
$sic = $_POST['sic']; 
$hca = $_POST['hca']; 
$status = 0; 

$insertSQL = "SELECT d.documentTitle AS docType, d.documentNo AS docNo, d.dateissued AS issued, DATEDIFF(d.expires, NOW()) AS daysleft, d.expires AS expires, c.displayname AS member
FROM document d INNER JOIN crew c ON d.entityid = c.crewid WHERE d.entityid IN ({$pic},{$sic},{$hca}) AND d.entityType = 'P'";

// Run insert query
$rs = $airops->exec($insertSQL);

$data = array();
if($rs){ 
	while ($row = $rs->fetch_assoc()){    
		// Push overdue crew to array
		if($row['daysleft'] > 7 && $row['daysleft'] < 14){ 
			array_push($data, $row, 1);
		}elseif($row['daysleft'] < 7){ 
			array_push($data, $row, 2);
		}
	} 
	echo json_encode($data);
}else {
	echo " strings got stringier";
} 
?>