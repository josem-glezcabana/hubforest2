<?php

include_once './Base/appServiceBase.php';

class sampling_methodology_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_sampling_methodology','name_methodology','description_methodology','bibref_methodology','file_methodology');

		$this->listaAtributosSelect = array('id_sampling_methodology','name_methodology','description_methodology','bibref_methodology','file_methodology');

		$this->notnull = array(
						'ADD' => array('id_sampling_methodology','name_methodology','description_methodology','bibref_methodology'),
						'EDIT' => array('id_sampling_methodology','name_methodology','description_methodology','bibref_methodology'),
						'DELETE' => array('id_sampling_methodology')
						);

		$this->modelo = $this->crearModelOne('sampling_methodology');

	}

}