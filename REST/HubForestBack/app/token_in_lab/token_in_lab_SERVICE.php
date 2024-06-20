<?php

include_once './Base/appServiceBase.php';

class token_in_lab_SERVICE extends appServiceBase
{

	public $modelo;

	//METODOS

	function __construct()
	{

		parent::__construct();

	}

	function inicializarRest()
	{

		$this->listaAtributos = array('id_token_in_lab', 'id_token_in_sampling', 'id_lab_process');

		$this->listaAtributosSelect = array('id_token_in_lab', 'id_token_in_sampling', 'id_lab_process');

		$this->notnull = array(
			'ADD' => array('id_token_in_sampling', 'id_lab_process'),
			'EDIT' => array('id_token_in_sampling', 'id_lab_process'),
			'DELETE' => array('id_token_in_lab', 'id_token_in_sampling')
		);

		$this->modelo = $this->crearModelOne('token_in_lab');

	}

}