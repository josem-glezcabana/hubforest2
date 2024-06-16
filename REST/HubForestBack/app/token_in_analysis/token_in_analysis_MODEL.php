<?php

include_once './Base/ModelBase.php';

class token_in_analysis_MODEL extends ModelBase{


	//METODOS
	// tabla tabla
	// clave array(clavestabla)
	// foraneas array(tablaforanea => clavetablaforanea)
    // autoincrement array(atributos autoincrementales)
    // unicos array(atributos unique)
	function __construct(){

		$this->tabla = 'token_in_analysis';
		$this->clave = array('id_token_in_analysis');
		$this->foraneas = array('token_in_lab'=>'id_token_in_lab', 'analysis_technique'=>'id_analysis_technique', 'analysis_preparation'=>'id_analysis_preparation');
		$this->autoincrement = array('id_token_in_analysis');
        $this->unicos = array();

	}

}