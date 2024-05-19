<?php

include_once './Base/appServiceBase.php';

class project_ecosystem_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_project','id_ecosystem','number_replicas_by_sampling','number_samplings');

		$this->listaAtributosSelect = array('id_project','id_ecosystem','number_replicas_by_sampling','number_samplings');

		$this->notnull = array(
						'ADD' => array('id_project','id_ecosystem','number_replicas_by_sampling'),
						'EDIT' => array('id_project','id_ecosystem','number_replicas_by_sampling'),
						'DELETE' => array('id_project','id_ecosystem')
						);

		$this->modelo = $this->crearModelOne('project_ecosystem');

	}

	function SEARCH_PROJECT_ECOSYSTEM()
	{
		$res = $this->modelo->buscarProyectosEcosystemas();
		return $res;
	}
}