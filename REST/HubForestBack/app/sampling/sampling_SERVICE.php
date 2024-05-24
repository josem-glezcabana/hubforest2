<?php

include_once './Base/appServiceBase.php';

class sampling_SERVICE extends appServiceBase
{

	public $modelo;

	//METODOS

	function __construct()
	{

		parent::__construct();

	}

	function inicializarRest()
	{

		$this->listaAtributos = array('id_project', 'id_ecosystem', 'id_sampling', 'id_site', 'date_sampling', 'time_sampling', 'temp_air_sampling', 'collectors_sampling');

		$this->listaAtributosSelect = array('id_project', 'id_ecosystem', 'id_sampling', 'id_site', 'date_sampling', 'time_sampling', 'temp_air_sampling', 'collectors_sampling');

		$this->notnull = array(
			'ADD' => array('id_project', 'id_ecosystem', 'id_site', 'date_sampling', 'time_sampling', 'temp_air_sampling', 'collectors_sampling'),
			'EDIT' => array('id_project', 'id_ecosystem', 'id_site', 'date_sampling', 'time_sampling', 'temp_air_sampling', 'collectors_sampling'),
			'DELETE' => array('id_sampling'),
			'SEARCH_SAMPLINGS' => array()
		);

		$this->modelo = $this->crearModelOne('sampling');

	}

	function SEARCH_SAMPLINGS()
	{
		$res = $this->modelo->buscarSamplings();
		return $res;
	}

}