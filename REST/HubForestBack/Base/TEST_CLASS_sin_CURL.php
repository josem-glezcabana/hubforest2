<?php

class apptestNoRest_sin_CURL{

	var $cliente;
	var $resultadoTest;

	function __construct(){

		// inicializar
		$this->resultadoTest = array();
		include_once './Comun/config.php';

	}


	function hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado){

		/*// USANDO CONTROLLER (no se puede pq controller devuelve json a cliente)
		include_once './app/'.$entidad.'/'.$entidad.'_CONTROLLER.php';
		$test = new $entidad;
		$_POST = $POST;
		$resp = $test->$accion();
		$resp = json_decode($resp); // convierto en un stdClass
		$resp = (array)$resp; //convierto en array
		*/
		// USANDO SERVICE
		$_POST = $POST;
		include_once './app/'.$entidad.'/'.$entidad.'_SERVICE.php';
		$servicio = $entidad.'_SERVICE';
		$test = new $servicio;
		$resp = $test->ejecutar();

		if ($codeEsperado === $resp['code']) { $exito = 1; } else { $exito = 0; }

		$resultadoTestIndividual = array(
			'entidad' => $entidad,
			'accion' => $accion,
			'tipo' => $tipo,
			'prueba' => $prueba,
			'datos' => $POST,
			'RespEsperada' => $codeEsperado,
			'RespObtenida' => $resp['code'],
			'exito' => $exito
		);

		array_push($this->resultadoTest, $resultadoTestIndividual);
	}


}

?>