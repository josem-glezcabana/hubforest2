<?php

include_once './Base/appServiceBase.php';

class project_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_project','name_project','start_date_project','end_date_project','responsable_project','organization_project','description_project','file_project','code_project','acronym_project','id_sampling_methodology');

		$this->listaAtributosSelect = array('id_project','name_project','start_date_project','end_date_project','responsable_project','organization_project','description_project','file_project','code_project','acronym_project','id_sampling_methodology');

		$this->notnull = array(
						'ADD' => array('name_project','start_date_project','end_date_project','responsable_project','organization_project','code_project','acronym_project','id_sampling_methodology'),
						'EDIT' => array('name_project','start_date_project','end_date_project','responsable_project','organization_project','code_project','acronym_project','id_sampling_methodology'),
						'DELETE' => array('id_project')
						);

		$this->modelo = $this->crearModelOne('project');

	}

}