<?php

include_once './Base/ModelBase.php';

class replica_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'replica';
		$this->clave = array('id_replica');
		$this->foraneas = array('project'=>'id_project', 'ecosystem'=>'id_ecosystem');
		$this->autoincrement = array();
        $this->unicos = array();

	}

}