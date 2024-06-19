<?php

include_once './Base/appServiceBase.php';

class technique_sample_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_technique_sample','name_technique_sample','description_technique_sample','bib_technique_sample','file_technique_sample');

		$this->listaAtributosSelect = array('id_technique_sample','name_technique_sample','description_technique_sample','bib_technique_sample','file_technique_sample');

		$this->notnull = array(
						'ADD' => array('name_technique_sample','description_technique_sample','bib_technique_sample'),
						'EDIT' => array('name_technique_sample','description_technique_sample','bib_technique_sample'),
						'DELETE' => array('id_technique_sample')
						);

		$this->modelo = $this->crearModelOne('technique_sample');

		// para los ficheros, se define este array de arrays. Cada elemento de este array es otro array con los siguientes atributos:
		// nombre del campo del fichero que se inserta, nombre de campo de la BBDD, carpeta directorio de los ficheros de esta entidad, array de extensiones y tamaño en bytes
		$this->files = array(
			array('new_file_technique_sample', 'file_technique_sample', './files/technique_sample/', array('txt', 'pdf', 'docx'), 200000)
		);
	}

}