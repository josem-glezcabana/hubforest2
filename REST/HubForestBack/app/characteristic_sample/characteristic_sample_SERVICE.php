<?php

include_once './Base/appServiceBase.php';

class characteristic_sample_SERVICE extends appServiceBase
{

	public $modelo;

	//METODOS

	function __construct()
	{

		parent::__construct();

	}

	function inicializarRest()
	{

		$this->listaAtributos = array('id_characteristic', 'id_unit');

		$this->listaAtributosSelect = array('id_characteristic', 'id_unit');

		$this->notnull = array(
			'ADD' => array('id_characteristic', 'id_unit'),
			'EDIT' => array('id_characteristic', 'id_unit'),
			'DELETE' => array('id_characteristic', 'id_unit'),
			'SEARCH_CHARACTERISTIC_SAMPLE' => array()
		);

		$this->modelo = $this->crearModelOne('characteristic_sample');

	}

	function SEARCH_CHARACTERISTIC_SAMPLE()
	{
		$res = $this->modelo->buscarCharacteristicSample();
		return $res;
	}

}