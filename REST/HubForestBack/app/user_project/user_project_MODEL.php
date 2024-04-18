<?php

include_once './Base/ModelBase.php';

class user_project_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'user_project';
		$this->clave = array('id_user','id_project','rol');
		$this->foraneas = array();
		$this->autoincrement = array();
        $this->unicos = array();

	}

}