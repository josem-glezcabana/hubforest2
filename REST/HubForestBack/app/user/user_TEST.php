<?php

function USER_TEST(){


	include_once './Base/TEST_CLASS_sin_CURL.php';


	$pruebas = new apptestNoRest_sin_CURL();

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'user';
	$accion = 'EDIT';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'editar correcto';
	$POST = array(
				'id_user'=> 5,
				'name_user'=> ' Nombre2', 
				'surname_user'=> 'Apellid2', 
				'position_user'=> '999999999',
				'organization_user'=> 'Org1',
				'email_user'=> 'nombre@email.com',
				'passwd'=> '519aff21ba5d7bc5c4383a08e8736e97',	// contraseña en md5 del usuario
				'is_admin'=> 'NO',
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$accion = 'SEARCH';

	//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar usuario por nombre correcto
	$prueba = 'search usuario por nombre correcto';
	$POST = array('name_user' => 'user',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_DATOS';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar usuario por nombre no encontrado
	$prueba = 'search usuario por nombre correcto';
	$POST = array('name_user' => 'prueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_VACIO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

	//rol
	$accion = 'DELETE';

//---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar usuario correcto
	$prueba = 'delete usuario correcto';
	$POST = array('id_user' => 3,
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar usuario por nombre correcto
	$prueba = 'delete usuario incorrecto: no se indica id_user';
	$POST = array('name_user' => 'nombreprueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'id_user_es_nulo_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	return $pruebas->resultadoTest;

}








?>
