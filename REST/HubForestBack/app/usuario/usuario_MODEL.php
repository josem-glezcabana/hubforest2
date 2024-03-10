<?php

include_once './Base/ModelBase.php';

class usuario_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'usuario';
		$this->clave = array('id');
		$this->foraneas = array();
		$this->autoincrement = array('id');
        $this->unicos = array();

	}

}