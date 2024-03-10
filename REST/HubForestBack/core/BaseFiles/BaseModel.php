<?php

include_once './Base/ModelBase.php';

class xxentidadxx_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'xxentidadxx';
		$this->clave = array(xxprimariasxx);
		$this->foraneas = array();
		$this->autoincrement = array(xxautoincrementalesxx);
        $this->unicos = array(xxunicosxx);

	}

}