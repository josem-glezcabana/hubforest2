<?php

function PROJECT_TEST(){


	include_once './Base/TEST_CLASS_sin_CURL.php';


	$pruebas = new apptestNoRest_sin_CURL();

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'project';
	$accion = 'ADD';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'añadir correcto';
	$POST = array(
				'name_project'=> 'AddTestProject', 
				'start_date_project'=> '2024-07-31', 
				'end_date_project'=> '2024-12-31', 
				'responsable_project'=> 1,
				'organization_project'=> 'Org1',
				'description_project'=> 'Proyecto de prueba para tests',
				'code_project'=> 'ADDT1',
                'acronym_project'=> 'ADDPTest',
				'id_sampling_methodology'=> 1,
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'project';
	$accion = 'ADD';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'añadir incorrecto: formato erróneo de fechas';
	$POST = array(
				'name_project'=> 'AddTestProject', 
				'start_date_project'=> '31-07-2024', 
				'end_date_project'=> '31-08-2024', 
				'responsable_project'=> 1,
				'organization_project'=> 'Org1',
				'description_project'=> 'Proyecto de prueba para tests',
				'code_project'=> 'ADDT1',
                'acronym_project'=> 'ADDPTest',
				'id_sampling_methodology'=> 1,
				'controlador'=>$entidad,
				'action'=>$accion
			);

	$codeEsperado = 'SQL_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'project';
	$accion = 'EDIT';
	$tipo = 'Accion';

	//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'editar correcto';
	$POST = array(
                'id_project'=> 5,
                'name_project'=> 'AddTestProject', 
                'start_date_project'=> '2024-07-31', 
                'end_date_project'=> '2024-12-31', 
                'responsable_project'=> 1,
                'organization_project'=> 'testOrg',
                'description_project'=> 'Proyecto de prueba para tests',
                'code_project'=> 'TEST123',
                'acronym_project'=> 'PTest',
                'id_sampling_methodology'=> 1,
                'controlador'=>$entidad,
                'action'=>$accion
            );

	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

	//rol
	$entidad = 'project';
	$accion = 'DELETE';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------

	$prueba = 'delete proyecto correcto';
	$POST = array('id_project' => 5,
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'SQL_OK';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------------
//Prueba buscar proyecto por nombre correcto
	$prueba = 'delete proyecto incorrecto: no se indica id_project';
	$POST = array('name_project' => 'nombreprueba',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'id_project_es_nulo_KO';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

    //rol
	$entidad = 'project';
	$accion = 'SEARCH';
	$tipo = 'Accion';

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar proyecto por nombre correcto
	$prueba = 'search proyecto por nombre correcto';
	$POST = array('name_project' => 'TestProject',
                'controlador'=>$entidad,
                'action'=>$accion
            );
	$codeEsperado = 'RECORDSET_DATOS';
	$pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

	//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
//Prueba buscar proyecto por nombre no existente
	$prueba = 'search proyecto por nombre no existente';
	$POST = array('name_project' => 'prueba',
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
