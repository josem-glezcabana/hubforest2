<?php

function TEMPORAL_SAMPLING_SITE_PARAMS_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'temporal_sampling_site_params';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir temporal_sampling_site_params
  $prueba = 'Add temporal_sampling_site_params';
  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 1,
    'category_param' => 'humus',
    'name_ecosystem_param' => 'test_param',
    'values_ecosystem_param' => '20',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';


  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar temporal_sampling_site_params
  $prueba = 'delete temporal_sampling_site_params';
  $POST = array(
    'id_ecosystem_param' => 2,
    'id_project' => 3,
    'id_ecosystem' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar temporal_sampling_site_params por category_param
  $prueba = 'search temporal_sampling_site_params por category_param';
  $POST = array(
    'category_param' => 'ecosystem',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete sin id_ecosystem_param
  $prueba = 'delete temporal_sampling_site_params incorrecto: no se indica id_ecosystem_param';
  $POST = array(
    'id_ecosystem' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_ecosystem_param_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>