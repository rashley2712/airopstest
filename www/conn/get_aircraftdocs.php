<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB;

// Set date to UTC
date_default_timezone_set('utc');
$today = date('Y-m-d');

// Get aircraft id
$aircraftid = $_GET['aircraftid'];

// Select Aircraft Status
$selectSQL = "SELECT * from document where entityid={$aircraftid} ORDER BY `expires` ASC";

// Fetch result set and display details
$rs = $airops->exec($selectSQL);
while($docs = $rs->fetch_assoc()){
	$diff = round($airops->date_diff($docs['expires'], $today)/24);
?>
	<tr>				
		<td>
		<?php if($diff < 14){
			echo '<span class="badge badge-danger">'.$diff.'</span>';
		}else if($diff >= 14 && $diff < 28){
			echo '<span class="badge badge-warning">'.$diff.'</span>';
		}else{
			echo '<span class="badge badge-inverse">'.$diff.'</span>';
		}?>
		</td>
		<td><?php echo $docs['documentTitle'];?></td>
		<td><span class="glyphicons glyphicons-circle_plus"></span></td>		
	</tr>
<?php 
}
?>