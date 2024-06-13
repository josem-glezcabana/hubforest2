<?php

function LAB_PROCESS_TEST(){


	include_once './Base/TEST_CLASS_sin_CURL.php';


	$pruebas = new apptestNoRest_sin_CURL();

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'lab_process';
	$accion = 'ADD';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'añadir correcto';
	$POST = array(
				'name_lab_process'=> 'labTest1', 
				'description_lab_process'=> 'Proceso de laboratorio para tests',
				'bib_lab_process'=> 'biblabTest',
                'file_lab_process'=> 'filetest.txt',
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'lab_process';
	$accion = 'EDIT';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'editar correcto';
	$POST = array(
                'id_lab_process'=> 2,
                'name_lab_process'=> 'labTest1', 
                'description_lab_process'=> 'Proceso de laboratorio para tests editada',
				'bib_lab_process'=> 'biblabTest',
                'file_lab_process'=> 'filetest.txt',
                'controlador'=>$entidad,
                'action'=>$accion
            );

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'lab_process';
	$accion = 'DELETE';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'delete proceso de laboratorio correcto';
	$POST = array('id_lab_process' => 5,
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------------
	$prueba = 'delete proceso de laboratorio incorrecto: no se indica id_lab_process';
	$POST = array('name_lab_process' => 'nombreprueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'id_lab_process_es_nulo_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //rol
	$entidad = 'lab_process';
	$accion = 'SEARCH';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar proceso de laboratorio por nombre correcto
	$prueba = 'search proceso de laboratorio por nombre correcto';
	$POST = array('name_lab_process' => 'labTest1',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_DATOS';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar proceso de laboratorio por nombre no existente
	$prueba = 'search proceso de laboratorio por nombre no existente';
	$POST = array('name_lab_process' => 'prueba',
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
