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
				'name_user'=> 'user99', 
				'surname_user'=> 'Nombre9', 
				'organization_user'=> 'Apellidos9',
				'email_user'=> 'user99@email.com', 
				'passwd'=> 'dc647eb65e6711e155375218212b3964',		// contraseña encriptada utilizando algoritmo md5
				'position_user'=> '999999999',
				'is_admin'=> 'true',
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
//Prueba usuario incorrecto, la contraseña no está encriptada en md5
	$prueba = 'login usuario incorrecto';
	$POST = array('name_user' => 'passwd', 'passwd' => 'prueba','controlador'=>'AUTH','action'=>'LOGIN');
	$codeEsperado = 'USUARIO_LOGIN_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------
//Prueba usuario correcto, la contraseña está encriptada en md5
	$prueba = 'login usuario correcto';
	$POST = array('name_user' => 'user99', 'passwd' => 'dc647eb65e6711e155375218212b3964','controlador'=>'AUTH','action'=>'LOGIN');
	$codeEsperado = 'LOGIN_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------
//Prueba usuario admin correcto, la contraseña está encriptada en md5
	$prueba = 'login contraseña correcto';
	$POST = array('name_user' => 'user99', 'passwd' => 'passwd','controlador'=>'AUTH','action'=>'LOGIN');
	$codeEsperado = 'USUARIO_LOGIN_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'AUTH';
	$accion = 'CAMBIAR_CONTRASENA';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'cambiar contraseña correcto';
	$POST = array('name_user' => 'user99', 'passwd' => 'prueba_cambio_contraseña','controlador'=>'AUTH','action'=>'CAMBIAR_CONTRASENA');
	$codeEsperado = 'CAMBIAR_contrasena_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//---------------------------------------------------------------------------------------------------------------------



	


//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	return $pruebas->resultadoTest;



}








?>
