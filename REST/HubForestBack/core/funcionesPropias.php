<?php

function ejecutarCurl($parametros){

define('urlnoRest','http://localhost/webProjects/webs6uvigo/repoEducacion/Back/index.php');

$cliente = curl_init();

curl_setopt($cliente, CURLOPT_URL, urlnoRest);
curl_setopt($cliente, CURLOPT_HEADER, 0);
curl_setopt($cliente, CURLOPT_POST, True);
curl_setopt($cliente, CURLOPT_POSTFIELDS, $parametros);
curl_setopt($cliente, CURLOPT_RETURNTRANSFER, True); 

$result = curl_exec($cliente); // obtengo un json

if (curl_error($cliente)) { 
    echo 'Error: '.curl_e($cliente); 
}
else{
 
    $resp = json_decode($result,true); // convierto en un stdClass
    $resp = (array)$resp; //convierto en array
    return $resp;
}	

curl_close($cliente);

}

?>