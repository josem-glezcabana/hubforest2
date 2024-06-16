<?php

function PROJECT_ECOSYSTEM_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'project_ecosystem';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir project_ecosystem
  $prueba = 'Add project_ecosystem';
  $POST = array(
    'id_project' => 16,
    'id_ecosystem' => 16,
    'number_replicas_by_sampling' => 2,
    'number_samplings' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir project_ecosystem 
  $prueba = 'Add project_ecosystem';
  $POST = array(
    'id_project' => 1,
    'id_ecosystem' => 2,
    'number_replicas_by_sampling' => 2,
    'number_samplings' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir project_ecosystem erroneo
  $prueba = 'Add project_ecosystem';
  $POST = array(
    'id_project' => 0,
    'id_ecosystem' => 0,
    'number_replicas_by_sampling' => 2,
    'number_samplings' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);




  $accion = 'DELETE';
  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar project_ecosystem
  $prueba = 'delete project_ecosystem';
  $POST = array(
    'id_project' => 16,
    'id_ecosystem' => 16,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------


  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar project_ecosystem por name_caracteristic
  $prueba = 'search project_ecosystem por number_replicas_by_sampling';
  $POST = array(
    'number_replicas_by_sampling' => 2,
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