<?php

function AUTH_TEST(){


	include_once './Base/TEST_CLASS_sin_CURL.php';


	$pruebas = new apptestNoRest_sin_CURL();

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'AUTH';
	$accion = 'REGISTRAR';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'registrar correcto';
	$POST = array(
				'dni'=> '99', 
				'nombre_persona'=> 'Nombre9', 
				'apellidos_persona'=> 'Apellidos9',
				'fechaNacimiento_persona'=> '09/09/9999', 
				'direccion_persona'=> 'Direccion9',
				'telefono_persona'=> '999999999',
				'email_persona'=> '99@99.99',
				'foto_persona'=> 'Foto9.png',
				'usuario'=>'usuario99',
				'contrasena'=>'contrasena99',
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'REGISTRAR_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------

$prueba = 'registrar correcto';
	$POST = array(
				'dni'=> '11111111A', 
				'nombre_persona'=> 'Nombrea', 
				'apellidos_persona'=> 'Apellidosa',
				'fechaNacimiento_persona'=> '09/09/9999', 
				'direccion_persona'=> 'Direcciona',
				'telefono_persona'=> '999999998',
				'email_persona'=> '99@99.999',
				'foto_persona'=> 'Foto9.png',
				'usuario'=>'usuarioxx',
				'contrasena'=>'contrasenaxx',
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'REGISTRAR_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'AUTH';
	$accion = 'LOGIN';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'login usuario incorrecto';
	$POST = array('usuario' => 'usuario98', 'contrasena' => 'contrasena99','controlador'=>'AUTH','action'=>'LOGIN');
	$codeEsperado = 'USUARIO_LOGIN_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'login usuario correcto';
	$POST = array('usuario' => 'usuario99', 'contrasena' => 'contrasena99','controlador'=>'AUTH','action'=>'LOGIN');
	$codeEsperado = 'LOGIN_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'login contraseña correcto';
	$POST = array('usuario' => 'usuario99', 'contrasena' => 'contrasena98','controlador'=>'AUTH','action'=>'LOGIN');
	$codeEsperado = 'USUARIO_PASS_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'AUTH';
	$accion = 'CAMBIAR_CONTRASENA';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'cambiar contraseña correcto';
	$POST = array('dni' => '1', 'contrasena' => 'contrasena99','controlador'=>'AUTH','action'=>'CAMBIAR_CONTRASENA');
	$codeEsperado = 'CAMBIAR_contrasena_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------

	//---------------------------------------------------------------------------------------------------------------------	
	//persona
	$entidad = 'usuario';
	$accion = 'DELETE';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------
	
	$prueba = 'borrar usuario registrado';
	$POST = array(
				'dni'=> '99',
				'controlador'=>$entidad,
				'action'=>$accion
			);
	
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------
	
	$prueba = 'borrar usuario registrado';
	$POST = array(
				'dni'=> '11111111A',
				'controlador'=>$entidad,
				'action'=>$accion
			);
	
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------
	
	//persona
	$entidad = 'persona';
	$accion = 'DELETE';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------
	
	$prueba = 'borrar persona registrada';
	$POST = array(
				'dni'=> '99', 
				'controlador'=>$entidad,
				'action'=>$accion
			);
	
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);



	


//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	return $pruebas->resultadoTest;



}








?>
