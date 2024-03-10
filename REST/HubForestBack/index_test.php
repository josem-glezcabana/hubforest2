<?php

header('Access-Control-Allow-Origin: *');

session_start();
$_SESSION['test'] = true;

include_once './Comun/config.php';
include_once './Comun/FuncionesGenerales.php';

/*

// peticion con upload

if ((isset($_POST['formulario'])) || (isset($_POST['upload']))){ 
	
	if (isset($_POST['formulario'])){

		$pares = explode("&", $_POST['formulario']);

		$lista = array();

		foreach ($pares as $par) {

			$duo = explode('=', $par);	
			$lista[$duo[0]] = $duo[1];
			
		}

		$_POST = $lista;
	}

	if (count($_FILES)>0) {
		$_FILES = $_FILES['upload'];
	}
	else{
		unset($_FILES);
	}
}
else{ //peticion sin upload
	
	// peticion invalida

	if (!isset($_POST['controlador']) or !($_POST['action'])){
		header('Content-type: application/json');
		$resp = array('ok' => 'false', 'code' => 'peticion_invalida','resource' => $_POST);
		echo(json_encode($resp));
		exit();
}
}

*/


// control peticion valida

if (isset($_POST['controlador'])){
	$rest = $_POST['controlador'];
}
else{
	$mensaje = '';
	$respuesta = array('ok' => false, 'code' => 'controlador_vacio', 'resource' => $mensaje);
	header('Content-type: application/json');
	echo(json_encode($respuesta));
	exit();
}

if (isset($_POST['action'])){
	$action = $_POST['action'];
}
else{
	$mensaje = '';
	$respuesta = array('ok' => false, 'code' => 'accion_vacia', 'resource' => $mensaje);
	header('Content-type: application/json');
	echo(json_encode($respuesta));
	exit();
}

	$fichero = './app/'.$rest.'/'.$rest.'_CONTROLLER.php';
	$res = comprobar_si_existe_fichero($fichero);
	if ($res['ok']){
		$nombrerest = new $rest;
	}
	else{
		escribirLogInterno($res['resource']);
	}

session_destroy();

?>
