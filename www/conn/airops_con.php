<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"

class AiropsDB{
	//Local
	// private $hostname_airops_con = "localhost";
	// private $database_airops_con = "airops";
	// private $username_airops_con = "root";
	// private $password_airops_con = "";	
	// Live
	private $hostname_airops_con = "localhost";
	private $database_airops_con = "tbcmainl_airops";
	private $username_airops_con = "tbcmainl_admin";
	private $password_airops_con = "@keep1ts1mple";	
	var $conn;	

	public function __construct(){
		$this->conn = new mysqli($this->hostname_airops_con, $this->username_airops_con, $this->password_airops_con);
		if($this->conn->connect_error){
			die("An error occured while processing the request please try again later!".$this->conn->connect_error);
			exit();
		}
		$this->conn->select_db($this->database_airops_con);
		$this->conn->query("SET NAMES 'utf8'");				
	}

	public function setDbVars($host, $db, $username, $password){
		$this->hostname_airops_con = $host;
		$this->database_airops_con = $db;
		$this->username_airops_con = $username;
		$this->password_airops_con = $password;	
	}

	public function exec($query){		
		if(isset($query)){
			$rs = $this->conn->query($query) or trigger_error("[{$query}]: An error occured during query execution ", E_USER_WARNING);
			return $rs;
		}else{
			trigger_error("Missing parameter for function execQuery", E_USER_WARNING);
		}			
	}

	// Sanitize user input
	public function escape($theValue){
		return $this->conn->real_escape_string($theValue);
	}

	/**
	* Date difference in hrs(default)
	*
	* @param datetime
	* @param datetime
	* @return Response
	*/
	public function date_diff($date1, $date2){
		$d1 = strtotime($date1);
		$d2 = strtotime($date2);
		$diff = $d1 - $d2;
		return round($diff/(60 * 60), 1);
	}

	public function __destruct(){			
		if(isset($this->conn))
			$this->conn->close();	
	}	
}

?>