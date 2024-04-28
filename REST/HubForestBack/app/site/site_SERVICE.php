<?php

include_once './Base/appServiceBase.php';

class site_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_site','id_project','id_ecosystem','coorN_site','coorW_site','slope_site','orientation_site');

		$this->listaAtributosSelect = array('id_site','id_project','id_ecosystem','coorN_site','coorW_site','slope_site','orientation_site');

		$this->notnull = array(
						'ADD' => array('id_project','id_ecosystem','coorN_site','coorW_site','slope_site','orientation_site'),
						'EDIT' => array('id_project','id_ecosystem','coorN_site','coorW_site','slope_site','orientation_site'),
						'DELETE' => array('id_site')
						);

		$this->modelo = $this->crearModelOne('site');

	}

}