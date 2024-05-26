<?php

include_once './Base/ModelBase.php';

class storage_method_MODEL extends ModelBase
{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
	// autoincrement array(atributos autoincrementales)
	// unicos array(atributos unique)
	function __construct()
	{

		$this->tabla = 'storage_method';
		$this->clave = array('id_storage_method');
		$this->foraneas = array();
		$this->autoincrement = array('id_storage_method');
		$this->unicos = array();

	}

}