<?php

include_once './Base/appServiceBase.php';

class ecosystem_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_ecosystem','name_ecosystem','description_ecosystem','bib_ref_ecosystem');

		$this->listaAtributosSelect = array('id_ecosystem','name_ecosystem','description_ecosystem','bib_ref_ecosystem');

		$this->notnull = array(
						'ADD' => array('name_ecosystem','bib_ref_ecosystem'),
						'EDIT' => array('name_ecosystem','bib_ref_ecosystem'),
						'DELETE' => array('id_ecosystem')
						);

		$this->modelo = $this->crearModelOne('ecosystem');

	}

}