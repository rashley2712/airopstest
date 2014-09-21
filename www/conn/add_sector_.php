<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB;

// Set date to UTC
date_default_timezone_set('utc');
$today = date('Y-m-d H:m:s');

// Sector Details
$aircraftid = $_POST['aircraftid'];
//$aircraftid = $_POST['airReg'];
$from   = $_POST['frOpt'];
$to     = $_POST['toOpt'];
$picOpt = $_POST['picOpt'];
$sicOpt = $_POST['sicOpt'];
$headOpt= $_POST['headOpt'];
$paxOpt = $_POST['paxOpt'];
$natOpt = $_POST['natOpt'];
$cliOpt = $_POST['cliOpt'];

$bOff   = $_POST['bOff'];
$tOff   = $_POST['tOff'];
$lndng  = $_POST['lndng'];
$bOn    = $_POST['bOn'];
 
$dFuel  = $_POST['dFuel'];
$aFuel  = $_POST['aFuel'];
$uFuel  = $dFuel - $aFuel;
$nmDist = $_POST['nmDist'];
$sLnd   = $_POST['sLnd'];

$fTime   = $_POST['flightTime']; 
$bTime   = $_POST['blockTime']; 

// Insert Query
$insertSQL = "INSERT INTO `sector` (`aircraftid`, `from`, `to`, `dist`, `pax`, `pic`, `sic`, `hca`, `block_off`, `block_on`, 
                `flight_off`, `flight_on`, `airframe`, `departure_fuel`, `arrival_fuel`, `fuel_used`, `nature`, `client`, `leg`, `created_at`, `updated_at`) 
              VALUES ('{$aircraftid}', '{$from}', '{$to}', '{$nmDist}', '{$paxOpt}', '{$picOpt}', '{$sicOpt}', '{$headOpt}'
                , '{$bOff}', '{$bOn}', '{$tOff}', '{$lndng}', '{$fTime}', '{$dFuel}', '{$aFuel}', '{$uFuel}', '{$natOpt}', '{$cliOpt}', '{$fTime}','{$today}','{$today}')";

// Update Aircraft Stat
$updateSQL = "UPDATE aircraft SET airframe_hrs=airframe_hrs+{$fTime}, 
		engine1_hours=engine1_hours+{$fTime}, 
		engine2_hours=engine2_hours+{$fTime},
		engine1_cycles=engine1_cycles+{$fTime}, 
		engine2_cycles=engine2_cycles+{$fTime},
		updated_at = '{$today}' WHERE aircraftid = {$aircraftid}";

// Run insert query
$rs = $airops->exec($insertSQL);
$status = $airops->conn->insert_id;

// Insert into air
$rs = $airops->exec("INSERT INTO air(`sector_id`,`aircraftid`) VALUES('{$status}','{$aircraftid}')"); 

// Update Aircraft stats
$rs = $airops->exec($updateSQL); 

echo "Added Sector {$status} Successfully!";