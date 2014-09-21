<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB;

// Set date to UTC
date_default_timezone_set('utc');
$today = date('Y-m-d H:m:s'); 

$air = $_POST["air"];	// Store Air [ array of sectors ]
$fTime = 0;				// Total Flight time per air

$aircraftid = $air[0]['aircraftid'];

// Run insert query
$rs = $airops->exec("INSERT INTO air(`aircraftid`,`air`) values('{$aircraftid}', uuid())");
$airid = $airops->conn->insert_id; 

// Insert sectors  
	// ('{$aircraftid}', '{$from}', '{$to}', '{$nmDist}', '{$paxOpt}', '{$picOpt}', '{$sicOpt}', '{$headOpt}'
	// , '{$bOff}', '{$bOn}', '{$tOff}', '{$lndng}', '{$fTime}', '{$dFuel}', '{$aFuel}', '{$uFuel}', '{$natOpt}', '{$cliOpt}', '{$fTime}','{$today}','{$today}')

//$city = $mysqli->escape($city);

$insertArr = array();
foreach ($air as $i => $s) {	
	$insertArr[] = "('{$mysqli->escape($s['aircraftid'])}', '{$mysqli->escape($s['from'])}', '{$mysqli->escape($s['to'])}', '{$mysqli->escape($s['dist'])}', '{$mysqli->escape($s['pax'])}', 
			'{$mysqli->escape($s['pic'])}', '{$mysqli->escape($s['sic'])}', '{$mysqli->escape($s['hca'])}', '{$mysqli->escape($s['block_off'])}', '{$mysqli->escape($s['block_on'])}', 
			'{$mysqli->escape($s['flight_off'])}', '{$mysqli->escape($s['flight_on'])}', '{$mysqli->escape($s['airframe'])}', '{$mysqli->escape($s['departure_fuel'])}', '{$mysqli->escape($s['arrival_fuel'])}', 
			".($mysqli->escape($s['departure_fuel'])-$mysqli->escape($s['arrival_fuel'])).", '{$mysqli->escape($s['nature'])}', '{$mysqli->escape($s['client'])}', '{$mysqli->escape($s['airframe'])}','{$today}','{$today}','{$airid}')";
	$fTime += $s['airframe']; // sum uasort(array, cmp_function)p flight times 
}

// Prepare query
$query = "INSERT INTO `sector` (`aircraftid`, `from`, `to`, `dist`, `pax`, `pic`, `sic`, `hca`, `block_off`, `block_on`, 
                `flight_off`, `flight_on`, `airframe`, `departure_fuel`, `arrival_fuel`, `fuel_used`, `nature`, `client`, `leg`, `created_at`, `updated_at`,`air_id`) 
              VALUES ".implode(", ",$insertArr);

// Insert sectors
$rs = $airops->exec($query);

// Update Aircraft Stats
$query = "UPDATE aircraft SET airframe_hrs=airframe_hrs+{$fTime}, 
		engine1_hours=engine1_hours+{$fTime}, 
		engine2_hours=engine2_hours+{$fTime},
		engine1_cycles=engine1_cycles+{$fTime}, 
		engine2_cycles=engine2_cycles+{$fTime},
		updated_at = '{$today}' WHERE aircraftid = {$aircraftid}";
  
$rs = $airops->exec($query);

// Return Air ID
//print_r($airid);
echo $aircraftid;