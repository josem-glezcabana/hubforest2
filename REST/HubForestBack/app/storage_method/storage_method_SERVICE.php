<?php

include_once './Base/appServiceBase.php';

class storage_method_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_storage_method','name_storage_method','description_storage_method','storage_container','size_storage_container','unit_storage_container');

		$this->listaAtributosSelect = array('id_storage_method','name_storage_method','description_storage_method','storage_container','size_storage_container','unit_storage_container');

		$this->notnull = array(
						'ADD' => array('id_storage_method','name_storage_method','description_storage_method','storage_container'),
						'EDIT' => array('id_storage_method','name_storage_method','description_storage_method','storage_container'),
						'DELETE' => array('id_storage_method')
						);

		$this->modelo = $this->crearModelOne('storage_method');

	}

}