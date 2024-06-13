<?php

session_start();
$_SESSION['test'] = true;

include_once './Comun/config.php';
include_once './Comun/FuncionesGenerales.php';

// URL para peticiones (despliegue con Docker)
define('urlnoRest', 'http://127.0.0.1:8080/HubForestBack/index.php');
// URL para las peticiones (despliegue con el instalador)
// define ('urlnoRest','http://127.0.0.1:80/hubforest2/REST/HubForestBack/index.php');

$resultadosTESTS = array();

//prueba auth
include './app/AUTH/AUTH_TEST.php';
$rest = AUTH_TEST();
guardar_test($resultadosTESTS, $rest);

//prueba user
include './app/user/user_TEST.php';
$rest = USER_TEST();
guardar_test($resultadosTESTS, $rest);

//prueba project
include './app/project/project_TEST.php';
$rest = PROJECT_TEST();
guardar_test($resultadosTESTS, $rest);

//prueba sampling_methodology
include './app/sampling_methodology/sampling_methodology_TEST.php';
$rest = SAMPLING_METHODOLOGY_TEST();
guardar_test($resultadosTESTS, $rest);

//prueba lab_process
include './app/lab_process/lab_process_TEST.php';
$rest = LAB_PROCESS_TEST();
guardar_test($resultadosTESTS, $rest);

//prueba analysis_preparation
include './app/analysis_preparation/analysis_preparation_TEST.php';
$rest = ANALYSIS_PREPARATION_TEST();
guardar_test($resultadosTESTS, $rest);

//prueba analysis_technique
include './app/analysis_technique/analysis_technique_TEST.php';
$rest = ANALYSIS_TECHNIQUE_TEST();
guardar_test($resultadosTESTS, $rest);

include './app/characteristic_sample/characteristic_sample_TEST.php';
$rest = CHARACTERISTIC_SAMPLE_TEST();
guardar_test($resultadosTESTS, $rest);

include './app/ecosystem/ecosystem_TEST.php';
$rest = ECOSYSTEM_TEST();
guardar_test($resultadosTESTS, $rest);


include './app/sampling/sampling_TEST.php';
$rest = SAMPLING_TEST();
guardar_test($resultadosTESTS, $rest);

include './app/storage_method/storage_method_TEST.php';
$rest = STORAGE_METHOD_TEST();
guardar_test($resultadosTESTS, $rest);

include './app/user_project/user_project_TEST.php';
$rest = USER_PROJECT_TEST();
guardar_test($resultadosTESTS, $rest);


session_destroy();
//presentar resultados
presentarResultadosPruebas($resultadosTESTS);

//header('Content-type: application/json');
//echo(json_encode($resultadosTESTS));


?>