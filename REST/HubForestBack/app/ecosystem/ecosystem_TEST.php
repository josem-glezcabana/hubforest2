<?php

function ECOSYSTEM_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'ecosystem';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir ecosystem_sample
  $prueba = 'Add ecosystem';
  $POST = array(
    'name_ecosystem' => 'Prueba',
    'bib_ref_ecosystem' => 'Prueba',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $prueba = 'Add ecosystem';
  $POST = array(
    'name_ecosystem' => 'Prueba2',
    'bib_ref_ecosystem' => 'Prueba2',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $prueba = 'Add ecosystem';
  $POST = array(
    'name_ecosystem' => 'Prueba3',
    'bib_ref_ecosystem' => 'Prueba3',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $accion = 'DELETE';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar ecosystem
  $prueba = 'delete ecosystem';
  $POST = array(
    'id_ecosystem' => 3,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar ecosystem por name_ecosystem
  $prueba = 'search ecosystem por name_ecosystem';
  $POST = array(
    'name_ecosystem' => 'Prueba',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba delete sin id_ecosystem
  $prueba = 'delete ecosystem incorrecto: no se indica id_ecosystem';
  $POST = array(
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_ecosystem_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>