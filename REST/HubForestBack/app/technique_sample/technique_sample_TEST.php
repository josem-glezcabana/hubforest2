<?php

function TECHNIQUE_SAMPLE_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'technique_sample';
  $accion = 'ADD';
  $tipo = 'Accion';


  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir technique_sample
  $prueba = 'Add technique_sample';
  $POST = array(
    'name_technique_sample' => 'technique_test',
    'description_technique_sample' => 'test description for the new technique',
    'bib_technique_sample' => 'bibref_Test',
    'file_technique_sample' => 'new_file_test.txt',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------
  
  $accion = 'EDIT';
  
  //---------------------------------------------------------------------------------------------------------------------
  //Prueba editar technique_sample
  $prueba = 'edit technique_sample correcto';
  $POST = array(
    'id_technique_sample' => 4,
    'name_technique_sample' => 'technique_test',
    'description_technique_sample' => 'test description changed',
    'bib_technique_sample' => 'bibref_Test',
    'file_technique_sample' => 'new_file_test.txt',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);
  
  //---------------------------------------------------------------------------------------------------------------------
  $accion = 'SEARCH';
  
  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar technique_sample por nombre
  $prueba = 'search technique_sample por nombre';
  $POST = array(
    'name_technique_sample' => 'technique_test',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);
  
  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar technique_sample que no existe
  $prueba = 'search technique_sample que no existe';
  $POST = array(
    'name_technique_sample' => 'prueba',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_VACIO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);
  
  //---------------------------------------------------------------------------------------------------------------------
  
  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar technique_sample
  $prueba = 'delete technique_sample';
  $POST = array(
    'id_technique_sample' => 4,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

//Prueba delete sin id_technique_sample
  $prueba = 'delete technique_sample incorrecto: no se indica id_technique_sample';
  $POST = array(
    'name_technique_sample' => 'technique_test',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_technique_sample_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>