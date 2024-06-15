<?php

function ANALYSIS_PREPARATION_TEST(){


	include_once './Base/TEST_CLASS_sin_CURL.php';


	$pruebas = new apptestNoRest_sin_CURL();

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'analysis_preparation';
	$accion = 'ADD';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'añadir correcto';
	$POST = array(
				'name_analysis_preparation'=> 'prepAnalysisTest1', 
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'analysis_preparation';
	$accion = 'EDIT';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'editar correcto';
	$POST = array(
                'id_analysis_preparation'=> 2,
                'name_analysis_preparation'=> 'prepAnalysisTest1Edited', 
                'controlador'=>$entidad,
                'action'=>$accion
            );

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'analysis_preparation';
	$accion = 'DELETE';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'delete preparación de análisis correcto';
	$POST = array('id_analysis_preparation' => 3,
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------------
	$prueba = 'delete preparación de análisis incorrecto: no se indica id_analysis_preparation';
	$POST = array('name_analysis_preparation' => 'nombreprueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'id_analysis_preparation_es_nulo_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //rol
	$entidad = 'analysis_preparation';
	$accion = 'SEARCH';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar preparación de análisis por nombre correcto
	$prueba = 'search preparación de análisis por nombre correcto';
	$POST = array('name_analysis_preparation' => 'prepAnalysisTest1',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_DATOS';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar preparación de análisis por nombre no existente
	$prueba = 'search preparación de análisis por nombre no existente';
	$POST = array('name_analysis_preparation' => 'prueba',
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
