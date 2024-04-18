<?php

include_once './Base/ModelBase.php';

class project_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'project';
		$this->clave = array('id_project');
		$this->foraneas = array();
		$this->autoincrement = array('id_project');
        $this->unicos = array('code_project','acronym_project');

	}

}