<?php

include_once './Base/ModelBase.php';

class sampling_MODEL extends ModelBase
{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
	// autoincrement array(atributos autoincrementales)
	// unicos array(atributos unique)
	function __construct()
	{

		$this->tabla = 'sampling';
		$this->clave = array('id_sampling');
		$this->foraneas = array();
		$this->autoincrement = array('id_sampling');
		$this->unicos = array();

	}

	function buscarSamplings()
	{
		$this->mapping = new mapping($this->tabla);
		$query = "SELECT sampling.id_sampling, sampling.id_project, project.name_project, sampling.id_ecosystem, ecosystem.name_ecosystem,
			sampling.id_site, sampling.date_sampling, sampling.time_sampling, sampling.temp_air_sampling, sampling.collectors_sampling
			FROM sampling
			LEFT JOIN project ON sampling.id_project = project.id_project
			LEFT JOIN ecosystem ON sampling.id_ecosystem = ecosystem.id_ecosystem
			ORDER BY project.name_project ASC
		";
		$result = $this->mapping->lanzarqueryconresults($query);
		return $result;
	}

}