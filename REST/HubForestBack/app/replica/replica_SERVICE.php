<?php

include_once './Base/appServiceBase.php';

class replica_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_project','id_ecosystem','id_site','id_sampling','id_replica');

		$this->listaAtributosSelect = array('id_project','id_ecosystem','id_site','id_sampling','id_replica');

		$this->notnull = array(
						'ADD' => array('id_project','id_ecosystem','id_site','id_sampling','id_replica'),
						'EDIT' => array('id_project','id_ecosystem','id_site','id_sampling','id_replica'),
						'DELETE' => array('id_replica')
						);

		$this->modelo = $this->crearModelOne('replica');

	}

}