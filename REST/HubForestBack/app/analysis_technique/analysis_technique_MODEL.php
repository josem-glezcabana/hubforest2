<?php

include_once './Base/ModelBase.php';

class analysis_technique_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'analysis_technique';
		$this->clave = array('id_analysis_technique');
		$this->foraneas = array();
		$this->autoincrement = array('id_analysis_technique');
        $this->unicos = array();

	}

}