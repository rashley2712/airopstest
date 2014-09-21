<?php
$userN = $_POST['curUsr'];
$now = $_POST['tmStmp'];
function loggedIn(){
static $userN;
static $now;
}
echo loggedIn();
?>