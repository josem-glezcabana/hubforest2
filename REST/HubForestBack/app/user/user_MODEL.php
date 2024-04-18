<?php

include_once './Base/ModelBase.php';

class user_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'user';
		$this->clave = array('id_user');
		$this->foraneas = array();
		$this->autoincrement = array('id_user');
        $this->unicos = array('email_user');

	}

}