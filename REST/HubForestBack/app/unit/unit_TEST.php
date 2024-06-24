<?php

function UNIT_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  $entidad = 'unit';
  $accion = 'EDIT';
  $tipo = 'Accion';

  //---------------------------------------------------------------------------------------------------------------------

  $prueba = 'editar correcto';
  $POST = array(
    'id_unit' => 1,
    'name_unit' => 'Prueba edit',
    'description_unit' => 'prueba edit2',
    'controlador' => $entidad,
    'action' => $accion
  );

  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);


  $accion = 'ADD';
  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir unidad
  $prueba = 'Add unit';
  $POST = array(
    'name_unit' => 'Prueba',
    'description_unit' => 'Prueba',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  $POST = array(
    'name_unit' => 'Prueba2',
    'description_unit' => 'Prueba2',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //--------------------------------------------------------------------------------------------------------------------
  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba buscar unidad por nombre unidad
  $prueba = 'search unidad por nombre de unidad';
  $POST = array(
    'name_unit' => 'Prueba edit',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_DATOS';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------
//Prueba buscar unidad por descripcion unidad no encontrado
  $prueba = 'search unidad por descripcion unidad correcto';
  $POST = array(
    'description_unit' => 'No existe',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'RECORDSET_VACIO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  $accion = 'DELETE';

  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar unidad correcto
  $prueba = 'delete unidad correcto';
  $POST = array(
    'id_unit' => 4,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------------------------------------
//Prueba buscar unidad por nombre unidad correcto
  $prueba = 'delete unidad incorrecto: no se indica id_unit';
  $POST = array(
    'name_unit' => 'nombreprueba',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'id_unit_es_nulo_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

  return $pruebas->resultadoTest;

}








?>