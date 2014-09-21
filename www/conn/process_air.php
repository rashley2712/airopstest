<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB; 

$air_id = $_REQUEST['air_id'];

// Previous Air - Possible conflict or mismatch in air retrieved
$query = "SELECT s.* FROM `sector` s INNER JOIN `air` a on  s.`air_id` = a.`air_id`  
	where s.`air_id` = ".($airid > 0)? $airid: "(select `air_id` from `air` ORDER BY `air_id` DESC limit 1) ";

$rs = $airops->exec($query);
$air = array(); 
if($rs){
	while($row = $rs->fetch_assoc()){ 
		array_push($air, $row); 
	}  
}  

$rs->free();  

echo json_encode($air);