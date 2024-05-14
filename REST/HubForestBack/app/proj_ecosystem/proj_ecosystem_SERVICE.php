 <?php

include_once './Base/appServiceBase.php';

class proj_ecosystem_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_project','id_ecosystem');

		$this->listaAtributosSelect = array('id_project','id_ecosystem');

		$this->notnull = array(
						'ADD' => array('id_project','id_ecosystem'),
						'EDIT' => array('id_project','id_ecosystem'),
						'DELETE' => array('id_project','id_ecosystem')
						);

		$this->modelo = $this->crearModelOne('proj_ecosystem');

	}

}