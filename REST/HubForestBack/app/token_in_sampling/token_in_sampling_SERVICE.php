<?php

include_once './Base/appServiceBase.php';

class token_in_sampling_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_token_in_sampling','id_project','id_ecosystem','id_storage_method','id_technique_sample');

		$this->listaAtributosSelect = array('id_token_in_sampling','id_project','id_ecosystem','id_storage_method','id_technique_sample');

		$this->notnull = array(
						'ADD' => array('id_project','id_ecosystem','id_storage_method','id_technique_sample'),
						'EDIT' => array('id_project','id_ecosystem','id_storage_method','id_technique_sample'),
						'DELETE' => array('id_token_in_sampling','id_project','id_ecosystem')
						);

		$this->modelo = $this->crearModelOne('token_in_sampling');

	}

}