<?php

include_once './Base/ModelBase.php';

class token_in_sampling_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'token_in_sampling';
		$this->clave = array('id_token_in_sampling');
		$this->foraneas = array('project'=>'id_project', 'ecosystem'=>'id_ecosystem', 'storage_method'=>'id_storage_method', 'technique_sample'=>'id_technique_sample');
		$this->autoincrement = array('id_token_in_sampling');
        $this->unicos = array();

	}
}