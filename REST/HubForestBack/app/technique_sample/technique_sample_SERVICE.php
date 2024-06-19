<?php

include_once './Base/appServiceBase.php';

class technique_sample_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_technique_sample','name_technique_sample','description_technique_sample','bib_technique_sample','file_technique_sample');

		$this->listaAtributosSelect = array('id_technique_sample','name_technique_sample','description_technique_sample','bib_technique_sample','file_technique_sample');

		$this->notnull = array(
						'ADD' => array('name_technique_sample','description_technique_sample','bib_technique_sample'),
						'EDIT' => array('name_technique_sample','description_technique_sample','bib_technique_sample'),
						'DELETE' => array('id_technique_sample')
						);

		$this->modelo = $this->crearModelOne('technique_sample');

	}

}