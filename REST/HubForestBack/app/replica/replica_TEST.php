<?php

function REPLICA_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'replica';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir replica
  $prueba = 'Add replica';
  $POST = array(
    'id_replica' => 'TEST_1',
    'id_project' => 1,
    'id_ecosystem' => 2,
    'id_site' => 1,
    'id_sampling' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir replica 
  $prueba = 'Add replica';
  $POST = array(
    'id_replica' => 'TEST_3',
    'id_project' => 1,
    'id_ecosystem' => 1,
    'id_site' => 1,
    'id_sampling' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir replica erroneo
  $prueba = 'Add replica';
  $POST = array(
    'id_replica' => 'TEST_3',
    'id_project' => 1,
    'id_ecosystem' => 1,
    'id_site' => 1,
    'id_sampling' => 1,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);




  $accion = 'DELETE';
  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar replica
  $prueba = 'delete replica';
  $POST = array(
    'id_replica' => 'TEST_3',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------


  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar replica por name_caracteristic
  $prueba = 'search replica por id_ecosystem';
  $POST = array(
    'id_ecosystem' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';

 
  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>