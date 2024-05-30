<?php

include_once './Base/appServiceBase.php';

class unit_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_unit','name_unit','description_unit');

		$this->listaAtributosSelect = array('id_unit','name_unit','description_unit');

		$this->notnull = array(
						'ADD' => array(),
						'EDIT' => array(),
						'DELETE' => array('id_unit')
						);

		$this->modelo = $this->crearModelOne('unit');

	}

}