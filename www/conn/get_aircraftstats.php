<?php include("airops_con.php");

//Instantiate custom DB class
$airops = new AiropsDB;

// Set date to UTC
date_default_timezone_set('utc');
$today = date('Y-m-d')." ";

// Get aircraft id
$aircraftid = $_GET['aircraftid'];

// Select Aircraft Status
$selectSQL = "SELECT nextinspection, status, airframe_hrs, landings, engine1_cycles, 
      engine1_hours, engine2_cycles, engine2_hours, apu_hours 
      from aircraft where aircraftid={$aircraftid}";

// Fetch result set and display details
$rs = $airops->exec($selectSQL);
while($stat = $rs->fetch_assoc()){ ?>
<div class="panel" id="maintenance">
<div class="panel-heading">
  <div class="panel-title"> <i class="fa fa-bar-chart-o"></i> AIRCRAFT STATS</div>
</div>
<div id="aircraft_stat">
  <div class="panel-body" id="maintenance" align="center">
    <div class="stats" align="center">
      <fieldset><legend>Engine</legend>
        <table class="sTable" id="engine">
          <tr>
            <td></td>
            <td>&#35; 1</td>
            <td>&#35; 2</td>
            <td>APU</td></tr>
          <tr><td>HOURS</td>
            <td><input type="number" id="eHour1" value="<?php echo $stat['engine1_hours']?>" readonly /></td>
            <td><input type="number" id="eHour2" value="<?php echo $stat['engine2_hours']?>" readonly /></td>
            <td><input type="number" id="eApu" value="<?php echo $stat['apu_hours']?>" readonly /></td>
          </tr>
          <tr>
            <td>CYCLES</td>
            <td><input type="number" id="eCycle1" value="<?php echo $stat['engine1_cycles']?>" readonly /></td>
            <td><input type="number" id="eCycle2" value="<?php echo $stat['engine2_cycles']?>" readonly /></td>
            <td></td>
          </tr>
        </table>
      </fieldset>
    </div>
    <div class="stats" align="center">
      <fieldset><legend>Airframe</legend>
        <table class="sTable" id="airframe">
          <tr>
            <td>HOURS</td>
            <td><input type="number" id="aHours" value="<?php echo $stat['airframe_hrs']?>" readonly /></td>
          </tr>
          <tr>
            <td>LANDINGS</td>
            <td><input type="number" id="aLand" value="<?php echo $stat['landings']?>" readonly /></td>
          </tr>
        </table>
      </fieldset>
    </div>
    <div class="stats" align="center">
      <fieldset><legend>Line Maintenance</legend>
        <table class="sTable" id="lineMaint">
          <tr><td><a href=""><span class="glyphicons glyphicons-circle_plus"></span></a>&nbsp;LOGBOOK</td>
          <td><a href=""><span class="glyphicons glyphicons-circle_plus"></span></a>&nbsp;TOP UPS</td></tr>  
        </table>
      </fieldset>
    </div>
  </div>  
  <?php 
    $d1 = strtotime($stat['nextinspection']);
    $d2 = time();
  ?>
  <div class="panel-footer" style="display:-webkit-box;font-variant:small-caps;">
    <div style="margin-right:25px;font-weight:bold;">
      Next Inspection&#58;<span id="nHour"><?php echo date("Y/m/d", $d1);?></span> or &#64;&nbsp;<span id="nOR"><?php echo floor(($d1-$d2)/(60*60)); ?> hour(s)</span>    
    </div>
    <div style="margin-right:25px;font-weight:bold;">    
      Remaining&#58;&nbsp;<span id="rem"><?php echo floor(($d1-$d2)/(60*60*24)); ?> day(s)</span>
    </div>
    <div style="margin-right:25px;font-weight:bold;">Status&#58;&nbsp;<span id="stat"><?php echo $stat['status']?></span>
   </div>
  </div>
</div>
</div>
<?php
}
// Garbage Collection
$rs->free();
?>
