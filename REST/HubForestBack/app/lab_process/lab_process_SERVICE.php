<?php

include_once './Base/appServiceBase.php';

class lab_process_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_lab_process','name_lab_process','description_lab_process','bib_lab_process','file_lab_process');

		$this->listaAtributosSelect = array('id_lab_process','name_lab_process','description_lab_process','bib_lab_process','file_lab_process');

		$this->notnull = array(
						'ADD' => array('name_lab_process','description_lab_process','bib_lab_process'),
						'EDIT' => array('name_lab_process','description_lab_process','bib_lab_process'),
						'DELETE' => array('id_lab_process')
						);

		$this->modelo = $this->crearModelOne('lab_process');

		// para los ficheros, se define este array de arrays. Cada elemento de este array es otro array con los siguientes atributos:
		// nombre del campo del fichero que se inserta, nombre de campo de la BBDD, carpeta directorio de los ficheros de esta entidad, array de extensiones y tamaño en bytes
		$this->files = array(
			array('new_file_lab_process', 'file_lab_process', './files/lab_process/', array('txt', 'pdf', 'docx'), 200000)
		);
	}

}