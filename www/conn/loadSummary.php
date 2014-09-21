<?php include('airops_con.php');

//Instantiate custom DB class
$airops = new AiropsDB;

// Set date to UTC
date_default_timezone_set('utc');

// Get aircraft id
$aircraftid = $_GET['aircraftid'];

$query = "select a.airframe_hrs, a.engine1_hours, a.engine2_hours, 
	a.engine1_cycles, a.engine2_cycles, a.landings, s.* 
	from aircraft a inner join sector s on a.aircraftid = s.aircraftid
	where a.aircraftid = {$aircraftid}";

$result = $airops->exec($query);
 
echo 
"<tr>
	<tr>
		<td colspan='10'></td>		
		<td colspan='2'>engine hours</td>
		<td colspan='2'>engine cycles</td>				
		<td colspan='5'></td>
	</tr>
	<tr>
		<td>ID</td>
		<td>from</td>
		<td>to</td>
		<td>dist(nm)</td>
		<td>pic</td>
		<td>sic</td>
		<td>h c&#47;a</td>
		<td>block time</td>
		<td>flight time</td>
		<td>airframe</td>
		<td>&#35;1</td>
		<td>&#35;2</td>
		<td>&#35;1</td>
		<td>&#35;2</td>
		<td>lnds</td>
		<td>fuel</td>
		<td>pax</td>
		<td>nature</td>
		<td>client</td>
	</tr>	    
	<!--<tr>
		<td colspan='9' align='right'><b><i>Totals carried forward&nbsp;&nbsp;</b></i></td>
		<td>3169.7</span></td>
		<td>3169.7</td>
		<td>3169.7</td>
		<td>3169.7</span></td>
		<td>9778</td>
		<td>2410</td>
		<td colspan='4' align='left'>&nbsp;&nbsp;(lbs)</td>		
	</tr>-->
</tr>";

$d2 = time();	
$total_fTime = $total_bTime = $total_legs = $total_fuel = $total_pax = 0;
$total = array();
while($data = $result->fetch_assoc())
{   
    $bTime = $airops->date_diff($data['block_on'], $data['block_off']);
    $fTime = $airops->date_diff($data['flight_on'], $data['flight_off']);    
    echo "<tr>;
    <td align='center'>{$data['sectorid']}</td>
    <td align='center'>{$data['from']}</td>
	<td align='center'>{$data['to']}</td>
	<td align='center'>{$data['dist']}</td>
	<td align='center'>{$data['pic']}</td>
	<td align='center'>{$data['sic']}</td>
	<td align='center'>{$data['hca']}</td>
	<td align='center'>
			OFF ".date("H:m",strtotime($data['block_off']))."<span style='float:right; margin-right:5px'>".$bTime."</span><br/>
			ON ".date("H:m",strtotime($data['block_on']))."
		</td>
	<td align='center'>
			OFF ".date("H:m",strtotime($data['flight_off']))."<span style='float:right; margin-right:5px'>".$fTime."</span><br/>
			ON ".date("H:m",strtotime($data['flight_on']))."
		 </td>
	<td align='center'>{$airops->date_diff($data['flight_on'], $data['flight_off'])}</td>
	<td align='center'>{$airops->date_diff($data['flight_on'], $data['flight_off'])}</td>
	<td align='center'>{$airops->date_diff($data['flight_on'], $data['flight_off'])}</td>
	<td align='center'>{$data['leg']}</td>
	<td align='center'>{$data['leg']}</td>
	<td align='center'>{$data['leg']}</td>
	<td align='center'>{$data['fuel_used']}</td>
	<td align='center'>{$data['pax']}</td>
	<td align='center'>{$data['nature']}</td>
	<td align='center'>{$data['client']}</td>
	</tr>";
	$total_fTime+=$fTime;
	$total_bTime+=$bTime; 
	$total_legs+= $data['leg'];
	$total_fuel+= $data['fuel_used'];	
	$total_pax+= $data['pax'];	
	$total = array($data['airframe_hrs'], $data['engine1_hours'], $data['engine2_hours'], $data['engine1_cycles'], $data['engine2_cycles'], $data['landings']);
} 
//echo "overal = " .$result->num_rows;
	echo "<tr>
		<td colspan='7' align='right'><b><i>Sub-Total:&nbsp;&nbsp;</b></i></td>
		<td style='margin-right:5px'>{$total_bTime}</td>
		<td style='margin-right:5px'>{$total_fTime}</td>
		<td>{$total_fTime}</td>
		<td>{$total_fTime}</td>
		<td>{$total_fTime}</td>
		<td>{$total_legs}</td>
		<td>{$total_legs}</td>
		<td>{$total_legs}</td>
		<td>{$total_fuel}</td>
		<td colspan='3' align='left'>&nbsp;{$total_pax}</td>
	</tr>
	<tr>
		<td align='right' colspan='8'><b><i>Grand-Total:&nbsp;&nbsp;</b></i></td>		
		<td>{$total[0]}</td>
		<td>{$total[1]}</td>
		<td>{$total[2]}</td>
		<td>{$total[3]}</td>
		<td>{$total[4]}</td>
		<td>{$total[5]}</td>
	</tr>";

$result->free();

?>
