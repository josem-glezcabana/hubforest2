<?php

function SITE_TEST()
{


  include_once './Base/TEST_CLASS_sin_CURL.php';


  $pruebas = new apptestNoRest_sin_CURL();

  $entidad = 'site';
  $accion = 'ADD';
  $tipo = 'Accion';



  //---------------------------------------------------------------------------------------------------------------------
//Prueba añadir site
  $prueba = 'Add site';
  $POST = array(
    'country_site' => 'Test 1', 
    'state_province_site' => 'Test 1',
    'city_town_site' => 'Test 1',
    'geographical_direction1' => 'N',      
    'coordinate1_value_site' => 8.2,
    'geographical_direction2' => 'S',      
    'coordinate2_value_site' => 7.3,
    'owner_site' => 'Estado', 
    'slope_form_site' => 'S',
    'slope_gradient_site' => 3,
    'orientation_site' => 'S',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir site 
  $prueba = 'Add site';
  $POST = array(
    'country_site' => 'Test 2', 
    'state_province_site' => 'Test 2',
    'city_town_site' => 'Test 2',
    'geographical_direction1' => 'N',      
    'coordinate1_value_site' => 8.2,
    'geographical_direction2' => 'S',      
    'coordinate2_value_site' => 7.3,
    'owner_site' => 'Estado', 
    'slope_form_site' => 'S',
    'slope_gradient_site' => 3,
    'orientation_site' => 'S',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //Prueba añadir site erroneo
  $prueba = 'Add site';
  $POST = array(
    'country_site' => 'Test 3', 
    'state_province_site' => 'Test 3',
    'city_town_site' => 'Test 3',
    'geographical_direction1' => 'N',      
    'coordinate1_value_site' => 'N',
    'geographical_direction2' => 'S',      
    'coordinate2_value_site' => 7.3,
    'owner_site' => 'Estado', 
    'slope_form_site' => 'S',
    'slope_gradient_site' => 3,
    'orientation_site' => 'S',
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_KO';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);




  $accion = 'DELETE';
  //---------------------------------------------------------------------------------------------------------------------
//Prueba eliminar site
  $prueba = 'delete site';
  $POST = array(
    'id_site' => 2,
    'controlador' => $entidad,
    'action' => $accion
  );
  $codeEsperado = 'SQL_OK';
  $pruebas->hacerPrueba($POST, $entidad, $accion, $tipo, $prueba, $codeEsperado);

  //---------------------------------------------------------------------------------------------------------------------


  $accion = 'SEARCH';

  //---------------------------------------------------------------------------------------------------------------------
  //Prueba buscar site por name_caracteristic
  $prueba = 'search site por number_sites_by_sampling';
  $POST = array(
    'country_site' => 'Test 2',
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