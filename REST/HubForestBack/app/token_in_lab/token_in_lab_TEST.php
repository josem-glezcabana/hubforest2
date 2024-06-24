<?php

function TOKEN_IN_LAB_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  $entidad = 'token_in_lab';
  $accion = 'EDIT';
  $tipo = 'Accion';



  $accion = 'ADD';
  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir token in lab
  $prueba = 'Add token in lab';
  $POST = array(
    'id_token_in_sampling' => 1,
    'id_lab_process' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'id_token_in_sampling' => 2,
    'id_lab_process' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //--------------------------------------------------------------------------------------------------------------------
  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba buscar token in lab por id token in sampling
  $prueba = 'search unidad por id token in sampling';
  $POST = array(
    'id_token_in_sampling' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar token in lab por id lab process
  $prueba = 'search token in lab por id lab process';
  $POST = array(
    'id_lab_process' => 4,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_VACIO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar token in lab correcto
  $prueba = 'delete token in lab correcto';
  $POST = array(
    'id_token_in_lab' => 2,
    'id_token_in_sampling' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------------------------------------
//Prueba borrar toke in lab incorrecto
  $prueba = 'delete token in lab incorrecto: no se indica id_token_in_sampling';
  $POST = array(
    'id_token_in_sampling' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_token_in_lab_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>