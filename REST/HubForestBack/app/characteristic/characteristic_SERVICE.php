<?php

include_once './Base/appServiceBase.php';

class characteristic_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_characteristic','name_characteristic','description_characteristic','data_type_characteristic','bib_ref_characteristic','file_characteristic');

		$this->listaAtributosSelect = array('id_characteristic','name_characteristic','description_characteristic','data_type_characteristic','bib_ref_characteristic','file_characteristic');

		$this->notnull = array(
						'ADD' => array('name_characteristic','description_characteristic','data_type_characteristic','bib_ref_characteristic'),
						'EDIT' => array('name_characteristic','description_characteristic','data_type_characteristic','bib_ref_characteristic'),
						'DELETE' => array('id_characteristic')
						);

		$this->modelo = $this->crearModelOne('characteristic');

	}

}