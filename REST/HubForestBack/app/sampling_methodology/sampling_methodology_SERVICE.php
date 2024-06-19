<?php

include_once './Base/appServiceBase.php';

class sampling_methodology_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_sampling_methodology','name_methodology','description_methodology','bibref_methodology','file_methodology');

		$this->listaAtributosSelect = array('id_sampling_methodology','name_methodology','description_methodology','bibref_methodology','file_methodology');

		$this->notnull = array(
						'ADD' => array('name_methodology','description_methodology','bibref_methodology'),
						'EDIT' => array('name_methodology','description_methodology','bibref_methodology'),
						'DELETE' => array('id_sampling_methodology')
						);

		$this->modelo = $this->crearModelOne('sampling_methodology');

		// para los ficheros, se define este array de arrays. Cada elemento de este array es otro array con los siguientes atributos:
		// nombre del campo del fichero que se inserta, nombre de campo de la BBDD, carpeta directorio de los ficheros de esta entidad, array de extensiones y tamaño en bytes
		$this->files = array(
			array('new_file_methodology', 'file_methodology', './files/sampling_methodology/', array('txt', 'pdf', 'docx'), 200000)
		);
	}

}