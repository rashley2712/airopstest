<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB;

// Set date to UTC
date_default_timezone_set('utc');
$today = date('Y-m-d');

// Get aircraft id
$aircraftid = $_GET['aircraftid'];

// Select Aircraft Status
$selectSQL = "SELECT aircraftid, registration, type, serial, callsign, nextinspection, status, airframe_hrs, landings 
      from aircraft where aircraftid = {$aircraftid} LIMIT 1";

// Fetch result set and display details
$rs = $airops->exec($selectSQL);
while($aircraft = $rs->fetch_assoc()){ ?>
<table id="sumTit">
  <tr align="center">  
  <td class="fTitle" id="fTitle" colspan="2">
    <b>FLIGHT FOLIO TECHNICAL LOG / DEFECT REPORT</b>
  </td>
  <td class="fTitle"></td>
  <td class="fTitle sumDate">
    Date&#58;&nbsp;<span id="sumDate"><?php echo date("d M Y") ?></span><br>
    Log&#58;&nbsp;<span id="logNum">41491</span>
  </td>
</tr>
<tr>  
  <td>Aircraft Registration&#58;&nbsp;<span id="sumRegi"><?php echo $aircraft['registration']?></span></td>
  <td>
    Call Sign&#58;&nbsp;<span id="sumCall"><?php echo $aircraft['callsign']?></span>&nbsp;
    Type&#58;&nbsp;<span id="sumType"><?php echo $aircraft['type']?></span>
  </td>
  <td>Aircraft Serial &#35;&#58;&nbsp;<span id="sumSerial"><?php echo $aircraft['serial']?></span></td>
</tr>                
<tr>
  <td></td>
  <td>Next Inspection&#58;&nbsp;<span id="sumNex"><?php echo date("d-m-Y", strtotime($aircraft['nextinspection']));?></span></td>  
  <td>Hours Remaining&#58;&nbsp;<span id="sumRemH"><?php echo $airops->date_diff($aircraft['nextinspection'], $today);?></span> hour(s)</td>
</tr>
</table>
<?php 
}
?>