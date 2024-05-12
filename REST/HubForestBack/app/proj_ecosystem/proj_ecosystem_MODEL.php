<?php

include_once './Base/ModelBase.php';

class proj_ecosystem_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'proj_ecosystem';
		$this->clave = array('id_project','id_ecosystem');
		$this->foraneas = array();
		$this->autoincrement = array();
        $this->unicos = array();

	}

}