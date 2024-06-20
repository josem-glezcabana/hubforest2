<?php

include_once './Base/ModelBase.php';

class token_in_lab_MODEL extends ModelBase
{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
	// autoincrement array(atributos autoincrementales)
	// unicos array(atributos unique)
	function __construct()
	{

		$this->tabla = 'token_in_lab';
		$this->clave = array('id_token_in_lab', 'id_token_in_sampling');
		$this->foraneas = array();
		$this->autoincrement = array('id_token_in_lab');
		$this->unicos = array();

	}
}