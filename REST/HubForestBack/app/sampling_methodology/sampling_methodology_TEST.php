<?php

function SAMPLING_METHODOLOGY_TEST(){


	include_once './Base/TEST_CLASS_sin_CURL.php';


	$pruebas = new apptestNoRest_sin_CURL();

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'sampling_methodology';
	$accion = 'ADD';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'añadir correcto';
	$POST = array(
				'name_methodology'=> 'methodTest1', 
				'description_methodology'=> 'Metodología para tests',
				'bibref_methodology'=> 'bibrefTest',
                'file_methodology'=> 'filetest.txt',
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'sampling_methodology';
	$accion = 'EDIT';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'editar correcto';
	$POST = array(
                'id_sampling_methodology'=> 2,
                'name_methodology'=> 'methodTest1', 
                'description_methodology'=> 'Metodología para tests editada',
				'bibref_methodology'=> 'bibrefTest',
                'file_methodology'=> 'filetest.txt',
                'controlador'=>$entidad,
                'action'=>$accion
            );

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'sampling_methodology';
	$accion = 'DELETE';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'delete metodología de muestra correcto';
	$POST = array('id_sampling_methodology' => 5,
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------------
	$prueba = 'delete metodología de muestra incorrecto: no se indica id_sampling_methodology';
	$POST = array('name_methodology' => 'nombreprueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'id_sampling_methodology_es_nulo_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //rol
	$entidad = 'sampling_methodology';
	$accion = 'SEARCH';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar metodología de muestra por nombre correcto
	$prueba = 'search metodología de muestra por nombre correcto';
	$POST = array('name_methodology' => 'methodTest1',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_DATOS';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar metodología de muestra por nombre no existente
	$prueba = 'search metodología de muestra por nombre no existente';
	$POST = array('name_methodology' => 'prueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_VACIO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	return $pruebas->resultadoTest;

}








?>
