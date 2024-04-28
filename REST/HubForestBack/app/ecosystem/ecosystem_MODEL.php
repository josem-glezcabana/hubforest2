<?php

include_once './Base/ModelBase.php';

class ecosystem_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'ecosystem';
		$this->clave = array('id_ecosystem');
		$this->foraneas = array();
		$this->autoincrement = array('id_ecosystem');
        $this->unicos = array();

	}

}