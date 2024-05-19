<?php

include_once './Base/ModelBase.php';

class project_ecosystem_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'project_ecosystem';
		$this->clave = array('id_project','id_ecosystem');
		$this->foraneas = array();
		$this->autoincrement = array();
        $this->unicos = array();

	}

	function buscarProyectosEcosystemas()
	{
		$this->mapping = new mapping($this->tabla);
		$query = "SELECT project_ecosystem.id_ecosystem, project_ecosystem.id_project, ecosystem.name_ecosystem, project.name_project, project_ecosystem.number_replicas_by_sampling, project_ecosystem.number_samplings
			FROM project_ecosystem
			LEFT JOIN ecosystem ON project_ecosystem.id_ecosystem = ecosystem.id_ecosystem
			LEFT JOIN project ON project_ecosystem.id_project = project.id_project
			ORDER BY project_ecosystem.id_project ASC
		";
		$result = $this->mapping->lanzarqueryconresults($query);
		return $result;
	}

	

}