<?php

include_once './Base/appServiceBase.php';

class analysis_preparation_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_analysis_preparation','name_analysis_preparation');

		$this->listaAtributosSelect = array('id_analysis_preparation','name_analysis_preparation');

		$this->notnull = array(
						'ADD' => array('name_analysis_preparation'),
						'EDIT' => array('name_analysis_preparation'),
						'DELETE' => array('id_analysis_preparation')
						);

		$this->modelo = $this->crearModelOne('analysis_preparation');

	}

}