<?php

function STORAGE_METHOD_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'storage_method';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir storage_method
  $prueba = 'Add storage_method';
  $POST = array(
    'name_storage_method' => 'Prueba',
    'description_storage_method' => 'Prueba',
    'storage_container' => 'PVC core',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'name_storage_method' => 'Prueba2',
    'description_storage_method' => 'Prueba2',
    'storage_container' => 'Plastic bag',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';


  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar storage_method
  $prueba = 'delete storage_method';
  $POST = array(
    'id_storage_method' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar sampling por name_storage_method
  $prueba = 'search ecosystem por name_storage_method';
  $POST = array(
    'name_storage_method' => 'Prueba',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete sin storage_method
  $prueba = 'delete storage_method incorrecto: no se indica id_storage_method';
  $POST = array(
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_storage_method_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>