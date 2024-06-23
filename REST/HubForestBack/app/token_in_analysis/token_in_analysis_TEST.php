<?php

function TOKEN_IN_ANALYSIS_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'token_in_analysis';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir token in analysis
  $prueba = 'Add token in analysis';
  $POST = array(
    'id_token_in_lab' => 1, 
    'id_analysis_technique' => 1, 
    'id_analysis_preparation' => 1,
    
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'id_token_in_lab' => 1, 
    'id_analysis_technique' => 2, 
    'id_analysis_preparation' => 1,
    
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'id_token_in_lab' => 1, 
    'id_analysis_technique' => 1, 
    'id_analysis_preparation' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);
//Prueba añadir token in analysis erroneo
$prueba = 'Add token in analysis erroneo';
  $POST = array(
    'id_token_in_lab' => 0, 
    'id_analysis_technique' => 1, 
    'id_analysis_preparation' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar token in analysis por name_ecosystem
  $prueba = 'search ecosystem por date-token in analysis';
  $POST = array(
    'id_analysis_preparation' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);



  $accion = 'DELETE';


  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar token in analysis
  $prueba = 'delete token in analysis';
  $POST = array(
    'id_token_in_analysis' => 3,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete sin id_token in analysis
  $prueba = 'delete token in analysis incorrecto: no se indica id_token in analysis';
  $POST = array(
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_token_in_analysis_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>