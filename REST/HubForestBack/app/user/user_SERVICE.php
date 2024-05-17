<?php

include_once './Base/appServiceBase.php';

class user_SERVICE extends appServiceBase
{

	public $modelo;

	//METODOS

	function __construct()
	{

		parent::__construct();

	}

	function inicializarRest()
	{

		$this->listaAtributos = array('id_user', 'name_user', 'surname_user', 'position_user', 'organization_user', 'email_user', 'passwd', 'is_admin');

		$this->listaAtributosSelect = array('id_user', 'name_user', 'surname_user', 'position_user', 'organization_user', 'email_user', 'passwd', 'is_admin');

		$this->notnull = array(
			'ADD' => array('name_user', 'surname_user', 'position_user', 'passwd', 'is_admin'),
			'EDIT' => array('name_user', 'surname_user', 'position_user', 'passwd', 'is_admin'),
			'DELETE' => array('id_user')
		);

		$this->modelo = $this->crearModelOne('user');

	}

	function cambiar_contrasena()
	{
		$res = $this->modelo->cambiar_contrasena();
		return $res;
	}
	function comprobar_usuario($login, $password)
	{
		$res = $this->modelo->comprobar_usuario($login, $password);
		return $res;
	}

}