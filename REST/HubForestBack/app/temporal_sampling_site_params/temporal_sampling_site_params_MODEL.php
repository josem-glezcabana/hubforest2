<?php

include_once './Base/ModelBase.php';

class temporal_sampling_site_params_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'temporal_sampling_site_params';
		$this->clave = array('id_project','id_ecosystem','id_ecosystem_param');
		$this->foraneas = array();
		$this->autoincrement = array();
        $this->unicos = array();

	}

}