<?php

include_once './Base/ModelBase.php';

class unit_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'unit';
		$this->clave = array('id_unit');
		$this->foraneas = array();
		$this->autoincrement = array('id_unit');
        $this->unicos = array();

	}

}