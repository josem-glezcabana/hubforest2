<?php

function TOKEN_IN_SAMPLING_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'token_in_sampling';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir token in sampling
  $prueba = 'Add token in sampling';
  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 1,
    'id_storage_method' => 1,
    'id_technique_sample' => 1,
    
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 1,
    'id_storage_method' => 1,
    'id_technique_sample' => 1,
    
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 2,
    'id_storage_method' => 1,
    'id_technique_sample' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);
//Prueba añadir token in sampling erroneo
$prueba = 'Add token in sampling erroneo';
  $POST = array(
    'id_project' => 0,
    'id_ecosystem' => 1,
    'id_storage_method' => 1,
    'id_technique_sample' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar token in sampling por name_ecosystem
  $prueba = 'search ecosystem por date-token in sampling';
  $POST = array(
    'id_ecosystem' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);



  $accion = 'DELETE';


  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar token in sampling
  $prueba = 'delete token in sampling';
  $POST = array(
    'id_token_in_sampling' => 3,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete sin id_token in sampling
  $prueba = 'delete token in sampling incorrecto: no se indica id_token in sampling';
  $POST = array(
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_token_in_sampling_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>