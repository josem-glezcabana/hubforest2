<?php

include_once './Base/ModelBase.php';

class technique_sample_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'technique_sample';
		$this->clave = array('id_technique_sample');
		$this->foraneas = array();
		$this->autoincrement = array('id_technique_sample');
        $this->unicos = array();

	}

}