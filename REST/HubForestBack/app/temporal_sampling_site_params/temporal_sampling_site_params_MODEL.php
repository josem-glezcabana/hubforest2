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
		$this->clave = array('id_ecosystem_param','id_project','id_ecosystem');
		$this->foraneas = array();
		$this->autoincrement = array('id_ecosystem_param');
        $this->unicos = array();

	}

}