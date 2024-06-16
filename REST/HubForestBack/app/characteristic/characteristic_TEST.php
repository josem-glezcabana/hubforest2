<?php

function CHARACTERISTIC_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'characteristic';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir characteristic con number
  $prueba = 'Add characteristic';
  $POST = array(
    'name_characteristic' => 'Test 1',
    'description_characteristic' => 'Test 1',
    'data_type_characteristic' => 'number',
    'bibref_characteristic' => 'Test 1',
    'file_characteristic' => 'Test 1',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir characteristic con set
  $prueba = 'Add characteristic';
  $POST = array(
    'name_characteristic' => 'Test 2',
    'description_characteristic' => 'Test 2',
    'data_type_characteristic' => 'number',
    'bibref_characteristic' => 'Test 2',
    'file_characteristic' => 'Test 2',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir characteristic 
  $prueba = 'Add characteristic';
  $POST = array(
    'name_characteristic' => 'Test 3',
    'description_characteristic' => 'Test 3',
    'data_type_characteristic' => 'number',
    'bibref_characteristic' => 'Test 3',
    'file_characteristic' => 'Test 3',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);




  $accion = 'DELETE';
  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar characteristic
  $prueba = 'delete characteristic';
  $POST = array(
    'id_characteristic' => 3,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------


  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar characteristic por name_caracteristic
  $prueba = 'search characteristic por name charcateristic';
  $POST = array(
    'name_characteristic' => 'Test 3',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete con un id characteristic
  $prueba = 'delete characteristic ';
  $POST = array(
    'id_characteristic' => 5,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>