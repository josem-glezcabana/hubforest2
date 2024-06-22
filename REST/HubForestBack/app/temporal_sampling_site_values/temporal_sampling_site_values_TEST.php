<?php

function TEMPORAL_SAMPLING_SITE_VALUES_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'temporal_sampling_site_values';
  $accion = 'ADD';
  $tipo = 'Accion';


  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir temporal_sampling_site_values
  $prueba = 'Add temporal_sampling_site_values';
  $POST = array(
    'id_ecosystem_param' => 4,
    'id_replica' => 'TEST_1',
    'id_sampling' => 3,
    'value_ecosystem_param' => '200',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar temporal_sampling_site_values por replica
  $prueba = 'search temporal_sampling_site_values por replica';
  $POST = array(
    'id_replica' => 'TEST_1',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);
  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar temporal_sampling_site_values que no existe
  $prueba = 'search temporal_sampling_site_values que no existe';
  $POST = array(
    'id_replica' => 'TEST_2',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_VACIO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar temporal_sampling_site_values
  $prueba = 'delete temporal_sampling_site_values';
  $POST = array(
    'id_ecosystem_param' => 4,
    'id_replica' => 'TEST_1',
    'id_sampling' => 3,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete sin id_ecosystem_param
  $prueba = 'delete temporal_sampling_site_values incorrecto: no se indica id_ecosystem_param';
  $POST = array(
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