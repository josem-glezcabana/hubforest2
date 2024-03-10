<?php

abstract class ControllerBase{

	function __construct(){

		$temp = 'app/'.get_class($this).'/'.get_class($this).'_SERVICE.php';
		$clase = get_class($this).'_SERVICE';
		//include_once $temp;
		
		$existefichero = comprobar_si_existe_fichero($temp);
		if ($existefichero['ok']){
			
		}
		else{
			echo 'no hay fichero service';
			exit();
		}
		
		$existeclase = comprobar_si_existe_clase($clase);
		if ($existeclase['ok']){}
		else{
			echo 'no hay clase service';
			exit();
		}

		$service = new $clase;
		$respuesta = $service->ejecutar();
		
		$this->devolverRest($respuesta);

	}

	function enviarAVista($vista, $data='', $controlador, $action){
		$data = array('vista'=>$vista, 'data'=>$data, 'controlador'=>$controlador, 'action'=>$action);
		$_SESSION['data'] = $data;
		new PorDefecto;
	}

	function devolverRest($respuesta){
	    
	    header('Content-type: application/json;charset=utf-8');
		echo(json_encode($respuesta));
		exit();

	}

	
}

?>
