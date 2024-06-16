<?php

include_once './Base/appServiceBase.php';

class token_in_analysis_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_token_in_analysis','id_token_in_lab','id_analysis_technique','id_analysis_preparation');

		$this->listaAtributosSelect = array('id_token_in_analysis','id_token_in_lab','id_analysis_technique','id_analysis_preparation');

		$this->notnull = array(
						'ADD' => array('id_token_in_lab','id_analysis_technique','id_analysis_preparation'),
						'EDIT' => array('id_token_in_lab','id_analysis_technique','id_analysis_preparation'),
						'DELETE' => array('id_token_in_analysis')
						);

		$this->modelo = $this->crearModelOne('token_in_analysis');

	}

}