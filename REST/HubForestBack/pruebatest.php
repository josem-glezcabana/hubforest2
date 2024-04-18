<?php

	header('Access-Control-Allow-Origin: *');

	session_start();
	$_SESSION['test'] = true;

	//$tabla = $_POST['tabla'];
	$tabla = 'area';
	include_once './Base/mapping.php';
	$query = "show columns from ".$tabla;
	$mapping = new mapping('');
	$res = $mapping->lanzarqueryconresults($query);
	if (($res['ok'] == false)){
		echo 'nombre de tabla invalido';
	}
	else{
	
		$estructura = $res['resource'];
		var_dump($res);
		echo '<br><br>';
		$fecha = date('d/m/Y(H:i:s)', time());
		echo $fecha;
		echo '<br><br>';

		$listaatributos = array();
		$notnull = array();
		$listaprimarias = array();
		$listaautoincrementales = array();
		$listaunicos = array();

		$nonulos = array();
		$primarias = array();
		$autoincrementales = array();
		$unicos = array();

		
		foreach($estructura as $atributo){

			var_dump($atributo);
			
			array_push($listaatributos, $atributo['Field']);
			
			if ($atributo['Extra'] == 'auto_increment'){
				array_push($autoincrementales, $atributo['Field']);
			}
			
			if ($atributo['Null'] == 'NO'){
				if ($atributo['Extra'] == 'auto_increment'){}
				else{
					array_push($nonulos, $atributo['Field']);
				}
			}

			if ($atributo['Key'] == 'PRI'){
				array_push($primarias, $atributo['Field']);
			}

			if ($atributo['Key'] == 'UNI'){
				array_push($unicos, $atributo['Field']);
			}

			echo '<br><br>';
			
		}

		echo '<br><br>';
		echo 'Lista atributos<br>';
		var_dump($listaatributos);

		
		$notnull['ADD'] = $nonulos;
		$notnull['EDIT'] = $listaatributos;
		$notnull['DELETE'] = $primarias;
		echo '<br><br>';
		echo 'Lista nulos<br>';
		var_dump($notnull);

		
		$listaprimarias = $primarias;
		echo '<br><br>';
		echo 'Lista primarias<br>';
		var_dump($listaprimarias);

		$listaautoincrementales = $autoincrementales;
		echo '<br><br>';
		echo 'Lista autoincrementales<br>';
		var_dump($listaautoincrementales);

		$listaunicos = $unicos;
		echo '<br><br>';
		echo 'Lista unicos<br>';
		var_dump($listaunicos);
		/*
		header('Content-type: application/json');
		echo(json_encode($res));*/

		session_destroy();

	}


?>