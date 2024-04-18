<?php

include_once './Base/appServiceBase.php';

class xxentidadxx_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array(xxatributosxx);

		$this->listaAtributosSelect = array(xxatributosxx);

		$this->notnull = array(
						xxnonulosxx
						);

		$this->modelo = $this->crearModelOne('xxentidadxx');

	}

}