<?php

include_once './Base/appServiceBase.php';

class user_project_SERVICE extends appServiceBase
{

	public $modelo;

	//METODOS

	function __construct()
	{

		parent::__construct();

	}

	function inicializarRest()
	{

		$this->listaAtributos = array('id_user', 'id_project', 'rol', 'date_user_project');

		$this->listaAtributosSelect = array('id_user', 'id_project', 'rol', 'date_user_project');

		$this->notnull = array(
			'ADD' => array('id_user', 'id_project', 'rol', 'date_user_project'),
			'EDIT' => array('id_user', 'id_project', 'rol', 'date_user_project'),
			'DELETE' => array('id_user', 'id_project', 'rol'),
			'SEARCH_PERMISSIONS' => array()
		);

		$this->modelo = $this->crearModelOne('user_project');

	}


	function SEARCH_PERMISSIONS()
	{
		$res = $this->modelo->buscarProyectosUsuarios();
		return $res;
	}

}