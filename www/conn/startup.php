<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB;

// Startup Details
$regN=$_POST['regN'];
$clSgn=$_POST['clSgn'];
$locN=$_POST['locN'];
$confDate=$_POST['confDate'];
$locTime=$_POST['locTime'];
$utcTime=$_POST['utcTime'];
$pic=$_POST['cPic'];
$sic=$_POST['cSic'];
$headCA=$_POST['cHca'];
$adCrew=$_POST['adCrew'];
$ste1hrs=$_POST['ste1hrs'];
$ste1cyc=$_POST['ste1cyc'];
$ste2hrs=$_POST['ste2hrs'];
$ste2cyc=$_POST['ste2cyc'];
$stAirhrs=$_POST['stAirhrs'];
$stLands=$_POST['stLands'];
$apuHrs=$_POST['apuHrs'];


// Insert Query
$insertSQL = "INSERT INTO `startup` (`registration`,  `call_sign`, `current_location`, `date_created`, `locTime`, `utcTime`, `pic`, `sic`, `head_ca`, `added_crew`, `engine1_hrs`, `engine2_hrs`, `engine1_cyc`, `engine2_cyc`, `airframe_hrs`, `landings`, `apu_hours`)VALUES('{$regN}',  '{$clSgn}', '{$locN}','{$confDate}', '{$locTime}', '{$utcTime}', '{$pic}', '{$sic}', '{$headCA}', '{$adCrew}', '{$ste1hrs}', '{$ste2hrs}', '{$ste1cyc}', '{$ste2cyc}', '{$stAirhrs}', '{$stLands}', '{$apuHrs}')";
// Run insert query
$rs = $airops->exec($insertSQL);
$status = $airops->conn->insert_id;

echo "Added Details {$status} Successfully";

?>