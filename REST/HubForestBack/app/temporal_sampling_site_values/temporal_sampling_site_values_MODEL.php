<?php

include_once './Base/ModelBase.php';

class temporal_sampling_site_values_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'temporal_sampling_site_values';
		$this->clave = array('id_ecosystem_param','id_replica','id_sampling');
		$this->foraneas = array();
		$this->autoincrement = array();
        $this->unicos = array();

	}

}