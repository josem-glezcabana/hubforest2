<?php

include_once './Base/appServiceBase.php';

class site_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_site','country_site','state_province_site','city_town_site','geographical_direction1','coordinate1_value_site','geographical_direction2','coordinate2_value_site','owner_site','slope_form_site','slope_gradient_site','orientation_site');

		$this->listaAtributosSelect = array('id_site','country_site','state_province_site','city_town_site','geographical_direction1','coordinate1_value_site','geographical_direction2','coordinate2_value_site','owner_site','slope_form_site','slope_gradient_site','orientation_site');

		$this->notnull = array(
						'ADD' => array('country_site','state_province_site','city_town_site','geographical_direction1','coordinate1_value_site','geographical_direction2','coordinate2_value_site','owner_site','slope_form_site','slope_gradient_site','orientation_site'),
						'EDIT' => array('country_site','state_province_site','city_town_site','geographical_direction1','coordinate1_value_site','geographical_direction2','coordinate2_value_site','owner_site','slope_form_site','slope_gradient_site','orientation_site'),
						'DELETE' => array('id_site')
						);

		$this->modelo = $this->crearModelOne('site');

	}

}