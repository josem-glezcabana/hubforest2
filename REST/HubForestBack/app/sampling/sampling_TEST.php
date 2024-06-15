<?php

function SAMPLING_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'sampling';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir sampling
  $prueba = 'Add sampling';
  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 2,
    'id_sampling' => 3,
    'id_site' => 1,
    'date_sampling' => '2024-06-06',
    'time_sampling' => '10:10:00',
    'temp_air_sampling' => 20,
    'collectors_sampling' => 'colector',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 1,
    'id_sampling' => 4,
    'id_site' => 1,
    'date_sampling' => '2024-06-06',
    'time_sampling' => '10:10:00',
    'temp_air_sampling' => 20,
    'collectors_sampling' => 'colector',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 1,
    'id_sampling' => 5,
    'id_site' => 1,
    'date_sampling' => '2024-06-06',
    'time_sampling' => '10:10:00',
    'temp_air_sampling' => 20,
    'collectors_sampling' => 'colector',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';


  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar sampling
  $prueba = 'delete sampling';
  $POST = array(
    'id_sampling' => 3,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar sampling por name_ecosystem
  $prueba = 'search ecosystem por date-sampling';
  $POST = array(
    'date_sampling' => '2024-06-06',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete sin id_sampling
  $prueba = 'delete sampling incorrecto: no se indica id_sampling';
  $POST = array(
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_sampling_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>