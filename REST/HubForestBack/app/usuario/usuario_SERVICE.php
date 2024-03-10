<?php

include_once './Base/appServiceBase.php';

class usuario_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id','correo','nombre','password','rol');

		$this->listaAtributosSelect = array('id','correo','nombre','password','rol');

		$this->notnull = array(
						'ADD' => array(),
						'EDIT' => array(),
						'DELETE' => array('id')
						);

		$this->modelo = $this->crearModelOne('usuario');

	}


}