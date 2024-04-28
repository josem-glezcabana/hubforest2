<?php

include_once './Base/ModelBase.php';

class site_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'site';
		$this->clave = array('id_site');
		$this->foraneas = array();
		$this->autoincrement = array('id_site');
        $this->unicos = array();

	}

}