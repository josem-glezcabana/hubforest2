<?php

include_once './Base/ModelBase.php';

class sampling_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'sampling';
		$this->clave = array('id_sampling');
		$this->foraneas = array();
		$this->autoincrement = array('id_sampling');
        $this->unicos = array();

	}

}