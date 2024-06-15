<?php

function ANALYSIS_TECHNIQUE_TEST(){


	include_once './Base/TEST_CLASS_sin_CURL.php';


	$pruebas = new apptestNoRest_sin_CURL();

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'analysis_technique';
	$accion = 'ADD';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'añadir correcto';
	$POST = array(
				'name_analysis_technique'=> 'techniqueTest1', 
				'description_analysis_technique'=> 'Técnica de análisis para tests',
				'bib_analysis_technique'=> 'bibrefTest',
                'file_analysis_tecnique'=> 'filetest.txt',
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'analysis_technique';
	$accion = 'EDIT';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'editar correcto';
	$POST = array(
                'id_analysis_technique'=> 2,
                'name_analysis_technique'=> 'techniqueTest1', 
                'description_analysis_technique'=> 'Técnica de análisis para tests editada',
				'bib_analysis_technique'=> 'bibrefTest',
                'file_analysis_tecnique'=> 'filetest.txt',
                'controlador'=>$entidad,
                'action'=>$accion
            );

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'analysis_technique';
	$accion = 'DELETE';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'delete técnica de análisis correcto';
	$POST = array('id_analysis_technique' => 5,
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------------
	$prueba = 'delete técnica de análisis incorrecto: no se indica id_analysis_technique';
	$POST = array('name_analysis_technique' => 'nombreprueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'id_analysis_technique_es_nulo_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //rol
	$entidad = 'analysis_technique';
	$accion = 'SEARCH';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar técnica de análisis por nombre correcto
	$prueba = 'search técnica de análisis por nombre correcto';
	$POST = array('name_analysis_technique' => 'techniqueTest1',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_DATOS';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar técnica de análisis por nombre no existente
	$prueba = 'search técnica de análisis por nombre no existente';
	$POST = array('name_analysis_technique' => 'prueba',
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
