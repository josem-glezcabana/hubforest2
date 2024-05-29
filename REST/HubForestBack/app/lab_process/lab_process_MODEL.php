<?php

include_once './Base/ModelBase.php';

class lab_process_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'lab_process';
		$this->clave = array('id_lab_process');
		$this->foraneas = array();
		$this->autoincrement = array('id_lab_process');
        $this->unicos = array();

	}

}