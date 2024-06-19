<?php

include_once './Base/appServiceBase.php';

class temporal_sampling_site_values_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_ecosystem_param','id_replica','id_sampling','value_ecosystem_param');

		$this->listaAtributosSelect = array('id_ecosystem_param','id_replica','id_sampling','value_ecosystem_param');

		$this->notnull = array(
						'ADD' => array('id_ecosystem_param','id_replica','id_sampling','value_ecosystem_param'),
						'EDIT' => array('id_ecosystem_param','id_replica','id_sampling','value_ecosystem_param'),
						'DELETE' => array('id_ecosystem_param','id_replica','id_sampling')
						);

		$this->modelo = $this->crearModelOne('temporal_sampling_site_values');

	}

}