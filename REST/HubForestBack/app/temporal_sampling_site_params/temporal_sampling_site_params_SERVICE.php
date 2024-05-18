<?php

include_once './Base/appServiceBase.php';

class temporal_sampling_site_params_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_project','id_ecosystem','id_ecosystem_param','category_param','name_ecosystem_param','values_ecosystem_param');

		$this->listaAtributosSelect = array('id_project','id_ecosystem','id_ecosystem_param','category_param','name_ecosystem_param','values_ecosystem_param');

		$this->notnull = array(
						'ADD' => array('id_project','id_ecosystem','id_ecosystem_param','category_param','name_ecosystem_param'),
						'EDIT' => array('id_project','id_ecosystem','id_ecosystem_param','category_param','name_ecosystem_param'),
						'DELETE' => array('id_project','id_ecosystem','id_ecosystem_param')
						);

		$this->modelo = $this->crearModelOne('temporal_sampling_site_params');

	}

}