<?php

include_once './Base/ModelBase.php';

class analysis_preparation_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'analysis_preparation';
		$this->clave = array('Id_analysis_preparation');
		$this->foraneas = array();
		$this->autoincrement = array('Id_analysis_preparation');
        $this->unicos = array();

	}

}