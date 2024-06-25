<?php

function CHARACTERISTIC_SAMPLE_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'characteristic_sample';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir characteristic_sample
  $prueba = 'Add characteristic sample: se intenta añadir uno que ya existe';
  $POST = array(
    'id_characteristic' => 1,
    'id_unit' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir characteristic_sample
  $prueba = 'Add characteristic sample';
  $POST = array(
    'id_characteristic' => 1,
    'id_unit' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir characteristic_sample
  $prueba = 'Add characteristic sample';
  $POST = array(
    'id_characteristic' => 2,
    'id_unit' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $accion = 'DELETE';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar characteristic_sample
  $prueba = 'delete characteristic sample';
  $POST = array(
    'id_characteristic' => 1,
    'id_unit' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar characteristic_sample por id unit
  $prueba = 'search characteristic sample por id unidad';
  $POST = array(
    'id_unit' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete con un id characteristic
  $prueba = 'delete characteristic_sample incorrecto: no se indica id_characteristic';
  $POST = array(
    'id_unit' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_characteristic_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>