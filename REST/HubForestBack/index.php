<?php

session_start();

include_once './Comun/config.php';

//Comprobar_si_existe_BD();

header('Access-Control-Allow-Origin: *');

if (isset($_POST['managementCore'])){
	if ($_POST['managementCore']=='crear'){
		include_once './core/CrearGestionEntidad.php';
		$managementCore = new managementCore();
		$respuesta = $managementCore->ejecutarmanagementCore();
		header('Content-type: application/json');
		echo(json_encode($respuesta));
		exit();
	}
	else{
		 
	}
}

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
/*	if ($rest == 'funcionesesquema'){
		include './Comun/funcionesEsquema.php';
		funcionesesquema();
	}*/
}
else{
	$mensaje = '';
	$respuesta = array('ok' => false, 'code' => 'controlador_vacio', 'resource' => $mensaje);
	header('Content-type: application/json');
	echo(json_encode($respuesta));
	exit();
}

if (isset($_POST['action'])){
	if ($_POST['action']==''){
		$mensaje = '';
		$respuesta = array('ok' => false, 'code' => 'accion_vacia', 'resource' => $mensaje);
		header('Content-type: application/json');
		echo(json_encode($respuesta));
		exit();
	}
	else{
		$action = $_POST['action'];
	}
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
	$res = comprobar_si_existe_clase($rest);
	if ($res['ok']){
		$nombrerest = new $rest;
	}
	else{
		$mensaje = 'No existe el controlador indicado : '.$rest;
		$respuesta = array('ok' => false, 'code' => 'controlador_invalido_KO', 'resource' => $mensaje);
		header('Content-type: application/json');
		echo(json_encode($respuesta));
		//escribirLogInterno($res['resource']);
		exit();
	}
}
else{
	$mensaje = 'No existe la definición del controlador indicada : '.$fichero;
	$respuesta = array('ok' => false, 'code' => 'definicion_controlador_invalida_KO', 'resource' => $mensaje);
	header('Content-type: application/json');
	echo(json_encode($respuesta));
	//escribirLogInterno($res['resource']);
	exit();
}



?>
