<?php

include_once './Base/ModelBase.php';

class user_MODEL extends ModelBase
{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
	// autoincrement array(atributos autoincrementales)
	// unicos array(atributos unique)
	function __construct()
	{

		$this->tabla = 'user';
		$this->clave = array('id_user');
		$this->foraneas = array();
		$this->autoincrement = array('id_user');
		$this->unicos = array('email_user');

	}

	function cambiar_contrasena()
	{
		$this->mapping = new mapping($this->tabla);
		$query = "UPDATE user SET passwd = '" . $_POST['passwd'] . "' WHERE (name_user = '" . $_POST['name_user'] . "')";
		$result = $this->mapping->lanzarquery($query);
		return $result;
	}

	function comprobar_usuario($nombre, $password)
	{
		$this->mapping = new mapping($this->tabla);
		$query = "SELECT *  FROM user WHERE  passwd = '" . $password . "' AND name_user = '" . $nombre . "'";
		$result = $this->mapping->lanzarqueryconresults($query);
		return $result;
	}

}