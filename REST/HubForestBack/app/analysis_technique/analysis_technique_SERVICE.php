<?php

include_once './Base/appServiceBase.php';

class analysis_technique_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_analysis_technique','name_analysis_technique','description_analysis_technique','bib_analysis_technique','file_analysis_tecnique');

		$this->listaAtributosSelect = array('id_analysis_technique','name_analysis_technique','description_analysis_technique','bib_analysis_technique','file_analysis_tecnique');

		$this->notnull = array(
						'ADD' => array('name_analysis_technique','description_analysis_technique','bib_analysis_technique'),
						'EDIT' => array('name_analysis_technique','description_analysis_technique','bib_analysis_technique'),
						'DELETE' => array('id_analysis_technique')
						);

		$this->modelo = $this->crearModelOne('analysis_technique');

	}

}