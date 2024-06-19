<?php

include_once './Base/appServiceBase.php';

class analysis_technique_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_analysis_technique','name_analysis_technique','description_analysis_technique','bib_analysis_technique','file_analysis_tecnique');

		$this->listaAtributosSelect = array('id_analysis_technique','name_analysis_technique','description_analysis_technique','bib_analysis_technique','file_analysis_tecnique');

		$this->notnull = array(
						'ADD' => array('name_analysis_technique','description_analysis_technique','bib_analysis_technique'),
						'EDIT' => array('name_analysis_technique','description_analysis_technique','bib_analysis_technique'),
						'DELETE' => array('id_analysis_technique')
						);

		$this->modelo = $this->crearModelOne('analysis_technique');

		// para los ficheros, se define este array de arrays. Cada elemento de este array es otro array con los siguientes atributos:
		// nombre del campo del fichero que se inserta, nombre de campo de la BBDD, carpeta directorio de los ficheros de esta entidad, array de extensiones y tamaño en bytes
		$this->files = array(
			array('new_file_analysis_tecnique', 'file_analysis_tecnique', './files/analysis_technique/', array('txt', 'pdf', 'docx'), 200000)
		);
	}

}