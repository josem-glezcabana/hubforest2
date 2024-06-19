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

		$this->listaAtributos = array('id_user', 'name_user', 'surname_user', 'position_user', 'organization_user', 'email_user', 'file_curr_user', 'passwd', 'is_admin');

		$this->listaAtributosSelect = array('id_user', 'name_user', 'surname_user', 'position_user', 'organization_user', 'email_user', 'file_curr_user', 'passwd', 'is_admin');

		$this->notnull = array(
			'ADD' => array('name_user', 'surname_user', 'position_user', 'passwd', 'is_admin'),
			'EDIT' => array('name_user', 'surname_user', 'position_user', 'passwd', 'is_admin'),
			'DELETE' => array('id_user')
		);

		$this->modelo = $this->crearModelOne('user');

		// para los ficheros, se define este array de arrays. Cada elemento de este array es otro array con los siguientes atributos:
		// nombre del campo del fichero que se inserta, nombre de campo de la BBDD, carpeta directorio de los ficheros de esta entidad, array de extensiones y tamaño en bytes
		$this->files = array(
			array('new_file_curr_user', 'file_curr_user', './files/user/', array('txt', 'pdf', 'docx'), 200000)
		);
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