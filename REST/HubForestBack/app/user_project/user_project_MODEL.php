<?php

include_once './Base/ModelBase.php';

class user_project_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'user_project';
		$this->clave = array('id_user','id_project','rol');
		$this->foraneas = array();
		$this->autoincrement = array();
        $this->unicos = array();

	}

	function buscarProyectosUsuarios(){
		$this->mapping = new mapping($this->tabla);
		$query = "SELECT user_project.id_user, user_project.id_project, user_project.rol, user.name_user, project.name_project
			FROM user_project
			LEFT JOIN user ON user_project.id_user = user.id_user
			LEFT JOIN project ON user_project.id_project = project.id_project
			ORDER BY user.name_user ASC
		";
		$result = $this->mapping->lanzarqueryconresults($query);
		return $result;
	}



}