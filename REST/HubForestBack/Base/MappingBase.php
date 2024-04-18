<?php

include_once './Comun/config.php';
include_once './Comun/FuncionesGenerales.php';

abstract class MappingBase{
	
	private static $db_host = host;
	private static $db_user = user;
	private static $db_pass = pass;
	//private static $directorioLog = directorioLog;
	//private static $log_name = log_name;
	private static $db_name = BD;
	private static $db_test= BD_test;
	public $query;
	protected $rows = array();
	private $conn;
	public $ok = true;
	public $code = '00000';
	public $resource = '';
	public $feedback = array();


		
	function connection() {
    // Check if the connection is already established and valid
    if ($this->conn && $this->conn->ping()) {
        return $this->conn;
    }

    // Establish a new connection
    if (isset($_SESSION['test'])) {
        $this->conn = new mysqli(self::$db_host, self::$db_user, self::$db_pass, self::$db_test);
    } else {
			
        $this->conn = new mysqli(self::$db_host, self::$db_user, self::$db_pass, self::$db_name);
    }

    // Check for connection errors
    if ($this->conn->connect_error) {
        die('Connection failed: ' . $this->conn->connect_error);
    }

    // Set character set
    $this->conn->set_charset("utf8");

    return $this->conn;
}


	private function escribelog(){
		$queryres = str_replace(array("\n", "\t", "\r"), '', $this->query);
		$code = $this->code;
		$controlador = (isset($_POST['controlador'])) ? $_POST['controlador'] : '';
		$action = (isset($_POST['action'])) ? $_POST['action'] : '';
	
		$fecha = date('d/m/Y(H:i:s)', time());
		$query = "INSERT INTO log (usuario, controlador, action, query, codigorespuesta, date) VALUES ('sin', '$controlador', '$action', \"$queryres\", '$code', '$fecha')";
		
		$this->conn->query($query);

	}

# Desconectar la base de datos

	private function close_connection() {
		$this->conn->close();
	}

# Ejecutar un query simple del tipo INSERT, DELETE, UPDATE

	public function execute_single_query() {

			if (!($this->connection())){
				$this->ok = false;
				$this->code  = literal['CONEXION_KO']; //no conecta con el gestor
				$this->construct_response();
			}
			else{
				if ($this->conn->query($this->query)){
					$this->ok = true;
					$this->code  = literal['SQL_OK']; //sql ejecutada con exito
					$this->query = str_replace(array("\n", "\t", "\r"), '', $this->query);
					$this->resource = $this->query;
					$this->construct_response();
				}
				else{
					$this->ok = false;
					$this->code  = literal['SQL_KO']; //sql no ejecutada
					$this->query = str_replace(array("\n", "\t", "\r"), '', $this->query);
					$this->resource = $this->query;
					$this->construct_response();
				}
				$this->close_connection();
			}



	}

# Traer resultados de una consulta en un Array

	protected function get_results_from_query() {

		if (!($this->connection())){
			$this->ok = false;
			$this->code  = literal['CONEXION_KO']; //error conexion bd
			$this->construct_response();
		}
		else{
			$result = $this->conn->query($this->query);
			if ($result != true){
				$this->ok = false;
				$this->code  = literal['SQL_KO']; //sql no ejecutada
				$this->resource = $this->query;
				$this->construct_response();
			}else{
			//
				if ($result->num_rows == 0){
					$this->ok = true;
					$this->code  = literal['RECORDSET_VACIO']; // el recordset viene vacio
					$this->construct_response();
				}else{
					for($i=0;$i<$result->num_rows;$i++){
						$this->rows[]=$result->fetch_assoc();
						$this->resource = $this->rows;
					}
					$result->close();
					$this->ok = true;
					$this->code  = literal['RECORDSET_DATOS']; // el recordset vuelve con datos
					$this->construct_response();
				}
			}		
			$this->close_connection();
		}
	}

# Ejecutar un query por clave primaria que debe devolver una túpla de resultado 

	protected function get_one_result_from_query() {

		if (!($this->connection())){
				$this->ok = false;
				$this->code  = literal['CONEXION_KO']; //no conecta con el gestor
				$this->construct_response();
		}
		else{
				$result = $this->conn->query($this->query);
				if ($result != true){
					$this->ok = false;
					$this->code  = literal['SQL_KO']; //sql no ejecutada
					$this->resource = $this->query;
					$this->construct_response();
				}else{
					if ($result->num_rows == 0){
						$this->ok = true;
						$this->code  = literal['RECORDSET_VACIO']; // el recordset viene vacio
						$this->construct_response();
					}else{
						$this->rows = $result->fetch_assoc();
						$this->resource = $this->rows;
						$this->ok = true;
						$this->code  = literal['RECORDSET_DATOS']; // el recordset vuelve con datos
						$this->construct_response();
					}
				}		
			$this->close_connection();
		}

	}

	protected function construct_response() {
		$this->feedback['ok'] = $this->ok;
		$this->feedback['code'] = $this->code;
		$this->feedback['resource'] = $this->resource;
		if ($this->feedback['ok']===false){
			$this->escribelog();
		}
	}



}

?>