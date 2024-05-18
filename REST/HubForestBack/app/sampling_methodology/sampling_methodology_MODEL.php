<?php

include_once './Base/ModelBase.php';

class sampling_methodology_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'sampling_methodology';
		$this->clave = array('id_sampling_methodology');
		$this->foraneas = array();
		$this->autoincrement = array();
        $this->unicos = array();

	}

}