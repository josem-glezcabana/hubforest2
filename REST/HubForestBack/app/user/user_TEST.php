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
				'name_user'=> ' Nombre2', 
				'surname_user'=> 'Apellid2', 
				'position_user'=> '999999999',
				'organization_user'=> 'Org1',
				'email_user'=> 'user@email.com', 
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'user';
	$accion = 'DELETE';
	$tipo = 'Accion';

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
	
    //rol
	$entidad = 'user';
	$accion = 'SEARCH';
	$tipo = 'Accion';

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

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	return $pruebas->resultadoTest;

}








?>
