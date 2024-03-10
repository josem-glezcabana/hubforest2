<?php

//interrogación a esquema de la bd
//@params
//controlador: funcionesesquema
//action: listatablas : devuelve lista de nombres de tablas o acceso_BD_KO
//action: estructuratabas, $_POST['tabla'] trae el nombre de la tabla : devuelve estructura tabla (show columns) o no_existe_tabla_KO

function funcionesesquema(){

    header('Access-Control-Allow-Origin: *');

    if (!(isset($_POST['action']))){
        $respuesta = array('ok' => false, 'code' => 'no_exite_action_KO', 'resource' => '');
        header('Content-type: application/json');
        echo(json_encode($respuesta));
        exit();
    }

    if (!(($_POST['action'] == 'listatablas') || ($_POST['action'] == 'estructuratabla'))){
        $respuesta = array('ok' => false, 'code' => 'acción_no_permitida_KO', 'resource' => 'action : '.$_POST['action']);
        header('Content-type: application/json');
        echo(json_encode($respuesta));
        exit();
    }

    if (($_POST['action'] == 'listatablas')){
        include_once './Base/mapping.php';
        $query = "show tables";
        $mapping = new mapping('');
        $res = $mapping->lanzarqueryconresults($query);
        if (($res['ok'] == false)){
            $respuesta = array('ok' => false, 'code' => 'acceso_BD_KO', 'resource' => '');
            header('Content-type: application/json');
            echo(json_encode($respuesta));
            exit();
        }
        else{
            $respuesta = array('ok' => true, 'code' => 'lista_tablas_OK', 'resource' => $res['resource']);
            header('Content-type: application/json');
            echo(json_encode($respuesta));
            exit();
        }
    }

    if (($_POST['action'] == 'estructuratabla')){

        if (!(isset($_POST['tabla']))){
            $respuesta = array('ok' => false, 'code' => 'nombre_tabla_vacio_KO', 'resource' => '');
            header('Content-type: application/json');
            echo(json_encode($respuesta));
            exit();
        }
        $tabla = $_POST['tabla'];
        include_once './Base/mapping.php';
        $query = "show columns from ".$tabla;
        $mapping = new mapping('');
        $res = $mapping->lanzarqueryconresults($query);
        if (($res['ok'] == false)){
            $respuesta = array('ok' => false, 'code' => 'no_existe_tabla_KO', 'resource' => 'Nombre tabla : '.$tabla);
            header('Content-type: application/json');
            echo(json_encode($respuesta));
            exit();
        }
        else{
            $respuesta = array('ok' => true, 'code' => 'estructura_tabla_OK', 'resource' => $res['resource']);
            header('Content-type: application/json');
            echo(json_encode($respuesta));
            exit();
        }
    }

}

//funcion que comprueba si se puede conectar con el gestor en la bd indicada en DBCredencials.php para las bd de produccion y test

function Comprobar_si_existe_BD(){

	//Activamos todas las notificaciones de error posibles
	error_reporting (E_ALL);
	//Definimos el tratamiento de errores no controlados
	set_error_handler(function () 
	{
		throw new Exception("Error");
	});
	  
	try {
		$conn = new mysqli(host, user, pass, BD);
	} catch(Exception $e) { //capturamos un posible error
	
		$mensaje = 'No esta definida la BD o los usuarios'.$e->getMessage();
		$respuesta = array('ok' => false, 'code' => 'BD_not_defined_KO', 'resource' => $mensaje);
		header('Content-type: application/json');
		echo(json_encode($respuesta));
		//escribirLogInterno($respuesta['resource']);
		exit();

	}

	try {
		$conn = new mysqli(host, user, pass, BD_test);
	} catch(Exception $e) { //capturamos un posible error
	
		$mensaje = 'No esta definida la BD o los usuarios'.$e->getMessage();
		$respuesta = array('ok' => false, 'code' => 'BD_not_defined_KO', 'resource' => $mensaje);
		header('Content-type: application/json');
		echo(json_encode($respuesta));
		//escribirLogInterno($respuesta['resource']);
		exit();

	}

    // select_db() solo se puede utilizar para cambiar la bd seleccionada en la creacion del handler del mysqli (new mysqli)

	/*try {
		$conn->select_db(BD_test);
	} catch(Exception $e) { //capturamos un posible error
	
		$mensaje = 'No esta definida la base de datos de test '.$e->getMessage();
		$respuesta = array('ok' => false, 'code' => 'BD_test_not_exist_KO', 'resource' => $mensaje);
		header('Content-type: application/json');
		echo(json_encode($respuesta));
		//escribirLogInterno($respuesta['resource']);
		exit();

	}

	try {
		$conn->select_db(DB);
	} catch(Exception $e) { //capturamos un posible error	
	
		$mensaje = 'No esta definida la base de datos de producción '.$e->getMessage();
		$respuesta = array('ok' => false, 'code' => 'BD_run_conexion_KO', 'resource' => $mensaje);
		header('Content-type: application/json');
		echo(json_encode($respuesta));
		//escribirLogInterno($respuesta['resource']);
		exit();

	}*/

	$mensaje = 'Base de Datos y usuarios correctos'.BD;
	$respuesta = array('ok' => true, 'code' => 'BD_OK', 'resource' => $mensaje);
	header('Content-type: application/json');
	echo(json_encode($respuesta));
	exit();

	//Restablecemos el tratamiento de errores
	restore_error_handler();

}

?>