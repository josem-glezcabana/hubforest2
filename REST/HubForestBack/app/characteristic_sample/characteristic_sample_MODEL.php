<?php

include_once './Base/ModelBase.php';

class characteristic_sample_MODEL extends ModelBase
{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
	// autoincrement array(atributos autoincrementales)
	// unicos array(atributos unique)
	function __construct()
	{

		$this->tabla = 'characteristic_sample';
		$this->clave = array('id_characteristic', 'id_unit');
		$this->foraneas = array();
		$this->autoincrement = array();
		$this->unicos = array();

	}

	function buscarCharacteristicSample()
	{
		$this->mapping = new mapping($this->tabla);
		$query = "SELECT characteristic_sample.id_unit, characteristic_sample.id_characteristic, unit.name_unit, characteristic.name_characteristic
			FROM characteristic_sample
			LEFT JOIN unit ON characteristic_sample.id_unit = unit.id_unit
			LEFT JOIN characteristic ON characteristic_sample.id_characteristic = characteristic.id_characteristic
			ORDER BY unit.name_unit ASC
		";
		$result = $this->mapping->lanzarqueryconresults($query);
		return $result;
	}

}